<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

/**
 * Reset Services
 *
 * This class handles the reset of the onboarding services.
 */
class ResetService {

    /**
     * Reset the onboarding services.
     *
     * @return void
     */
    public static function reset(): void {
        self::delete_generated_posts();
        self::reset_site_identity();
        self::reset_onboarding_options();
        self::unschedule_cron_jobs();
    }

    /**
     * Delete all posts with meta nfd_onboarding_generated = '1' across post types: page, post, product, nfd_service
     * 
     * @return void
     */
    private static function delete_generated_posts(): void {
        
        $posts = get_posts(
            array(
                'post_type'      => array( 'page', 'post', 'product', 'wp_navigation', PostTypeService::SERVICE_POST_TYPE ),
                'meta_key'       => PostTypeService::META_ONBOARDING_GENERATED,
                'meta_value'     => '1',
                'post_status'    => 'any',
                'posts_per_page' => -1,
                'fields'         => 'ids',
            )
        );
    
        foreach ( $posts as $post_id ) {
            
            $thumbnail_id = (int) get_post_thumbnail_id( $post_id );
            if ( $thumbnail_id ) {
                wp_delete_attachment( $thumbnail_id, true ); 
            }
    
           //remove all attached media of a page.
            $children = get_attached_media( '', $post_id );
            foreach ( $children as $child ) {
                wp_delete_attachment( $child->ID, true );
            }
    
            wp_delete_post( $post_id, true ); 
        }
    }


    /**
     * Reset site identity
     *
     * @return void
     */
    private static function reset_site_identity(): void {
        $logo_id = (int) get_option( 'site_logo' );
        if ( $logo_id ) {
            wp_delete_attachment( $logo_id, true );
        }

        delete_option( 'site_logo' );
        delete_option( 'site_icon' );
        update_option( 'blogname', '' );
        update_option( 'blogdescription', '' );
    }

    /**
     * Delete all onboarding-related options from the database.
     *
     * @return void
     */
    private static function reset_onboarding_options(): void {
        global $wpdb;
        $prefixes = [ 'nfd_module_onboarding_', 'nfd-ai-site-gen' ];

        foreach ( $prefixes as $prefix ) {
            $options = $wpdb->get_col(
                $wpdb->prepare(
                    "SELECT option_name FROM {$wpdb->options} WHERE option_name LIKE %s",
                    $wpdb->esc_like( $prefix ) . '%'
                )
            );

            if ( empty( $options ) ) {
                continue;
            }

            foreach ( $options as $option_name ) {
                delete_option( $option_name );
            }
	    }

    }

    /**
     * Unschedule any pending WP-Cron jobs registered during onboarding.
     *
     * @return void
     */
    private static function unschedule_cron_jobs(): void {
        wp_unschedule_hook( MediaService::CRON_HOOK );
        wp_unschedule_hook( SiteGenImageService::CRON_HOOK );
    }

   
}