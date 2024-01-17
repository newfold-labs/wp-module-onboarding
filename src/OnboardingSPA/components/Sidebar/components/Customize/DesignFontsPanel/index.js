import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { PanelBody, PanelRow, Button, Dashicon } from '@wordpress/components';
import './stylesheet.scss';
import { store as nfdOnboardingStore } from '../../../../../store';
import { __ } from '@wordpress/i18n';

const FontGroup = ( {
	baseClassName,
	group,
	selectedGroup,
	handleGroupSelect,
} ) => (
	<div
		className={ `${ baseClassName }__font-group__container` }
		key={ group.id }
	>
		<div
			className={ `${ baseClassName }__font-group__container__button` }
			role="presentation"
			onClick={ () => handleGroupSelect( group.id ) }
		>
			<Dashicon
				className={ `${ baseClassName }__font-group__container__button__icon` }
				icon={ 'yes-alt' }
				size={ 30 }
				style={ {
					color:
						selectedGroup === group.id
							? 'var(--nfd-onboarding-sitegen-customize-icon-selected)'
							: 'var(--nfd-onboarding-sitegen-customize-grey-1)',
				} }
			/>
			<div
				className={ `${ baseClassName }__font-group__container__button__font-name__container` }
			>
				<span
					className={ `${ baseClassName }__font-group__container__button__font-name__container__heading` }
					style={ { fontFamily: group.headings } }
				>
					{ group.headings }
				</span>
				<br />
				<span
					className={ `${ baseClassName }__font-group__container__button__font-name__container__body` }
					style={ { fontFamily: group.body } }
				>
					{ group.body }
				</span>
			</div>
			{ group.id === 0 && (
				<span className="default">
					{ __( 'Default', 'wp-module-onboarding' ) }
				</span>
			) }
		</div>
	</div>
);

const CustomFontsForm = ( {
	baseClassName,
	customFont,
	setCustomFont,
	handleCancelCustomFonts,
	handleApplyCustomFonts,
	renderFontOptions,
} ) => (
	<div className={ `${ baseClassName }__fonts-form__container` }>
		<h5 className={ `${ baseClassName }__heading` }>
			{ __( 'CUSTOM FONTS', 'wp-module-onboarding' ) }
		</h5>
		<div>
			<div>
				<div>
					<span htmlFor="headings">
						{ __( 'Headings', 'wp-module-onboarding' ) }
					</span>
					<br />
					<select
						id="headings"
						value={ customFont.headings }
						onChange={ ( e ) =>
							setCustomFont( {
								...customFont,
								headings: e.target.value,
							} )
						}
					>
						<option>select</option>
						{ renderFontOptions() }
					</select>
				</div>
				<div>
					<span htmlFor="body">
						{ __( 'Body', 'wp-module-onboarding' ) }
					</span>
					<br />
					<select
						id="body"
						value={ customFont.body }
						onChange={ ( e ) =>
							setCustomFont( {
								...customFont,
								body: e.target.value,
							} )
						}
					>
						<option>
							{ __( 'select', 'wp-module-onboarding' ) }
						</option>
						{ renderFontOptions() }
					</select>
				</div>
			</div>
			<div
				className={ `${ baseClassName }__fonts-form__container__button__container` }
			>
				<Button
					className="cancel"
					onClick={ () => handleCancelCustomFonts() }
				>
					{ __( 'Cancel', 'wp-module-onboarding' ) }
				</Button>
				<Button
					className="apply"
					onClick={ handleApplyCustomFonts }
					variant="primary"
				>
					{ __( 'Apply', 'wp-module-onboarding' ) }
				</Button>
			</div>
		</div>
	</div>
);

