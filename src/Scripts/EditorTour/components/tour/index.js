// import './stylesheet.css';
import { useState, useEffect } from '@wordpress/element';
import { Icon, closeSmall } from '@wordpress/icons';
import welcomeImg from '../../images/welcome.png';
import wonderblocksImg from '../../images/wonderblocks.png';
import publishImg from '../../images/publish.png';
import wpImg from '../../images/wp.png';
import getContents from './content';
import { getEditorTourStatus, updateEditorTourStatus } from '../../utils/api';

const Tour = () => {
	const content = getContents();
	const steps = content.steps;
	const tourConstants = {
		innerWidth: 600,
		dialogTopBuffer: 200,
		dialogLeftBuffer: 210,
		dialogRightBuffer: 50,
		dialogMidPoint: 500,
	};

	const [ isVisible, setIsVisible ] = useState( false );
	const [ stepIndex, setStepIndex ] = useState( 0 );

	let dialogPosition = {
		top: '50%',
		left: '50%',
	};

	const handleNextStep = () => {
		setStepIndex( ( prevIndex ) => prevIndex + 1 );
	};

	// keeping the code as the decision is pending
	// const handlePrevStep = () => {
	// 	setStepIndex( ( prevIndex ) => prevIndex - 1 );
	// };

	const handleSkipTour = () => {
		updateTourStatus();
	};

	const checkTourStatus = async () => {
		const editorTourStatus = await getEditorTourStatus();
		setIsVisible( editorTourStatus.body );
	};

	const updateTourStatus = async () => {
		const editorTourStatus = await updateEditorTourStatus();
		if ( editorTourStatus.body ) {
			setIsVisible( false );
		}
	};

	useEffect( () => {
		checkTourStatus();
	}, [] );

	const currentStep = steps[ stepIndex ];

	if ( currentStep.stepTargetClassName !== null ) {
		// Calculate the position of the tour dialog
		const targetStepElement = document.querySelector(
			`.${ currentStep.stepTargetClassName }`
		);

		if (
			targetStepElement &&
			window.innerWidth > tourConstants.innerWidth
		) {
			const { top, left, width, height, x } =
				targetStepElement.getBoundingClientRect();
			dialogPosition = {
				top: top + height + tourConstants.dialogTopBuffer, // Adjust the top position to leave some space below the step
				left: left + tourConstants.dialogLeftBuffer, // Adjust the left position to leave some space to the right of the step
			};
			if ( x > tourConstants.dialogMidPoint ) {
				dialogPosition = {
					...dialogPosition,
					left: left - width - tourConstants.dialogRightBuffer,
				};
			}
		}
	}

	function StepImg() {
		let imageUrl;

		switch ( stepIndex ) {
			case 0:
				imageUrl = welcomeImg;
				break;
			case 1:
				imageUrl = wonderblocksImg;
				break;
			case 2:
				imageUrl = publishImg;
				break;
			case 3:
				imageUrl = wpImg;
				break;
			default:
				break;
		}

		return (
			<img
				className="nfd-tour__step__img"
				src={ imageUrl }
				alt="img"
			></img>
		);
	}

	function renderStepProgress() {
		return steps.map( ( step, index ) => (
			<div
				key={ index }
				className={
					index === stepIndex
						? 'nfd-tour__step__footer__progress-icon__selected'
						: 'nfd-tour__step__footer__progress-icon'
				}
			></div>
		) );
	}

	const renderStepHeader = () => {
		return (
			<div className={ 'nfd-tour__step__header' }>
				<button
					className="nfd-tour__step__header__resetbutton"
					onClick={ handleSkipTour }
				>
					<Icon
						className="nfd-tour__step__header__resetbutton__icon"
						icon={ closeSmall }
					/>
				</button>
			</div>
		);
	};
	const renderStepContent = () => {
		return (
			<>
				<div className="nfd-tour__step__img-container">
					{ StepImg() }
				</div>
				<div
					className={ `nfd-tour__step__title ${
						stepIndex === 0 ? 'nfd-tour__step__title__big' : ''
					}` }
				>
					{ currentStep.title }
				</div>
				<div
					className={ `nfd-tour__step__content ${
						stepIndex === 0 ? 'nfd-tour__step__content__big' : ''
					}` }
				>
					{ currentStep.content }
				</div>
			</>
		);
	};
	const renderStepFooter = () => {
		return (
			<div className={ 'nfd-tour__step__footer' }>
				<div className={ 'nfd-tour__step__footer__box-info' }>
					{ renderStepProgress() }
				</div>
				<div className={ 'nfd-tour__step__footer__button' }>
					{ /* keeping the code as the decision is pending 
					{ stepIndex > 0 && (
						<button onClick={ handlePrevStep }>Previous</button>
					) } */ }
					{ stepIndex === 0 && (
						<button onClick={ handleNextStep }>
							Start Tour &gt;
						</button>
					) }
					{ stepIndex > 0 && stepIndex < steps.length - 1 && (
						<button onClick={ handleNextStep }>Next &gt;</button>
					) }
					{ stepIndex === steps.length - 1 && (
						<button onClick={ handleSkipTour }>Done</button>
					) }
				</div>
			</div>
		);
	};
	return (
		<div>
			{ isVisible && (
				<div className="nfd-tour-overlay">
					<div
						className={ `nfd-tour__dialog ${
							stepIndex === 0 ? 'nfd-tour__dialog__big' : ''
						}` }
						style={ {
							top: dialogPosition.top,
							left: dialogPosition.left,
						} }
					>
						<div className="nfd-tour-content">
							{ renderStepHeader() }
							{ renderStepContent() }
							{ renderStepFooter() }
						</div>
					</div>
				</div>
			) }
		</div>
	);
};

export default Tour;
