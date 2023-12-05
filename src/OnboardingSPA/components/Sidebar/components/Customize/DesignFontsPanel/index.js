import React, { useState } from 'react';
import { PanelBody, PanelRow, Button, Dashicon } from '@wordpress/components';
import './stylesheet.scss';
import { design, designStyles } from '../data';

const FontGroup = ({ baseClassName, group, selectedGroup, handleGroupSelect }) => (
	<div className={`${baseClassName}__font-group__container`} key={group.id} >
		<div className={`${baseClassName}__font-group__container__button`} role="button" onClick={() => handleGroupSelect(group.id)}>
			<Dashicon className={`${baseClassName}__font-group__container__button__icon`} icon={'yes-alt'} size={30} style={{ color: selectedGroup === group.id ? '#0160F0' : '#9ca2a7' }} />
			<div className={`${baseClassName}__font-group__container__button__font-name__container`} >
				<span className={`${baseClassName}__font-group__container__button__font-name__container__heading`} style={{ fontFamily: group.headings }}>{group.headings}</span><br />
				<span className={`${baseClassName}__font-group__container__button__font-name__container__body`} style={{ fontFamily: group.body }}>{group.body}</span>
			</div>
			{group.id === 1 && <span className='default'>Default</span>}
		</div>
	</div>
);

const CustomFontsForm = ({ baseClassName, customFont, setCustomFont, handleCancelCustomFonts, handleApplyCustomFonts, renderFontOptions }) => (
	<div className={`${baseClassName}__fonts-form__container`}>
		<h5 className={`${baseClassName}__heading`}>CUSTOM FONTS</h5>
		<div>
			<div>
				<div>
					<span htmlFor="headings">Headings</span><br />
					<select
						id="headings"
						value={customFont.headings}
						onChange={(e) => setCustomFont({ ...customFont, headings: e.target.value })}
					>
						<option>select</option>
						{renderFontOptions()}
					</select>
				</div>
				<div>
					<span htmlFor="body">Body</span><br />
					<select
						id="body"
						value={customFont.body}
						onChange={(e) => setCustomFont({ ...customFont, body: e.target.value })}
					>
						<option>select</option>
						{renderFontOptions()}
					</select>
				</div>
			</div>
			<div className={`${baseClassName}__fonts-form__container__button__container`} >
				<Button className='cancel' onClick={() => handleCancelCustomFonts()} >
					Cancel
				</Button>
				<Button className='apply' onClick={handleApplyCustomFonts} variant="primary" >
					Apply
				</Button>
			</div>
		</div>
	</div>
);

const CustomFontsDisplay = ({ baseClassName, selectedGroup, selectedCustomFont, handleGroupSelect, handleEditCustomFont }) => (
	<div className={`${baseClassName}__custom-fonts__container`}>
		<div className={`${baseClassName}__custom-fonts__container__header`}>
			<h5 className={`${baseClassName}__heading`}>
				<span>CUSTOM FONTS</span>
			</h5>
			<button onClick={() => handleEditCustomFont()} >
				Edit fonts
			</button>
		</div>


		<div className={`${baseClassName}__font-group__container`}>
			<div className={`${baseClassName}__font-group__container__button`} role="button" onClick={() => handleGroupSelect('custom')}>
				<Dashicon className={`${baseClassName}__font-group__container__button__icon`} icon={'yes-alt'} size={30} style={{ color: selectedGroup === 'custom' ? '#0160F0' : '#9ca2a7' }} />
				<div className={`${baseClassName}__font-group__container__button__font-name__container`} >
					<span className={`${baseClassName}__font-group__container__button__font-name__container__heading`} style={{ fontFamily: selectedCustomFont.headings }}>{selectedCustomFont.headings}</span><br />
					<span className={`${baseClassName}__font-group__container__button__font-name__container__body`} style={{ fontFamily: selectedCustomFont.body }}>{selectedCustomFont.body}</span>
				</div>
			</div>
		</div>
	</div>
);

