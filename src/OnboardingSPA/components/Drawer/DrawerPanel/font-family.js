/**
 * External dependencies
 */
import { find } from 'lodash';
import {
    __experimentalFontFamilyControl as FontFamilyControl,
} from '@wordpress/block-editor';

const fontFamilies = [
    {
        "name": "System",
        "slug": "system",
        "fontFamily": "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif"
    },
    {
        "name": "Serif",
        "slug": "serif",
        "fontFamily": "\"Times New Roman\",\"New York\",Times,\"Noto Serif\",serif"
    },
    {
        "name": "Monospace",
        "slug": "monospace",
        "fontFamily": "Consolas,Menlo,Monaco,\"SF Mono\",\"DejaVu Sans Mono\",\"Roboto Mono\",\"Courier New\",Courier,monospace"
    },
    {
        "fontFamily": "Mulish",
        "name": "Mulish, sans-serif",
        "slug": "mulish",
        "fontFace": [
            {
                "fontFamily": "Mulish",
                "fontWeight": "200 900",
                "fontStyle": "normal",
                "fontStretch": "normal",
                "src": [
                    "file:./assets/fonts/Mulish-VariableFont_wght.ttf"
                ]
            },
            {
                "fontFamily": "Mulish",
                "fontWeight": "200 900",
                "fontStyle": "italic",
                "fontStretch": "normal",
                "src": [
                    "file:./assets/fonts/Mulish-Italic-VariableFont_wght.ttf"
                ]
            }
        ]
    },
    {
        "fontFamily": "Raleway",
        "name": "Raleway, sans-serif",
        "slug": "raleway",
        "fontFace": [
            {
                "fontFamily": "Raleway",
                "fontWeight": "100 900",
                "fontStretch": "normal",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/Raleway-VariableFont_wght.ttf"
                ]
            },
            {
                "fontFamily": "Raleway",
                "fontWeight": "100 900",
                "fontStretch": "normal",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/Raleway-Italic-VariableFont_wght.ttf"
                ]
            }
        ]
    },
    {
        "fontFamily": "Roboto Slab",
        "name": "Roboto Slab, serif",
        "slug": "roboto-slab",
        "fontFace": [
            {
                "fontFamily": "Roboto Slab",
                "fontWeight": "100 900",
                "fontStretch": "normal",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/RobotoSlab-VariableFont_wght.ttf"
                ]
            }
        ]
    },
    {
        "fontFamily": "Jost",
        "name": "Jost, sans-serif",
        "slug": "jost",
        "fontFace": [
            {
                "fontFamily": "Jost",
                "fontWeight": "100 900",
                "fontStretch": "normal",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/Jost-VariableFont_wght.ttf"
                ]
            },
            {
                "fontFamily": "Jost",
                "fontWeight": "100 900",
                "fontStretch": "normal",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/Jost-Italic-VariableFont_wght.ttf"
                ]
            }
        ]
    },
    {
        "fontFamily": "Montserrat",
        "name": "Montserrat, sans-serif",
        "slug": "montserrat",
        "fontFace": [
            {
                "fontFamily": "Montserrat",
                "fontWeight": "100 900",
                "fontStretch": "normal",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/Montserrat-VariableFont_wght.ttf"
                ]
            },
            {
                "fontFamily": "Montserrat",
                "fontWeight": "100 900",
                "fontStretch": "normal",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/Montserrat-Italic-VariableFont_wght.ttf"
                ]
            }
        ]
    },
    {
        "fontFamily": "Nunito",
        "name": "Nunito, sans-serif",
        "slug": "nunito",
        "fontFace": [
            {
                "fontFamily": "Nunito",
                "fontWeight": "200 900",
                "fontStretch": "normal",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/Nunito-VariableFont_wght.ttf"
                ]
            },
            {
                "fontFamily": "Nunito",
                "fontWeight": "200 900",
                "fontStretch": "normal",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/Nunito-Italic-VariableFont_wght.ttf"
                ]
            }
        ]
    },
    {
        "fontFamily": "Solway",
        "name": "Solway, serif",
        "slug": "solway",
        "fontFace": [
            {
                "fontFamily": "Solway",
                "fontWeight": "300",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/solway-v15-latin-300.woff2"
                ]
            },
            {
                "fontFamily": "Solway",
                "fontWeight": "400",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/solway-v15-latin-regular.woff2"
                ]
            },
            {
                "fontFamily": "Solway",
                "fontWeight": "500",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/solway-v15-latin-500.woff2"
                ]
            },
            {
                "fontFamily": "Solway",
                "fontWeight": "700",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/solway-v15-latin-700.woff2"
                ]
            },
            {
                "fontFamily": "Solway",
                "fontWeight": "800",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/solway-v15-latin-800.woff2"
                ]
            }
        ]
    },
    {
        "fontFamily": "Changa One",
        "name": "Changa One, display",
        "slug": "changa-one",
        "fontFace": [
            {
                "fontFamily": "Changa One",
                "fontWeight": "400",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/changa-one-v18-latin-regular.woff2"
                ]
            },
            {
                "fontFamily": "Changa One",
                "fontWeight": "400",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/changa-one-v18-latin-italic.woff2"
                ]
            }
        ]
    },
    {
        "fontFamily": "Source Sans Pro",
        "name": "Source Sans Pro, sans-serif",
        "slug": "source-sans-pro",
        "fontFace": [
            {
                "fontFamily": "Source Sans Pro",
                "fontWeight": "200",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/source-sans-pro-v21-latin-200.woff2"
                ]
            },
            {
                "fontFamily": "Source Sans Pro",
                "fontWeight": "200",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/source-sans-pro-v21-latin-200italic.woff2"
                ]
            },
            {
                "fontFamily": "Source Sans Pro",
                "fontWeight": "300",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/source-sans-pro-v21-latin-300.woff2"
                ]
            },
            {
                "fontFamily": "Source Sans Pro",
                "fontWeight": "300",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/source-sans-pro-v21-latin-300italic.woff2"
                ]
            },
            {
                "fontFamily": "Source Sans Pro",
                "fontWeight": "400",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/source-sans-pro-v21-latin-regular.woff2"
                ]
            },
            {
                "fontFamily": "Source Sans Pro",
                "fontWeight": "400",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/source-sans-pro-v21-latin-italic.woff2"
                ]
            },
            {
                "fontFamily": "Source Sans Pro",
                "fontWeight": "600",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/source-sans-pro-v21-latin-600.woff2"
                ]
            },
            {
                "fontFamily": "Source Sans Pro",
                "fontWeight": "600",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/source-sans-pro-v21-latin-600italic.woff2"
                ]
            },
            {
                "fontFamily": "Source Sans Pro",
                "fontWeight": "700",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/source-sans-pro-v21-latin-700.woff2"
                ]
            },
            {
                "fontFamily": "Source Sans Pro",
                "fontWeight": "700",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/source-sans-pro-v21-latin-700italic.woff2"
                ]
            },
            {
                "fontFamily": "Source Sans Pro",
                "fontWeight": "900",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/source-sans-pro-v21-latin-900.woff2"
                ]
            },
            {
                "fontFamily": "Source Sans Pro",
                "fontWeight": "900",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/source-sans-pro-v21-latin-900italic.woff2"
                ]
            }
        ]
    },
    {
        "fontFamily": "Merriweather",
        "name": "Merriweather, serif",
        "slug": "merriweather",
        "fontFace": [
            {
                "fontFamily": "Merriweather",
                "fontWeight": "300",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/merriweather-v30-latin-300.woff2"
                ]
            },
            {
                "fontFamily": "Merriweather",
                "fontWeight": "300",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/merriweather-v30-latin-300italic.woff2"
                ]
            },
            {
                "fontFamily": "Merriweather",
                "fontWeight": "400",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/merriweather-v30-latin-regular.woff2"
                ]
            },
            {
                "fontFamily": "Merriweather",
                "fontWeight": "400",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/merriweather-v30-latin-italic.woff2"
                ]
            },
            {
                "fontFamily": "Merriweather",
                "fontWeight": "700",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/merriweather-v30-latin-700.woff2"
                ]
            },
            {
                "fontFamily": "Merriweather",
                "fontWeight": "700",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/merriweather-v30-latin-700italic.woff2"
                ]
            },
            {
                "fontFamily": "Merriweather",
                "fontWeight": "900",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/merriweather-v30-latin-900.woff2"
                ]
            },
            {
                "fontFamily": "Merriweather",
                "fontWeight": "900",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/merriweather-v30-latin-900italic.woff2"
                ]
            }
        ]
    },
    {
        "fontFamily": "Poppins",
        "name": "Poppins",
        "slug": "poppins",
        "fontFace": [
            {
                "fontFamily": "Poppins",
                "fontWeight": "100",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-100.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "100",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-100italic.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "200",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-200.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "200",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-200italic.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "300",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-300.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "300",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-300italic.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "400",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-regular.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "400",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-italic.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "500",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-500.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "500",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-500italic.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "600",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-600.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "600",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-600italic.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "700",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-700.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "700",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-700italic.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "800",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-800.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "800",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-800italic.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "900",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-900.woff2"
                ]
            },
            {
                "fontFamily": "Poppins",
                "fontWeight": "900",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/poppins-v20-latin-900italic.woff2"
                ]
            }
        ]
    },
    {
        "fontFamily": "Satisfy",
        "name": "Satisfy",
        "slug": "satisfy",
        "fontFace": [
            {
                "fontFamily": "Satisfy",
                "fontWeight": "400",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/satisfy-v17-latin-regular.woff2"
                ]
            }
        ]
    },
    {
        "fontFamily": "Forum",
        "name": "Forum",
        "slug": "forum",
        "fontFace": [
            {
                "fontFamily": "Forum",
                "fontWeight": "400",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/forum-v16-latin-regular.woff2"
                ]
            }
        ]
    },
    {
        "fontFamily": "Oswald",
        "name": "Oswald",
        "slug": "oswald",
        "fontFace": [
            {
                "fontFamily": "Oswald",
                "fontWeight": "200",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/oswald-v48-latin-200.woff2"
                ]
            },
            {
                "fontFamily": "Oswald",
                "fontWeight": "300",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/oswald-v48-latin-300.woff2"
                ]
            },
            {
                "fontFamily": "Oswald",
                "fontWeight": "400",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/oswald-v48-latin-regular.woff2"
                ]
            },
            {
                "fontFamily": "Oswald",
                "fontWeight": "500",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/oswald-v48-latin-500.woff2"
                ]
            },
            {
                "fontFamily": "Oswald",
                "fontWeight": "600",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/oswald-v48-latin-600.woff2"
                ]
            }
        ]
    },
    {
        "fontFamily": "Playfair Display",
        "name": "Playfair Display",
        "slug": "playfair",
        "fontFace": [
            {
                "fontFamily": "Playfair Display",
                "fontWeight": "400",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/playfair-display-v29-latin-regular.woff2"
                ]
            },
            {
                "fontFamily": "Playfair Display",
                "fontWeight": "400",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/playfair-display-v29-latin-italic.woff2"
                ]
            },
            {
                "fontFamily": "Playfair Display",
                "fontWeight": "500",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/playfair-display-v29-latin-500.woff2"
                ]
            },
            {
                "fontFamily": "Playfair Display",
                "fontWeight": "500",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/playfair-display-v29-latin-500italic.woff2"
                ]
            },
            {
                "fontFamily": "Playfair Display",
                "fontWeight": "600",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/playfair-display-v29-latin-600.woff2"
                ]
            },
            {
                "fontFamily": "Playfair Display",
                "fontWeight": "600",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/playfair-display-v29-latin-600italic.woff2"
                ]
            },
            {
                "fontFamily": "Playfair Display",
                "fontWeight": "700",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/playfair-display-v29-latin-700.woff2"
                ]
            },
            {
                "fontFamily": "Playfair Display",
                "fontWeight": "700",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/playfair-display-v29-latin-700italic.woff2"
                ]
            },
            {
                "fontFamily": "Playfair Display",
                "fontWeight": "800",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/playfair-display-v29-latin-800.woff2"
                ]
            },
            {
                "fontFamily": "Playfair Display",
                "fontWeight": "800",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/playfair-display-v29-latin-800italic.woff2"
                ]
            },
            {
                "fontFamily": "Playfair Display",
                "fontWeight": "900",
                "fontStyle": "normal",
                "src": [
                    "file:./assets/fonts/playfair-display-v29-latin-900.woff2"
                ]
            },
            {
                "fontFamily": "Playfair Display",
                "fontWeight": "900",
                "fontStyle": "italic",
                "src": [
                    "file:./assets/fonts/playfair-display-v29-latin-900italic.woff2"
                ]
            }
        ]
    }
]

export function FontFamilyEdit({
    setAttributes,
    fontFamily ,
}) {

    const value = find(
        fontFamilies,
        ({ slug }) => fontFamily === slug
    )?.fontFamily;

    function onChange(newValue) {
        const predefinedFontFamily = find(
            fontFamilies,
            ({ fontFamily: f }) => f === newValue
        );
        setAttributes({
            fontFamily: predefinedFontFamily?.slug,
        });
    }

    return (
        <FontFamilyControl
            className="block-editor-hooks-font-family-control"
            fontFamilies={fontFamilies}
            value={value}
            onChange={onChange}
            size="__unstable-large"
            __nextHasNoMarginBottom
        />
    );
}
