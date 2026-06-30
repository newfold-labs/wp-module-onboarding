import {
	updateSiteSettings,
	uploadMediaFromUrl,
	createPage,
	updateTemplate,
	updateTemplatePart,
	createService,
	publishProducts,
	publishArticles,
} from '@/utils/api/wordpress';
import {
	setGlobalStylesColorPalette,
	setGlobalStyles,
	installFonts,
	enableJetpackModules,
	completeOnboarding,
	reportSiteGenPublished,
	setupSiteNavigationMenu,
} from '@/utils/api/onboarding';
import { transformColorPalette } from '@/hooks/publish/tasks';
import { normalizeBlockContent } from '@/utils/helpers';

/**
 * Each step function receives { generationData, discoveryData, ctx } and returns
 * a result string. ctx is a shared context object for passing data between steps
 * (e.g. createdPages from the pages step to the navigation step).
 */

export async function runIdentity( { discoveryData } ) {
	const title = discoveryData?.brand_identity?.site_title || '';
	const tagline = discoveryData?.brand_identity?.tagline || '';
	await updateSiteSettings( { title, description: tagline } );
	return 'Title and tagline set';
}

export async function runFonts( { generationData } ) {
	const fontPair = generationData.sitekit?.font_pair;
	if ( ! fontPair ) {
		return 'Skipped — no font pair';
	}

	const result = await installFonts( fontPair );
	if ( result?.error ) {
		throw result.error;
	}

	return 'Fonts installed';
}

export async function runGlobalStyles( { generationData } ) {
	const globalStyles = generationData.sitekit?.global_styles;
	if ( ! globalStyles ) {
		return 'Skipped — no global styles';
	}

	const result = await setGlobalStyles( globalStyles );
	if ( result?.error ) {
		throw result.error;
	}

	return 'Typography & styles applied';
}

export async function runColors( { generationData } ) {
	const rawPalette = generationData.site_colors?.[ 0 ];
	if ( ! rawPalette ) {
		return 'Skipped — no palette';
	}
	const wpPalette = transformColorPalette( rawPalette );
	const result = await setGlobalStylesColorPalette( wpPalette );
	if ( result?.error ) {
		throw result.error;
	}
	return 'Palette applied';
}

export async function runLogo( { generationData } ) {
	const logoUrl = generationData.site_logo?.url ?? generationData.site_logo;
	if ( ! logoUrl ) {
		return 'Skipped';
	}
	const media = await uploadMediaFromUrl( logoUrl, 'site-logo.png' );
	if ( media?.id ) {
		await updateSiteSettings( {
			site_logo: media.id,
			site_icon: media.id,
		} );
	}
	return 'Logo uploaded';
}

export async function runPages( { generationData, ctx } ) {
	// Silently enable Jetpack Forms and Blocks modules before creating pages.
	await enableJetpackModules();

	const pages = generationData.sitekit?.pages || [];
	let homepageId = null;
	let count = 0;

	for ( const entry of pages ) {
		const isHome = entry.is_front_page || entry.slug === 'home' || entry.path === '/';
		const normalizedContent = normalizeBlockContent( entry.content );
		const page = await createPage( entry.title, normalizedContent, {
			template: 'page-no-title',
			slug: entry.slug,
			meta: {
				nfd_onboarding_generated: '1',
			},
		} );
		if ( page?.id ) {
			ctx.createdPages.push( {
				id: page.id,
				title: entry.title,
				slug: entry.slug,
				link: page.link,
				is_front_page: !! entry.is_front_page,
				is_contact_page: !! entry.is_contact_page,
			} );
			if ( isHome ) {
				homepageId = page.id;
			}
		}
		count++;
	}

	if ( homepageId ) {
		await updateSiteSettings( {
			show_on_front: 'page',
			page_on_front: homepageId,
		} );
	}

	return `${ count } page${ count !== 1 ? 's' : '' } created`;
}

