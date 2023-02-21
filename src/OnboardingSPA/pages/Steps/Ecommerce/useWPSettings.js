import { fetchWPSettings } from '../../../utils/api/ecommerce';

export async function useWPSettings() {
	const settings = await fetchWPSettings().catch( () => ( {} ) );
	return settings;
}