const CustomFontsDisplay = ( {
	baseClassName,
	selectedGroup,
	selectedCustomFont,
	handleGroupSelect,
	handleEditCustomFont,
} ) => (
	<div className={ `${ baseClassName }__custom-fonts__container` }>
		<div
			className={ `${ baseClassName }__custom-fonts__container__header` }
		>
			<h5 className={ `${ baseClassName }__heading` }>
				<span>{ __( 'CUSTOM FONTS', 'wp-module-onboarding' ) }</span>
			</h5>
			<button onClick={ () => handleEditCustomFont() }>Edit fonts</button>
		</div>

		<div className={ `${ baseClassName }__font-group__container` }>
			<div
				className={ `${ baseClassName }__font-group__container__button` }
				role="presentation"
				onClick={ () => handleGroupSelect( 'custom' ) }
			>
				<Dashicon
					className={ `${ baseClassName }__font-group__container__button__icon` }
					icon={ 'yes-alt' }
					size={ 30 }
					style={ {
						color:
							selectedGroup === 'custom'
								? 'var(--nfd-onboarding-sitegen-customize-icon-selected)'
								: 'var(--nfd-onboarding-sitegen-customize-grey-1)',
					} }
				/>
				<div
					className={ `${ baseClassName }__font-group__container__button__font-name__container` }
				>
					<span
						className={ `${ baseClassName }__font-group__container__button__font-name__container__heading` }
						style={ { fontFamily: selectedCustomFont.headings } }
					>
						{ selectedCustomFont.headings }
					</span>
					<br />
					<span
						className={ `${ baseClassName }__font-group__container__button__font-name__container__body` }
						style={ { fontFamily: selectedCustomFont.body } }
					>
						{ selectedCustomFont.body }
					</span>
				</div>
			</div>
		</div>
	</div>
);

