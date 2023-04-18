/* eslint no-console: ["error", { allow: ["error"] }] */
// This Executer is responsible to execute API requests in a sequence
const apiQueueExecutor = async ( requests ) => {
	const items = requests;

	const dequeue = async () => {
		// Queue Empty
		if ( ! items[ 0 ] ) return;

		await items[ 0 ][ 1 ]()
			.then( () => items.shift() )
			.then( dequeue );
	};

	dequeue();
	return items;
};

export default apiQueueExecutor;
