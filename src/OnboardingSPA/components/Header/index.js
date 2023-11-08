import { Slot } from '@wordpress/components';
import { Fragment, Suspense } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../store';
import {
	HEADER_CENTER,
	HEADER_END,
	HEADER_START,
	HEADER_TOP,
} from '../../../constants';

const Header = () => {
	const { headers, headerActiveView, isHeaderEnabled } = useSelect(
		( select ) => {
			return {
				headers: select( nfdOnboardingStore ).getHeaders(),
				headerActiveView:
					select( nfdOnboardingStore ).getHeaderActiveView(),
				isHeaderEnabled: select( nfdOnboardingStore ).isHeaderEnabled(),
			};
		}
	);

	return (
		<>
			<Suspense fallback={ <Fragment /> }>
				{ headers.map( ( header ) => {
					return (
						<Fragment key={ header.id }>
							<header.header />
						</Fragment>
					);
				} ) }
			</Suspense>
			<Slot name={ `${ headerActiveView }/${ HEADER_TOP }` } />
			{ isHeaderEnabled && (
				<div className="nfd-onboarding-header">
					<div className="nfd-onboarding-header__start">
						<Slot
							name={ `${ headerActiveView }/${ HEADER_START }` }
						/>
					</div>
					<div className="nfd-onboarding-header__center">
						<Slot
							name={ `${ headerActiveView }/${ HEADER_CENTER }` }
						/>
					</div>
					<div className="nfd-onboarding-header__end">
						<Slot
							name={ `${ headerActiveView }/${ HEADER_END }` }
						/>
					</div>
				</div>
			) }
		</>
	);
};

export default Header;