const DesignFontsPanel = ({ baseClassName = 'nfd-onboarding-sidebar-customize__design-fonts-panel' }) => {
	const fontGroups = [
		{ id: 1, headings: design.style.fonts_heading, body: design.style.fonts_content },
		{ id: 2, headings: designStyles[1].fonts_heading, body: designStyles[1].fonts_content },
		{ id: 3, headings: designStyles[2].fonts_heading, body: designStyles[2].fonts_content },
		{ id: 4, headings: designStyles[3].fonts_heading, body: designStyles[3].fonts_content },
	];

	const [selectedGroup, setSelectedGroup] = useState(null);
	const [showCustomFonts, setShowCustomFonts] = useState(false);
	const [customFont, setCustomFont] = useState({ headings: '', body: '' });
	const [selectedCustomFont, setSelectedCustomFont] = useState(null);
	const [isEditingCustomFont, setIsEditingCustomFont] = useState(false);

	const fontsHeading = designStyles.map(style => style.fonts_heading);
	const fontsContent = designStyles.map(style => style.fonts_content);

	const fontOptions = [...new Set([...fontsHeading, ...fontsContent])];

	const handleGroupSelect = (groupId) => {
		setSelectedGroup(groupId);
	};

	const handleEditCustomFont = () => {
		setIsEditingCustomFont(true);
	};

	const handleCancelCustomFonts = () => {
		if (!selectedCustomFont) {
			setShowCustomFonts(false);
		} else {
			setIsEditingCustomFont(false);
		}
	};

	const handleApplyCustomFonts = () => {
		setSelectedGroup(null);
		setSelectedCustomFont(customFont);
		setIsEditingCustomFont(false);
		setSelectedGroup('custom');
		console.log('Custom Fonts Selected:', customFont);
	};

	const renderFontOptions = () => {
		return fontOptions.map((font) => (
			<option key={font} value={font}>
				{font}
			</option>
		));
	};

	const renderFontGroups = () => {
		return fontGroups.map((group) => (
			<FontGroup baseClassName={baseClassName} key={group.id} group={group} selectedGroup={selectedGroup} handleGroupSelect={handleGroupSelect} />
		));
	};

	const renderCustomFontsForm = () => {
		return (
			<CustomFontsForm
				baseClassName={baseClassName}
				customFont={customFont}
				setCustomFont={setCustomFont}
				handleCancelCustomFonts={handleCancelCustomFonts}
				handleApplyCustomFonts={handleApplyCustomFonts}
				renderFontOptions={renderFontOptions}
			/>
		);
	};

	const renderCustomFontsDisplay = () => {
		return (
			<CustomFontsDisplay
				baseClassName={baseClassName}
				selectedGroup={selectedGroup}
				selectedCustomFont={selectedCustomFont}
				handleGroupSelect={handleGroupSelect}
				handleEditCustomFont={handleEditCustomFont}
			/>
		);
	};

	return (
		<PanelBody className={baseClassName} initialOpen={true}>
			<PanelRow>
				<div className={`${baseClassName}__container`}>
					<div className={`${baseClassName}__container__text`}>
						<p className={`${baseClassName}__container__text__heading`}>
							<strong>Fonts</strong>
						</p>
					</div>
					<div>{renderFontGroups()}</div>
				</div>
			</PanelRow>

			<PanelRow>
				{!showCustomFonts && (
					<div className={`${baseClassName}__container`}>
						<Button
							onClick={() => {
								setShowCustomFonts(true);
								setIsEditingCustomFont(true);
							}}
						>
							Select your own fonts
						</Button>
					</div>
				)}
				{showCustomFonts && isEditingCustomFont && renderCustomFontsForm()}
				{showCustomFonts && !isEditingCustomFont && renderCustomFontsDisplay()}
			</PanelRow>
		</PanelBody>
	);
};

export default DesignFontsPanel;
