/* eslint no-console: ["error", { allow: ["error"] }] */
// This Executer is responsible to execute API requests in a sequence
const apiQueueExecutor = ( requests ) => {
	const items = requests;

	const dequeue = () => {
		// Queue Empty
		if ( ! items[ 0 ] ) return;

		items[ 0 ]()
			.catch( ( e ) => {
				console.error( 'Error:', e );
			} )
			.then( () => items.shift() )
			.then( dequeue );
	};

	dequeue();
	return items;
};

export default apiQueueExecutor;
