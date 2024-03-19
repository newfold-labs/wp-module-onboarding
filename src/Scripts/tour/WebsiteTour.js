import './WebsiteTour.css'; // Import the CSS file for styling
import { useState } from '@wordpress/element';

const WebsiteTour = ( { steps } ) => {
	const [ stepIndex, setStepIndex ] = useState( 0 );

	const handleNextStep = () => {
		setStepIndex( ( prevIndex ) => prevIndex + 1 );
	};

	const handlePrevStep = () => {
		setStepIndex( ( prevIndex ) => prevIndex - 1 );
	};

	const handleSkipTour = () => {
		// Logic for skipping the tour
		setStepIndex( steps.length - 1 );
	};

	const currentStep = steps[ stepIndex ];
	console.log( currentStep );
	let dialogPosition = {
		top: '50%',
		left: '50%',
	};
	if ( currentStep.stepTargetClassName !== null ) {
		console.log( 'am called' );
		// Calculate the position of the tour dialog
		const targetStepElement = document.querySelector(
			`.${ currentStep.stepTargetClassName }`
		);

		if ( targetStepElement ) {
			const { top, left, width, height, x } =
				targetStepElement.getBoundingClientRect();
			console.log( targetStepElement.getBoundingClientRect() );
			dialogPosition = {
				top: top + height + 150, // Adjust the top position to leave some space below the step
				left: left + 210, // Adjust the left position to leave some space to the right of the step
			};
			if ( x > 500 ) {
				dialogPosition = {
					...dialogPosition,
					left: left - width - 50,
				};
			}
			console.log( dialogPosition );
		}
	}

	function StepImg( imageName ) {
		const imageUrl = `/src/Scripts/tour/images/${ imageName }.png`; // Construct the image URL dynamically

		return (
			<div
				// className="stepImg"
				style={ { backgroundImage: `url(${ imageUrl })` } }
			></div>
		);
	}

	function renderStepProgress() {
		return steps.map( ( step, index ) => (
			<div
				key={ index }
				className={ index == stepIndex ? 'iconSelected' : 'icon' }
			></div>
		) );
	}

	return (
		<div className="overlay">
			{ /* <div className="overlay"></div> { /* Overlay */ }
			<div
				className="tour-dialog"
				style={ {
					top: dialogPosition.top,
					left: dialogPosition.left,
				} }
			>
				<div className="tour-content">
					<div>{ StepImg( 'wp' ) }</div>
					<div className="tourSteptitle">{ currentStep.title }</div>
					<p className="tourStepContent">{ currentStep.content }</p>
					<div className={ 'box_info' }>
						<div className={ 'box_info' }>
							{ renderStepProgress() }
						</div>
						<div>
							{ /* { stepIndex > 0 && (
								<button onClick={ handlePrevStep }>
									Previous
								</button>
							) } */ }
							{ stepIndex == 0 && (
								<button onClick={ handleNextStep }>
									Start Tour >
								</button>
							) }
							{ stepIndex > 0 && stepIndex < steps.length - 1 && (
								<button onClick={ handleNextStep }>
									Next >
								</button>
							) }
							{ stepIndex === steps.length - 1 && (
								<button onClick={ handleSkipTour }>Done</button>
							) }
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WebsiteTour;
