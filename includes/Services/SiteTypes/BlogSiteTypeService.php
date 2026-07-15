<?php
/**
 * Blog site type service.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes;

/**
 * Blog-specific publish behaviour.
 *
 * Resolves the category-bound blog sections across the generated pages: a
 * category-bound section is a query loop that carries a `categoryBinding` marker
 * in its block metadata but no real filter. Each one is given a distinct
 * category — the query gets a taxQuery so it filters, and the section heading and
 * "More" link are rewritten to that category. Sections are filled in document
 * order; categories cycle when sections outnumber them.
 */
class BlogSiteTypeService {

	/**
	 * Resolve every category-bound section across the generated pages.
	 *
	 * @param array<int,array{name:string,term_id:int,url:string}> $categories Ordered categories.
	 */
	public static function resolve_category_bound_sections( array $categories ): void {
		if ( empty( $categories ) ) {
			return;
		}

		$page_ids = get_posts(
			array(
				'post_type'   => 'page',
				'post_status' => array( 'publish', 'draft', 'pending', 'private', 'future' ),
				'numberposts' => -1,
				'fields'      => 'ids',
			)
		);

		foreach ( $page_ids as $page_id ) {
			$content = get_post_field( 'post_content', $page_id );
			if ( ! is_string( $content ) || false === strpos( $content, 'categoryBinding' ) ) {
				continue;
			}

			$resolved = self::resolve_content( $content, $categories );
			if ( null !== $resolved && $resolved !== $content ) {
				wp_update_post(
					array(
						'ID'           => $page_id,
						'post_content' => $resolved,
					)
				);
			}
		}
	}

	/**
	 * Rewrite a page's block markup, resolving each category-bound section.
	 *
	 * @param string                                               $content    Page block markup.
	 * @param array<int,array{name:string,term_id:int,url:string}> $categories Ordered categories.
	 * @return string|null Rewritten markup, or null when nothing parsed.
	 */
	private static function resolve_content( string $content, array $categories ): ?string {
		$blocks = parse_blocks( $content );
		if ( empty( $blocks ) ) {
			return null;
		}

		$index = 0;
		self::resolve_blocks( $blocks, $categories, $index );

		return serialize_blocks( $blocks );
	}

	/**
	 * Assign the next category to each category-bound section (a `core/columns`
	 * whose subtree holds a categoryBinding query).
	 *
	 * @param array $blocks     Blocks (by ref).
	 * @param array $categories Ordered categories.
	 * @param int   $index      Running category index (by ref).
	 */
	private static function resolve_blocks( array &$blocks, array $categories, int &$index ): void {
		foreach ( $blocks as &$block ) {
			if ( 'core/columns' === ( $block['blockName'] ?? '' )
				&& self::subtree_has_category_binding( $block )
			) {
				$category     = $categories[ $index % count( $categories ) ];
				$heading_done = false;
				self::rewrite_section( $block, $category, $heading_done );
				++$index;
				continue;
			}

			if ( ! empty( $block['innerBlocks'] ) ) {
				self::resolve_blocks( $block['innerBlocks'], $categories, $index );
			}
		}
		unset( $block );
	}

	/**
	 * Whether a block's subtree contains a query carrying a categoryBinding marker.
	 *
	 * @param array $block The block.
	 */
	private static function subtree_has_category_binding( array $block ): bool {
		if ( 'core/query' === ( $block['blockName'] ?? '' )
			&& array_key_exists( 'categoryBinding', $block['attrs']['metadata'] ?? array() )
		) {
			return true;
		}
		foreach ( ( $block['innerBlocks'] ?? array() ) as $inner ) {
			if ( self::subtree_has_category_binding( $inner ) ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Rewrite one section's query (taxQuery), heading, and "More" link to a category.
	 *
	 * @param array $block        Section block subtree (by ref).
	 * @param array $category     { name, term_id, url }.
	 * @param bool  $heading_done Whether the heading was already rewritten (by ref).
	 */
	private static function rewrite_section( array &$block, array $category, bool &$heading_done ): void {
		$name       = (string) $category['name'];
		$block_name = $block['blockName'] ?? '';

		if ( 'core/query' === $block_name
			&& array_key_exists( 'categoryBinding', $block['attrs']['metadata'] ?? array() )
		) {
			$block['attrs']['query']['taxQuery'] = array( 'category' => array( (int) $category['term_id'] ) );
			$block['attrs']['query']['inherit']  = false;
		}

		if ( ! $heading_done && 'core/heading' === $block_name ) {
			self::replace_block_html( $block, '/(<h[1-6][^>]*>).*?(<\/h[1-6]>)/s', '${1}' . esc_html( $name ) . '${2}' );
			$heading_done = true;
		}

		if ( 'core/paragraph' === $block_name
			&& false !== strpos( (string) ( $block['innerHTML'] ?? '' ), '>More ' )
		) {
			self::replace_block_html(
				$block,
				'/<a\b[^>]*>\s*More\b.*?<\/a>/s',
				'<a href="' . esc_url( $category['url'] ) . '">More ' . esc_html( $name ) . '</a>'
			);
		}

		// Iterate the real reference — `?? array()` would foreach a temporary, so
		// `&$inner` mutations deeper in the tree wouldn't propagate back.
		if ( ! empty( $block['innerBlocks'] ) ) {
			foreach ( $block['innerBlocks'] as &$inner ) {
				self::rewrite_section( $inner, $category, $heading_done );
			}
			unset( $inner );
		}
	}

	/**
	 * Apply a regex replacement to a leaf block's innerHTML and innerContent.
	 *
	 * @param array  $block       The block (by ref).
	 * @param string $pattern     Regex pattern.
	 * @param string $replacement Replacement string.
	 */
	private static function replace_block_html( array &$block, string $pattern, string $replacement ): void {
		if ( isset( $block['innerHTML'] ) ) {
			$block['innerHTML'] = preg_replace( $pattern, $replacement, $block['innerHTML'], 1 );
		}
		if ( ! empty( $block['innerContent'] ) && is_array( $block['innerContent'] ) ) {
			foreach ( $block['innerContent'] as $key => $chunk ) {
				if ( is_string( $chunk ) && preg_match( $pattern, $chunk ) ) {
					$block['innerContent'][ $key ] = preg_replace( $pattern, $replacement, $chunk, 1 );
					break;
				}
			}
		}
	}
}