const DesignFontsPanel = ( {
	baseClassName = 'nfd-onboarding-sidebar--customize__design-fonts-panel',
} ) => {
	const { customizeSidebarData } = useSelect( ( select ) => {
		return {
			customizeSidebarData:
				select( nfdOnboardingStore ).getCustomizeSidebarData(),
		};
	}, [] );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const design = customizeSidebarData?.design;
	const designStyles = customizeSidebarData?.designStyles;
	const { setCurrentOnboardingData } = useDispatch( nfdOnboardingStore );

	const fontGroups = [
		{
			id: 0,
			headings: design?.style?.fonts_heading,
			body: design?.style?.fonts_content,
		},
		{
			id: 1,
			headings: designStyles[ 1 ]?.fonts_heading,
			body: designStyles[ 1 ]?.fonts_content,
		},
		{
			id: 2,
			headings: designStyles[ 2 ]?.fonts_heading,
			body: designStyles[ 2 ]?.fonts_content,
		},
		{
			id: 3,
			headings: designStyles[ 3 ]?.fonts_heading,
			body: designStyles[ 3 ]?.fonts_content,
		},
	];

	const [ selectedGroup, setSelectedGroup ] = useState( null );
	const [ showCustomFonts, setShowCustomFonts ] = useState( false );
	const [ customFont, setCustomFont ] = useState( {
		headings: '',
		body: '',
	} );
	const [ selectedCustomFont, setSelectedCustomFont ] = useState( null );
	const [ isEditingCustomFont, setIsEditingCustomFont ] = useState( false );

	const fontsHeading = designStyles?.map( ( style ) => style.fonts_heading );
	const fontsContent = designStyles?.map( ( style ) => style.fonts_content );

	const handleUpdatePreviewSettings = () => {
		let headings;
		let body;
		if ( selectedGroup === 'custom' ) {
			headings = customFont.headings;
			body = customFont.body;
		} else {
			headings = fontGroups[ selectedGroup ].headings;
			body = fontGroups[ selectedGroup ].body;
		}
		const slug = currentData.sitegen?.homepages?.active?.slug;

		if ( slug ) {
			currentData.sitegen.homepages.data[ slug ] = {
				...currentData.sitegen.homepages.data[ slug ],
				styles: {
					blocks: [
						{
							'core/heading': {
								typography: {
									fontFamily: headings,
								},
							},
							'core/body': {
								typography: {
									fontFamily: body,
								},
							},
						},
					],
				},
			};
			currentData.sitegen.homepages.active = {
				...currentData.sitegen.homepages.active,
				styles: {
					blocks: [
						{
							'core/heading': {
								typography: {
									fontFamily: headings,
								},
							},
							'core/body': {
								typography: {
									fontFamily: body,
								},
							},
						},
					],
				},
			};
			setCurrentOnboardingData( currentData );
		}
	};

	useEffect( () => {
		if ( selectedGroup !== null && selectedGroup !== undefined ) {
			handleUpdatePreviewSettings();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ selectedGroup, customFont ] );

	const fontOptions = [ ...new Set( [ ...fontsHeading, ...fontsContent ] ) ];

	const handleGroupSelect = ( groupId ) => {
		if ( groupId !== 'custom' && selectedCustomFont ) {
			setShowCustomFonts( false );
		}
		setSelectedGroup( groupId );
	};

	const handleSelectYourOwnFonts = () => {
		setShowCustomFonts( true );
		if ( ! selectedCustomFont ) {
			setIsEditingCustomFont( true );
		}
	};

	const handleEditCustomFont = () => {
		setIsEditingCustomFont( true );
	};

	const handleCancelCustomFonts = () => {
		if ( ! selectedCustomFont ) {
			setShowCustomFonts( false );
		} else {
			setIsEditingCustomFont( false );
		}
	};

	const handleApplyCustomFonts = () => {
		setSelectedGroup( null );
		setSelectedCustomFont( customFont );
		setIsEditingCustomFont( false );
		setSelectedGroup( 'custom' );
	};

	const renderFontOptions = () => {
		return fontOptions.map( ( font ) => (
			<option key={ font } value={ font }>
				{ font }
			</option>
		) );
	};

	const renderFontGroups = () => {
		return fontGroups.map( ( group ) => (
			<FontGroup
				baseClassName={ baseClassName }
				key={ group.id }
				group={ group }
				selectedGroup={ selectedGroup }
				handleGroupSelect={ handleGroupSelect }
			/>
		) );
	};

	const renderCustomFontsForm = () => {
		return (
			<CustomFontsForm
				baseClassName={ baseClassName }
				customFont={ customFont }
				setCustomFont={ setCustomFont }
				handleCancelCustomFonts={ handleCancelCustomFonts }
				handleApplyCustomFonts={ handleApplyCustomFonts }
				renderFontOptions={ renderFontOptions }
			/>
		);
	};

	const renderCustomFontsDisplay = () => {
		return (
			<CustomFontsDisplay
				baseClassName={ baseClassName }
				selectedGroup={ selectedGroup }
				selectedCustomFont={ selectedCustomFont }
				handleGroupSelect={ handleGroupSelect }
				handleEditCustomFont={ handleEditCustomFont }
			/>
		);
	};

	return (
		<PanelBody className={ baseClassName } initialOpen={ true }>
			<PanelRow>
				<div className={ `${ baseClassName }__container` }>
					<div className={ `${ baseClassName }__container__text` }>
						<p
							className={ `${ baseClassName }__container__text__heading` }
						>
							<strong>
								{ __( 'Fonts', 'wp-module-onboarding' ) }
							</strong>
						</p>
					</div>
					<div>{ renderFontGroups() }</div>
				</div>
			</PanelRow>

			<PanelRow>
				{ ! showCustomFonts && (
					<div className={ `${ baseClassName }__container` }>
						<Button
							onClick={ () => {
								handleSelectYourOwnFonts();
							} }
						>
							{ __(
								'Select your own fonts',
								'wp-module-onboarding'
							) }
						</Button>
					</div>
				) }
				{ showCustomFonts &&
					isEditingCustomFont &&
					renderCustomFontsForm() }
				{ showCustomFonts &&
					! isEditingCustomFont &&
					renderCustomFontsDisplay() }
			</PanelRow>
		</PanelBody>
	);
};

export default DesignFontsPanel;
