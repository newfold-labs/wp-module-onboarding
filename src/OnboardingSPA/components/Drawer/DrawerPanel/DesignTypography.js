import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../../store';
import { getGlobalStyles } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';

const DesignTypography = () => {

	const [isLoaded, setIsLoaded] = useState(false);
	const [globalStyles, setGlobalStyles] = useState();
	const [isAccordionClosed, setIsAccordionClosed] = useState(true);

	const { storedPreviewSettings, currentData } = useSelect(
		(select) => {
			return {
				storedPreviewSettings:
					select(nfdOnboardingStore).getPreviewSettings(),
				currentData:
					select(nfdOnboardingStore).getCurrentOnboardingData(),
			};
		},
		[]
	);

	const { updatePreviewSettings, setCurrentOnboardingData } =
		useDispatch(nfdOnboardingStore);

	const fontPalettes = 
	{
		"modern-approachable": {
			"label": "Modern & approachable",
			"matches": "yith-wonder/theme-json",
			"styles": {
				"typography": {
					"fontFamily": "var(--wp--preset--font-family--mulish)"
				},
				"blocks": {
					"core/heading": {
						"typography": {
							"fontFamily": "var(--wp--preset--font-family--poppins)"
						}
					}
				}
			}
		},
		"strong-sleek": {
			"label": "Strong & sleek",
			"matches": "yith-wonder/styles/01-blue-shades",
			"styles": {
				"typography": {
					"fontFamily": "var(--wp--preset--font-family--raleway)"
				},
				"blocks": {
					"core/heading": {
						"typography": {
							"fontFamily": "var(--wp--preset--font-family--oswald)"
						}
					}
				}
			}
		},
		"stately-elevated": {
			"label": "Stately & elevated",
			"matches": "yith-wonder/styles/02-pink-shades",
			"styles": {
				"typography": {
					"fontFamily": "var(--wp--preset--font-family--source-sans-pro)"
				},
				"blocks": {
					"core/heading": {
						"typography": {
							"fontFamily": "var(--wp--preset--font-family--playfair)"
						}
					}
				}
			}
		},
		"typewriter-crisp-midcentury": {
			"label": "Typewriter & crisp midcentury",
			"matches": "yith-wonder/styles/03-orange-shades",
			"styles": {
				"typography": {
					"fontFamily": "var(--wp--preset--font-family--jost)"
				},
				"blocks": {
					"core/heading": {
						"typography": {
							"fontFamily": "var(--wp--preset--font-family--solway)"
						}
					}
				}
			}
		},
		"refined-traditional-newsletter": {
			"label": "Refined traditional newsletter",
			"matches": "yith-wonder/styles/04-black-shades",
			"styles": {
				"typography": {
					"fontFamily": "var(--wp--preset--font-family--jost)"
				},
				"blocks": {
					"core/heading": {
						"typography": {
							"fontFamily": "var(--wp--preset--font-family--merriweather)"
						}
					}
				}
			}
		},
		"bold-stamp-slab": {
			"label": "Bold stamp & slab",
			"matches": "yith-wonder/styles/05-red-shades",
			"styles": {
				"typography": {
					"fontFamily": "var(--wp--preset--font-family--roboto-slab)"
				},
				"blocks": {
					"core/heading": {
						"typography": {
							"fontFamily": "var(--wp--preset--font-family--changa-one)"
						}
					}
				}
			}
		},
		"fast-simple": {
			"label": "Fast & Simple",
			"matches": "newfold/onboarding-01",
			"styles": {
				"typography": {
					"fontFamily": "var(--wp--preset--font-family--system)"
				},
				"blocks": {
					"core/heading": {
						"typography": {
							"fontFamily": "var(--wp--preset--font-family--system)"
						}
					}
				}
			}
		},
		"timeless-traditional": {
			"label": "Timeless & Traditional",
			"matches": "newfold/onboarding-02",
			"styles": {
				"typography": {
					"fontFamily": "var(--wp--preset--font-family--serif)"
				},
				"blocks": {
					"core/heading": {
						"typography": {
							"fontFamily": "var(--wp--preset--font-family--serif)"
						}
					}
				}
			}
		},
		"sleek-sophisticated": {
			"label": "Sleek & Sophisticated",
			"matches": "newfold/onboarding-03",
			"styles": {
				"typography": {
					"fontFamily": "var(--wp--preset--font-family--dm-sans)"
				},
				"blocks": {
					"core/heading": {
						"typography": {
							"fontFamily": "var(--wp--preset--font-family--dm-sans)"
						}
					}
				}
			}
		},
		"clear-crisp": {
			"label": "Clear & Crisp",
			"matches": "newfold/onboarding",
			"wip-font": "Inter",
			"sleek-sophisticated": {
				"label": "Sleek & Sophisticated",
				"matches": "newfold/onboarding-03",
				"styles": {
					"typography": {
						"fontFamily": "var(--wp--preset--font-family--inter)"
					},
					"blocks": {
						"core/heading": {
							"typography": {
								"fontFamily": "var(--wp--preset--font-family--inter)"
							}
						}
					}
				}
			}
		},
		"retro-classy": {
			"label": "Retro & Classy",
			"matches": "newfold/onboarding",
			"styles": {
				"typography": {
					"fontFamily": "var(--wp--preset--font-family--league-spartan)"
				},
				"blocks": {
					"core/heading": {
						"typography": {
							"fontFamily": "var(--wp--preset--font-family--league-spartan)"
						}
					}
				}
			}
		},
		"defined-solid": {
			"label": "Defined & Solid",
			"matches": "newfold/onboarding",
			"styles": {
				"typography": {
					"fontFamily": "var(--wp--preset--font-family--roboto-slab)"
				},
				"blocks": {
					"core/heading": {
						"typography": {
							"fontFamily": "var(--wp--preset--font-family--roboto-slab)"
						}
					}
				}
			}
		}
	}

	const getColorStylesAndPatterns = async () => {
		const globalStyles = await getGlobalStyles();
		let selectedGlobalStyle;
		if (currentData?.data?.theme?.variation) {
			selectedGlobalStyle = globalStyles.body.filter(
				(globalStyle) =>
					globalStyle.title === currentData.data.theme.variation
			)[0];
		} else {
			selectedGlobalStyle = globalStyles.body[0];
		}
		setGlobalStyles(selectedGlobalStyle);
		updatePreviewSettings(
			useGlobalStylesOutput(selectedGlobalStyle, storedPreviewSettings)
		);
		setIsLoaded(true);
	};

	useEffect(() => {
		if (!isLoaded) getColorStylesAndPatterns();
	}, [isLoaded]);

	const handleClick = (fontStyle) => {
	};

	function buildPalettes() {
		let paletteRenderedList = [];
		for (const fontStyle in fontPalettes) {
			paletteRenderedList.push(
				<div className={`font-palette ${ false ? 'font-palette-selected' : ''} `}
					onClick={(e) => handleClick(fontStyle)}>
					<div className='font-palette__icon'> Aa </div>
					<div className='font-palette__name'>
						{fontPalettes[fontStyle]?.label}
					</div>
				</div>
			);
		}

		return paletteRenderedList;
	}

	function buildCustomPalette() {
		return (
			<div className='custom-palette'>
				<div className='custom-palette__top'
					onClick={(e) => setIsAccordionClosed(!isAccordionClosed)}>
					<div className='custom-palette__top-text'>SELECT CUSTOM FONTS</div>
					{isAccordionClosed && <div className='custom-palette__top-icon'>+</div>}
					{!isAccordionClosed && <div className='custom-palette__top-icon'>-</div>}
				</div>
			</div>
		);
	}

	return (
		<div style={{ padding: '0 4px' }}>
			<h2>{__('Color Palettes', 'wp-module-onboarding')}</h2>
			{buildPalettes()}
			{buildCustomPalette()}
		</div>
	);
};
export default DesignTypography;
