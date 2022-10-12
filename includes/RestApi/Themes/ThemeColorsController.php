<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi\Themes;

use NewfoldLabs\WP\Module\Onboarding\Permissions;

/**
 * Class ThemeColorsController
 */
class ThemeColorsController extends \WP_REST_Controller
{

    /**
     * The namespace of this controller's route.
     *
     * @var string
     */
    protected $namespace = 'newfold-onboarding/v1';

    /**
     * The base of this controller's route.
     *
     * @var string
     */
    protected $rest_base = '/themes';


    /**
     * The extended base of this controller's route.
     *
     * @var string
     */
    protected $rest_extended_base = '/colors';

    /**
     * This contains the different color variations for the theme.
     *
     * @var string
     */
    protected static $theme_colors = array(
        'yith-wonder' => array(
            'calm'=> array(
                'tertiary'=> '#C7DBFF',
                'secondary'=> '#E6EBEE',
                'primary'=> '#1A4733',
                'background'=> ''
            ),
            'cool'=> array(
                'tertiary'=> '#C7DBFF',
                'secondary'=> '#EDF7FE',
                'primary'=> '#21447B',
                'background'=> ''
            ),
            'warm'=> array(
                'tertiary'=> '#FFEDED',
                'secondary'=> '#FEF7E8',
                'primary'=> '#7A3921',
                'background'=> ''
            ),
            'radiant'=> array(
                'tertiary'=> '#C7F0FF',
                'secondary'=> '#FEF4FB',
                'primary'=> '#63156A',
                'background'=> ''
            ),
            'bold'=> array(
                'tertiary'=> '#F2A3D6',
                'secondary'=> '#FFFBF5',
                'primary'=> '#09857C',
                'background'=> ''
            ),
            'retro'=> array(
                'tertiary'=> '#F2E6A2',
                'secondary'=> '#F5FFFF',
                'primary'=> '#096385',
                'background'=> ''
            ),
            'professional'=> array(
                'tertiary'=> '#A2C1F2',
                'secondary'=> '#F5FAFF',
                'primary'=> '#669933',
                'background'=> ''
            ),
        ),
    );

    /**
     * Registers routes for ThemeColorsController
     */
    public function register_routes()
    {
        \register_rest_route(
            $this->namespace,
            $this->rest_base . $this->rest_extended_base,
            array(
                array(
                    'methods'  => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_theme_colors'),
                    'permission_callback' => array(Permissions::class, 'rest_is_authorized_admin'),
                ),
            )
        );
    }

    /**
     * Retrieves the active theme color variations.
     *
     * @return array|\WP_Error
     */
    public function get_theme_colors()
    {
        $active_theme = (\wp_get_theme())->get('TextDomain');
        $pattern_slugs = self::$theme_colors[$active_theme];

        return $pattern_slugs;
    }
}
