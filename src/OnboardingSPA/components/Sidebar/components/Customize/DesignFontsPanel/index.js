import React, { useState } from 'react';
import { PanelBody, PanelRow, Button, Dashicon } from '@wordpress/components';

const FontGroup = ({ group, selectedGroup, handleGroupSelect }) => (
	<div key={group.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start', width: '100%' }}>
		<div role="button" style={{ cursor: 'pointer', display: 'flex', alignItems: 'flex-start', marginLeft: '0px', width: '100%' }} onClick={() => handleGroupSelect(group.id)}>
			<Dashicon icon={'yes-alt'} size={30} style={{ marginRight: '10px', color: selectedGroup === group.id ? '#0160F0' : '#9ca2a7' }} />
			<div style={{ marginLeft: '10px', flex: 1 }}>
				<span style={{ fontSize: '18px', fontFamily: group.headings, marginBottom: '5px' }}>{group.headings}</span><br />
				<span style={{ fontFamily: group.body, marginBottom: '5px' }}>{group.body}</span>
			</div>
			{group.id === 1 && <span style={{ marginLeft: 'auto', textAlign: 'right' }}>Default</span>}
		</div>
	</div>
);

const CustomFontsForm = ({ baseClassName, customFont, setCustomFont, handleCancelCustomFonts, handleApplyCustomFonts, renderFontOptions }) => (
	<div style={{ width: '100%' }}>
		<h5 className={`${baseClassName}__heading`}>CUSTOM FONTS</h5>
		<div style={{ width: '100%' }}>
			<div style={{ width: '100%' }}>
				<div>
					<span htmlFor="headings" style={{ margin: '10px 0px' }}>Headings</span><br />
					<select
						id="headings"
						value={customFont.headings}
						onChange={(e) => setCustomFont({ ...customFont, headings: e.target.value })}
						style={{ margin: '5px 0px', width: '100%' }}
					>
						<option>select</option>
						{renderFontOptions()}
					</select>
				</div>
				<div>
					<span htmlFor="body" style={{ margin: '10px 0px' }}>Body</span><br />
					<select
						id="body"
						value={customFont.body}
						onChange={(e) => setCustomFont({ ...customFont, body: e.target.value })}
						style={{ margin: '5px 0px', width: '100%' }}
					>
						<option>select</option>
						{renderFontOptions()}
					</select>
				</div>
			</div>
			<div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
				<Button onClick={() => handleCancelCustomFonts()} style={{ color: '#44494d' }}>
					Cancel
				</Button>
				<Button onClick={handleApplyCustomFonts} variant="primary" style={{ backgroundColor: '#44494d', borderRadius: '5px' }}>
					Apply
				</Button>
			</div>
		</div>
	</div>
);

const CustomFontsDisplay = ({ baseClassName, selectedGroup, selectedCustomFont, handleGroupSelect, handleEditCustomFont }) => (
	<div style={{ width: '100%' }}>
		<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
			<h5 className={`${baseClassName}__heading`}>
				<span>CUSTOM FONTS</span>
			</h5>
			<button
				onClick={() => handleEditCustomFont()}
				style={{ background: 'none', border: 'none', padding: '0', textDecoration: 'underline', cursor: 'pointer', color: '#007cba' }}
			>
				Edit fonts
			</button>
		</div>


		<div style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start', width: '100%' }}>
			<div role="button" style={{ cursor: 'pointer', display: 'flex', alignItems: 'flex-start', marginLeft: '0px', width: '100%' }} onClick={() => handleGroupSelect('custom')}>
				<Dashicon icon={'yes-alt'} size={30} style={{ marginRight: '10px', color: selectedGroup === 'custom' ? '#0160F0' : '#9ca2a7' }} />
				<div style={{ marginLeft: '10px', flex: 1 }}>
					<span style={{ fontSize: '18px', fontFamily: selectedCustomFont.headings, marginBottom: '5px' }}>{selectedCustomFont.headings}</span><br />
					<span style={{ fontFamily: selectedCustomFont.body, marginBottom: '5px' }}>{selectedCustomFont.body}</span>
				</div>
			</div>
		</div>
	</div>
);

const DesignFontsPanel = ({ baseClassName = 'nfd-onboarding-sidebar-customize--design-fonts-panel' }) => {
	const fontGroups = [
		{ id: 1, headings: 'BOTANICA', body: 'Inter' },
		{ id: 2, headings: 'DM Sherif Display', body: 'DM Sans' },
		{ id: 3, headings: 'Nunito', body: 'Nunito Sans' },
		{ id: 4, headings: 'Oswald', body: 'Source Sans Pro' },
	];

	const [selectedGroup, setSelectedGroup] = useState(null);
	const [showCustomFonts, setShowCustomFonts] = useState(false);
	const [customFont, setCustomFont] = useState({ headings: '', body: '' });
	const [selectedCustomFont, setSelectedCustomFont] = useState(null);
	const [isEditingCustomFont, setIsEditingCustomFont] = useState(false);

	const fontOptions = ['Arial', 'Verdana', 'Courier New', 'Helvetica', 'Tahoma', 'Comic Sans MS'];

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
			<FontGroup key={group.id} group={group} selectedGroup={selectedGroup} handleGroupSelect={handleGroupSelect} />
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
				<div className={`${baseClassName}__container`} style={{ width: '100%' }}>
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
					<div style={{ width: '100%', textAlign: 'center' }}>
						<Button
							style={{
								border: '1px solid #9ca2a7',
								borderRadius: '8px',
								width: '100%',
								display: 'block',
								margin: '0 auto',
							}}
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
