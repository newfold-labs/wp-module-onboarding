import { FOOTER_END, FOOTER_START } from '../../../constants';
import { Slot } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { Fragment, Suspense } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../store';

const Footer = () => {
	const { footers, footerActiveView } = useSelect( ( select ) => {
		return {
			footers: select( nfdOnboardingStore ).getFooters(),
			footerActiveView:
				select( nfdOnboardingStore ).getFooterActiveView(),
		};
	} );
	return (
		<div className={ 'nfd-onboarding-footer' }>
			<Suspense fallback={ <Fragment /> }>
				{ footers.map( ( footer ) => {
					return (
						<Fragment key={ footer.id }>
							<footer.footer />
						</Fragment>
					);
				} ) }
			</Suspense>
			<div className="nfd-onboarding-footer__start">
				<Slot name={ `${ footerActiveView }/${ FOOTER_START }` } />
			</div>
			<div className="nfd-onboarding-footer__end">
				<Slot name={ `${ footerActiveView }/${ FOOTER_END }` } />
			</div>
		</div>
	);
};

export default Footer;
