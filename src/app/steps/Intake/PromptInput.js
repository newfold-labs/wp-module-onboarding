import { Label, TextareaField } from '@newfold/ui-component-library';

const PromptInput = () => {
	const [ value, setValue ] = useState( '' );

	const inputPlaceholder = __(
		'Ex: My business is called the “Bean there Café”. We offer a cozy, sustainable coffee shop in Asheville, North Carolina, focused on fair-trade coffee and local pastries. The site should feature a menu, a listing of upcoming events, and a blog on coffee culture.',
		'wp-module-onboarding'
	);

	return (
		<div className="nfd-flex nfd-flex-col nfd-gap-2">
			<Label
				label={ __( 'Describe your site', 'wp-module-onboarding' ) }
				htmlFor="nfd-onboarding-prompt"
				required={ true }
				requiredIndicator={ true }
			/>
			<span className="nfd-block">
				{ __( 'What type of site will this be? Who is this site for?', 'wp-module-onboarding' ) }
			</span>
			<TextareaField
				id="nfd-onboarding-prompt"
				placeholder={ inputPlaceholder }
				className="[&_.nfd-textarea]:nfd-h-40"
				value={ value }
				onChange={ ( e ) => setValue( e.target.value ) }
				required={ true }
			/>
		</div>
	);
};

export default PromptInput;
