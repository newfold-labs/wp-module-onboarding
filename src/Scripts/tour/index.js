import WebsiteTour from '../tour/WebsiteTour';
import getContents from '../tour/content';

function Tour() {
	const content = getContents();
	return ( 
		<div className="App">
			<WebsiteTour steps={ content.steps } />
		</div>
	);
}

export default Tour;
