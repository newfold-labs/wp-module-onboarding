import { useSelect } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { installBlueprintRequiredPlugins, importBlueprint } from '@/utils/api';

const usePublishBlueprintSite = () => {
	const [ status, setStatus ] = useState( '' );

	const { selectedBlueprint } = useSelect( ( select ) => {
		return {
			selectedBlueprint: select( nfdOnboardingStore ).getSelectedBlueprint(),
		};
	} );

	const installRequiredPlugins = async () => {
		setStatus( __( 'Installing required plugins…', 'wp-module-onboarding' ) );
		await installBlueprintRequiredPlugins( selectedBlueprint );
		// Set 3 seconds minimum message duration.
		await new Promise( ( resolve ) => setTimeout( resolve, 2000 ) );
	};

	const publishBlueprint = async () => {
		setStatus( __( 'Importing blueprint…', 'wp-module-onboarding' ) );
		await importBlueprint( selectedBlueprint );
		// Set 3 seconds minimum message duration.
		await new Promise( ( resolve ) => setTimeout( resolve, 2000 ) );
	};

	const publishBlueprintSite = async () => {
		await installRequiredPlugins();
		await publishBlueprint();
	};

	return { status, publishBlueprintSite };
};

export default usePublishBlueprintSite;
