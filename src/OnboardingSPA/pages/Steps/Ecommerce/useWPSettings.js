import { useEffect, useState } from '@wordpress/element';
import { fetchWPSettings } from '../../../utils/api/ecommerce';
export function useWPSettings() {
  const [settings, setSettings] = useState(null);
	async function getInitialSettings() {
		let settings = await fetchWPSettings().catch(() => ({}));
		setSettings(settings);
	}
	useEffect(() => {
		getInitialSettings();
	}, []);
	return settings;
}