import { useState } from 'react';
import { Button, Card, Drawer, Link, TextareaField } from '@newfold/ui-component-library';
import { ChatBubbleBottomCenterTextIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const examples = [
	"I need a website for my family-owned Italian restaurant in downtown Portland. The goal is to increase online reservations and showcase our authentic recipes passed down through generations. The design should feel warm and rustic, using rich colors that remind people of Tuscany, with high-quality food photography. We need a homepage with our story, a menu page with seasonal specials, an online reservation system, a contact page with our location and hours, and a blog section where we can share recipes and upcoming events.",

	"Looking to create a website for my personal training business. My target audience is busy professionals aged 25-45 who want personalized workout plans. The main goals are to attract new clients and provide an online platform for booking sessions and accessing workout plans. The design should be energetic and modern, using bold colors and fitness imagery. I need a homepage highlighting my training philosophy, a services page with pricing packages, an online booking system, a client testimonials section, and a member portal where clients can access their custom workout plans.",

	"I'm a wedding photographer targeting modern couples in their late 20s to early 30s. The website should help me book more clients and showcase my portfolio. The design needs to be elegant and minimal, letting the photography speak for itself - think lots of white space and clean typography. Essential pages include a stunning portfolio gallery, a detailed services/pricing page, a blog for featuring recent weddings, an about page telling my story, and a contact form with a quick questionnaire for potential clients.",

	"We're launching a SaaS platform that helps small businesses manage their social media. Our target users are small business owners and marketing managers. The website should convey trust and innovation while explaining our product simply. Design-wise, we want a modern tech look with subtle animations and a clean interface. We need a homepage with a clear value proposition, a features page demonstrating our product, pricing plans, an integration partners page, a resources section with guides and tutorials, and a blog focusing on social media tips.",

	"We're a non-profit organization focused on environmental conservation in California. Our website needs to attract donors and volunteers while educating visitors about our mission. The design should incorporate natural colors and imagery, feeling professional yet approachable. Required pages include a compelling homepage with current initiatives, an about page explaining our impact, a donations page with multiple giving options, a volunteer opportunities section, an events calendar, and a news/blog section for sharing success stories and environmental news.",
];

const PromptExamples = ( { onSetExample } ) => {
	return (
		<div className="nfd-flex nfd-flex-col nfd-gap-8 nfd-min-w-80 nfd-max-w-96">
			{ examples.map( ( example, index ) => (
				<Card key={ index }>
					<Card.Content>
						<span>
							{ example }
						</span>
					</Card.Content>
					<Card.Footer>
						<Link
							as="button"
							className="nfd-font-medium nfd-no-underline nfd-text-primary nfd-flex nfd-items-center"
							onClick={ () => onSetExample( example ) }
						>
							{ __( 'Use this example' ) }
							<ChatBubbleBottomCenterTextIcon className="nfd-ml-1 nfd-w-4" />
						</Link>
					</Card.Footer>
				</Card>
			) ) }
		</div>
	);
};

const PromptInput = () => {
	const [ value, setValue ] = useState( '' );
	const [ examplesDrawerIsOpen, setExamplesDrawerIsOpen ] = useState( false );

	const handleSetExample = ( example ) => {
		const alertMessage = __( 'This action will override your current content. Continue?' );
		// eslint-disable-next-line no-alert
		if ( value.trim() !== '' && ! window.confirm( alertMessage ) ) {
			return;
		}
		setValue( example );
		setExamplesDrawerIsOpen( false );
	};

	return (
		<div>
			<TextareaField
				label={ __( 'Describe your dream website' ) }
				id="nfd-onboarding-prompt"
				placeholder={ __( 'Tell us about your ideal website - who it\'s for, what you want to achieve, how it should look, and what pages or features you need.' ) }
				className="[&_.nfd-textarea]:nfd-h-40"
				value={ value }
				onChange={ ( e ) => setValue( e.target.value ) }
			/>
			<div className="nfd-flex nfd-justify-end">
				<Button
					variant="secondary"
					className="nfd-w-fit nfd-mt-4"
					onClick={ () => setExamplesDrawerIsOpen( true ) }
				>
					{ __( 'Examples' ) }
					<QuestionMarkCircleIcon className="nfd-ml-1 nfd-w-4" />
				</Button>
			</div>

			<Drawer
				isOpen={ examplesDrawerIsOpen }
				onClose={ () => setExamplesDrawerIsOpen( false ) }
				variant="offset"
			>
				<Drawer.Panel>
					<Drawer.Header
						title={ __( 'Examples' ) }
					/>
					<PromptExamples onSetExample={ handleSetExample } />
				</Drawer.Panel>
			</Drawer>
		</div>
	);
};

export default PromptInput;
