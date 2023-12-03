import { Fill, Dropdown } from '@wordpress/components';
import { HEADER_CENTER, HEADER_END, HEADER_SITEGEN, HEADER_START } from '../../../../../constants';
import { Icon, chevronDown, home } from '@wordpress/icons';
import { store as nfdOnboardingStore } from '../../../../store';

import { useSelect, useDispatch } from '@wordpress/data';

import { useEffect, useState } from '@wordpress/element';

const StepSiteGenEditorHeader = () => {
     const [homepage, setHomepage] = useState();

     const { setCurrentOnboardingData } = useDispatch(nfdOnboardingStore);
     const { currentData } = useSelect((select) => {
          return {
              currentData:  select(nfdOnboardingStore).getCurrentOnboardingData(),
          }
     })

     const handleFavorite = () => {
		homepage.favorite = ! homepage.favorite;
		currentData.sitegen.homepages.data[homepage.slug] = homepage;
		setCurrentOnboardingData( currentData );
	}

     useEffect(() => {
          if ( currentData.sitegen.homepages.active ) {

               setHomepage(currentData.sitegen.homepages.active)
          }
     }, [])
     return 			<>
     <Fill name={ `${ HEADER_SITEGEN }/${ HEADER_START }` }>
          <div className='nfd-onboarding-header--sitegen__editor__start'>
               <button className='nfd-onboarding-header--sitegen__editor__start__regenerate'>
                    <div className={`nfd-onboarding-header--sitegen__editor__start__regenerate__icon`}></div>
                    <div className={`nfd-onboarding-header--sitegen__editor__start__regenerate__text`}>Regenerate</div>
               </button>
          </div>
</Fill>
<Fill name={`${HEADER_SITEGEN}/${HEADER_CENTER}`}>
     <div className='nfd-onboarding-header--sitegen__editor__center'>
          <div className='nfd-onboarding-header--sitegen__editor__center__icon'></div>
          <Dropdown className='nfd-onboarding-header--sitegen__editor__center__dropdown'
          renderToggle={( { isOpen, onToggle } ) => {
               return <>
               <p className={`nfd-onboarding-header--sitegen__editor__center__dropdown__favorite-icon ${homepage.favorite && 'nfd-onboarding-header--sitegen__editor__center__dropdown__favorite-icon__fill'}`} onClick={handleFavorite}></p>
               <div className='nfd-onboarding-header--sitegen__editor__center__dropdown__info' onClick={onToggle}>
               <p className='nfd-onboarding-header--sitegen__editor__center__dropdown__info__text'>{homepage.title}</p>
               <Icon className='nfd-onboarding-header--sitegen__editor__center__dropdown__info__down-icon' icon={chevronDown} />
               </div>
               </>

          }}
          renderContent={() => <div>Hello World</div>}
          />
     </div>
</Fill>
<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_END }` }>
</Fill>
     </>
}

export default StepSiteGenEditorHeader;