/**
 * Generic HTML rendering component
 * Pass any HTML which we want as is to display on the UI
 * Uses dangeroulsySetInnerHTML of React
 * @param content
 * @returns GenericHtml
 */
const GenericHtml = ({content}) => {
	return (
    <section class="nfd-card-generic-text">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
	);
};

export default GenericHtml;