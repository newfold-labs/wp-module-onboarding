import CommonLayout from '../../../../components/Layouts/Common';
import { useEffect, useState } from '@wordpress/element';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { store as nfdOnboardingStore } from '../../../../store';
import { useDispatch, useSelect } from '@wordpress/data';

import { VIEW_NAV_ECOMMERCE_STORE_INFO } from '../../../../../constants';
import NavCardButton from '../../../../components/Button/NavCardButton';
import content from '../content.json';
import { __ } from '@wordpress/i18n';
import { RadioControl } from '@wordpress/components';
import CardHeader from '../../../../components/CardHeader';

const StepTax = () => {

    const { setDrawerActiveView, setIsDrawerOpened, setIsSidebarOpened, setCurrentOnboardingData } =
        useDispatch( nfdOnboardingStore );

	let currentData = useSelect((select) =>
		select(nfdOnboardingStore).getCurrentOnboardingData()
	);

    useEffect( () => {
        setIsSidebarOpened( false );
        setIsDrawerOpened( true );
        setDrawerActiveView( VIEW_NAV_ECOMMERCE_STORE_INFO );
    }, [] );

    return (
        <CommonLayout isCentered>
            <NewfoldLargeCard>
                <div className="nfd-onboarding-experience-step">
                    <div className="nfd-card-heading center onboarding-ecommerce-step">
                        <CardHeader
                            heading={__(content.stepTaxHeading)}
                            subHeading={__(content.stepTaxSubHeading)}
                            question={__(content.question)}
                        />
                    </div>
                    <RadioControl
						className="nfd-onboarding-experience-step-tabs components-radio-control__input radio-control-tax-step"
						selected={currentData.taxInfo}
						options={ content.stepTaxOptions.map( ( option ) => {
							return {
								label: __( option.content ),
								value: __( option.value ),
							};
						} ) }
						onChange={ ( value ) => setCurrentOnboardingData({taxInfo: value}) }
					/>
                    <NavCardButton
                        text={__(content.buttonText)}
                    />
                    <p>
                        <em>
                            Need help? <a>Hire our experts</a>
                        </em>
                    </p>
                </div>
            </NewfoldLargeCard>
        </CommonLayout>
    );
};

export default StepTax;
