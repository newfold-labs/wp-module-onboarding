import './stylesheet.css';
import { useState } from '@wordpress/element';
import { Icon, closeSmall } from '@wordpress/icons';
import welcomeImg from '../../images/welcome.png';
import wonderblocksImg from '../../images/wonderblocks.png';
import publishImg from '../../images/publish.png';
import wpImg from '../../images/wp.png';
import getContents from './content';

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
	const [ isVisible, setIsVisible ] = useState( true );
	const [ stepIndex, setStepIndex ] = useState( 0 );

	let dialogPosition = {
		top: '50%',
		left: '50%',
	};

	const handleNextStep = () => {
		setStepIndex( ( prevIndex ) => prevIndex + 1 );
	};

	const handlePrevStep = () => {
		setStepIndex( ( prevIndex ) => prevIndex - 1 );
	};

	const handleSkipTour = () => {
		// Logic for skipping the tour
		// setStepIndex( steps.length - 1 );
		setIsVisible( false );
	};

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

		return <img className="tour-step-img" src={ imageUrl } alt="img"></img>;
	}

	function renderStepProgress() {
		return steps.map( ( step, index ) => (
			<div
				key={ index }
				className={
					index == stepIndex
						? 'tour-step-progress-icon-selected'
						: 'tour-step-progress-icon'
				}
			></div>
		) );
	}

	const renderStepHeader = () => {
		return (
			<div className={ 'tour-step-header' }>
				<button
					className="tour-step-header__resetbutton"
					onClick={ handleSkipTour }
				>
					<Icon
						className="tour-step-header__resetbutton__icon"
						icon={ closeSmall }
					/>
				</button>
			</div>
		);
	};
	const renderStepContent = () => {
		return (
			<>
				<div className="tour-step-img-container">{ StepImg() }</div>
				<div
					className={ `tour-step-title ${
						stepIndex === 0 ? 'tour-step-title-big' : ''
					}` }
				>
					{ currentStep.title }
				</div>
				<div
					className={ `tour-step-content ${
						stepIndex === 0 ? 'tour-step-content-big' : ''
					}` }
				>
					{ currentStep.content }
				</div>
			</>
		);
	};
	const renderStepFooter = () => {
		return (
			<div className={ 'tour-step-footer' }>
				<div className={ 'tour-step-footer-box-info' }>
					{ renderStepProgress() }
				</div>
				<div className={ 'tour-step-footer-button' }>
					{ stepIndex > 0 && (
						<button onClick={ handlePrevStep }>Previous</button>
					) }
					{ stepIndex === 0 && (
						<button onClick={ handleNextStep }>Start Tour ></button>
					) }
					{ stepIndex > 0 && stepIndex < steps.length - 1 && (
						<button onClick={ handleNextStep }>Next ></button>
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
				<div className="overlay">
					{ /* <div className="overlay"></div> { /* Overlay */ }
					<div
						className={ `tour-dialog ${
							stepIndex === 0 ? 'tour-dialog-big' : ''
						}` }
						style={ {
							top: dialogPosition.top,
							left: dialogPosition.left,
						} }
					>
						<div className="tour-content">
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
