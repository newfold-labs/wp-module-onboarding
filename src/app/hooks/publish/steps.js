import {
	updateSiteSettings,
	uploadMediaFromUrl,
	createPage,
	createPost,
	updateTemplatePart,
	createNavigationMenu,
	createService,
	publishProducts,
} from '@/utils/api/wordpress';
import {
	setGlobalStylesColorPalette,
	setGlobalStyles,
	installFonts,
	enableJetpackModules,
	completeOnboarding,
	reportSiteGenPublished,
} from '@/utils/api/onboarding';
import { transformColorPalette } from '@/hooks/publish/tasks';
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
		const isHome = entry.slug === 'home' || entry.path === '/';
		const page = await createPage( entry.title, entry.content, {
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
		await updateTemplatePart( 'header', header );
	}
	if ( footer ) {
		await updateTemplatePart( 'footer', footer );
	}

	return 'Header and footer configured';
}

export async function runArticles( { generationData } ) {
	const articles = generationData.post_types?.articles || [];
	let articleCount = 0;

	for ( const article of articles ) {
		const featuredMediaURL = article.featured_image ?? null;

		await createPost( article.title, article.content, article.excerpt || '', {
			meta: {
				nfd_onboarding_generated: '1',
				...( featuredMediaURL ? { nfd_image_url: featuredMediaURL } : {} ),
			},
		} );
		articleCount++;
	}

	return articleCount > 0
		? `${ articleCount } article${ articleCount !== 1 ? 's' : '' } published`
		: 'No articles to publish';
}

export async function runServices( { generationData } ) {
	const services = generationData.post_types?.services || [];
	let serviceCount = 0;

	for ( const service of services ) {
		const featuredMediaURL = service.featured_image ?? null;

		await createService( service.title, service.content, service.excerpt || '', {
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

export async function runNavigation( { ctx } ) {
	if ( ctx.createdPages.length > 0 ) {
		await createNavigationMenu( ctx.createdPages );
		return 'Navigation menu created';
	}
	return 'Skipped — no pages';
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