export async function runTemplateParts( { generationData } ) {
	const header = generationData.sitekit?.header;
	const footer = generationData.sitekit?.footer;

	if ( header ) {
		const normalizedHeader = normalizeBlockContent( header );
		await updateTemplatePart( 'header', normalizedHeader );
	}
	if ( footer ) {
		const normalizedFooter = normalizeBlockContent( footer );
		await updateTemplatePart( 'footer', normalizedFooter );
	}

	// Update the page-no-title template to fix spacing between header and content.
	const pageNoTitleContent =
		'<!-- wp:template-part {"slug":"header","theme":"bluehost-blueprint","area":"header"} /-->\n\n' +
		'<!-- wp:group {"tagName":"main","align":"full","style":{"spacing":{"margin":{"top":"0"}}},"layout":{"type":"constrained"}} -->\n' +
		'<main class="wp-block-group alignfull" style="margin-top:0">' +
		'<!-- wp:post-content {"align":"full","layout":{"type":"constrained"}} /-->' +
		'</main>\n' +
		'<!-- /wp:group -->\n\n' +
		'<!-- wp:template-part {"slug":"footer","theme":"bluehost-blueprint","area":"footer"} /-->';
	const normalizedPageNoTitleContent = normalizeBlockContent( pageNoTitleContent );
	await updateTemplate( 'page-no-title', normalizedPageNoTitleContent );

	// Apply any WordPress block templates the sitekit ships (e.g. the category
	// archive), each { slug, content }. No-op when none are sent.
	const templates = generationData.sitekit?.templates ?? [];
	for ( const tpl of templates ) {
		if ( tpl?.slug && tpl?.content ) {
			await updateTemplate( tpl.slug, normalizeBlockContent( tpl.content ) );
		}
	}

	return 'Header and footer configured';
}

export async function runArticles( { generationData } ) {
	const articles = generationData.post_types?.articles || [];

	if ( articles.length === 0 ) {
		return 'Skipped — no articles';
	}

	const normalizedArticles = articles.map( ( article ) => ( {
		...article,
		content: normalizeBlockContent( article.content ),
	} ) );
	const result = await publishArticles( normalizedArticles );
	const articleCount = result?.created ?? 0;

	return articleCount > 0
		? `${ articleCount } article${ articleCount !== 1 ? 's' : '' } published`
		: 'No articles to publish';
}

export async function runServices( { generationData } ) {
	const services = generationData.post_types?.services || [];
	let serviceCount = 0;

	for ( const service of services ) {
		const featuredMediaURL = service.featured_image ?? null;

		const normalizedContent = normalizeBlockContent( service.content );
		await createService( service.title, normalizedContent, service.excerpt || '', {
			meta: {
				nfd_onboarding_generated: '1',
				...( featuredMediaURL ? { nfd_image_url: featuredMediaURL } : {} ),
			},
		} );
		serviceCount++;
	}

	return serviceCount > 0
		? `${ serviceCount } service${ serviceCount !== 1 ? 's' : '' } published`
		: 'No services to publish';
}

export async function runProducts( { generationData } ) {
	const products = generationData.post_types?.products ?? [];
	if ( products.length === 0 ) {
		return 'Skipped — no products';
	}

	const result = await publishProducts( products );
	const count = result?.created ?? 0;

	return `${ count } product${ count !== 1 ? 's' : '' } published`;
}

export async function runNavigation( { generationData, discoveryData, ctx } ) {
	if ( ctx.createdPages.length === 0 ) {
		return 'Skipped — no pages';
	}

	// Blog-only nav tidy-up: drop the contact page when the header CTA already links
	// to it, so the same destination isn't listed twice.
	const isBlog = ( discoveryData?.site_type ?? '' ).toLowerCase() === 'blog';
	const headerHtml = generationData?.sitekit?.header ?? '';
	const pages = isBlog
		? ctx.createdPages.filter( ( page ) => {
			if ( ! page.is_contact_page ) {
				return true;
			}
			const slug = ( page.slug || '' ).replace( /^\/+|\/+$/g, '' );
			const headerLinksToContact =
				!! slug &&
				new RegExp( `href=["']/?${ slug }/?["']`, 'i' ).test( headerHtml );
			return ! headerLinksToContact;
		} )
		: ctx.createdPages;

	const result = await setupSiteNavigationMenu( discoveryData?.site_type ?? '', pages );

	if ( result?.error ) {
		throw result.error;
	}

	return 'Navigation menu created';
}

export async function runFinalize() {
	const result = await completeOnboarding();
	if ( result?.error ) {
		throw result.error;
	}
	reportSiteGenPublished();
	return 'Site published';
}

/**
 * Ordered list of step entries: [ key, runFn ].
 */
export const STEP_RUNNERS = [
	[ 'identity', runIdentity ],
	[ 'fonts', runFonts ],
	[ 'global_styles', runGlobalStyles ],
	[ 'colors', runColors ],
	[ 'logo', runLogo ],
	[ 'pages', runPages ],
	[ 'template_parts', runTemplateParts ],
	[ 'articles', runArticles ],
	[ 'services', runServices ],
	[ 'products', runProducts ],
	[ 'navigation', runNavigation ],
	[ 'finalize', runFinalize ],
];
