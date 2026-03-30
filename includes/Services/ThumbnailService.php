<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

class ThumbnailService {
    public function __construct() {
        add_filter( 'post_thumbnail_html', array( $this, 'use_pending_image_url' ), 10, 5 );
    }

    /**
	 * Use pending image URL when no featured image HTML yet.
	 *
	 * Applies the requested thumbnail size dimensions to the remote URL so the
	 * placeholder image already looks like the final sideloaded thumbnail.
	 *
	 * @param string       $html             Thumbnail HTML.
	 * @param int          $post_id          Post ID.
	 * @param int          $post_thumbnail_id Attachment ID (0 when missing).
	 * @param string|int[] $size             Registered size name or [w, h] array.
	 * @param string|array $attr             Extra img attributes.
	 * @return string
	 */
	public function use_pending_image_url( $html, $post_id, $post_thumbnail_id, $size, $attr ) {
		if ( '' !== $html && null !== $html ) {
			return $html;
		}

		$post_id = (int) $post_id;
		if ( $post_id <= 0 || PostTypeService::SERVICE_POST_TYPE !== get_post_type( $post_id ) ) {
			return $html;
		}

		$url = get_post_meta( $post_id, PostTypeService::META_IMAGE_URL, true );
		if ( empty( $url ) || ! is_string( $url ) ) {
			return $html;
		}

		$url = esc_url_raw( $url );
		if ( '' === $url ) {
			return $html;
		}

		// Match the style WordPress outputs for sideloaded thumbnails so the
		// image fills the <figure> container (which already sets aspect-ratio).
		return '<img src="' . esc_url( $url ) . '"'
			. ' style="width:100%;height:100%;object-fit:cover;"'
			. ' class="wp-post-image"'
			. ' alt="' . esc_attr( get_the_title( $post_id ) ) . '"'
			. ' decoding="async"'
			. ' loading="lazy"'
			. ' />';
	}
}