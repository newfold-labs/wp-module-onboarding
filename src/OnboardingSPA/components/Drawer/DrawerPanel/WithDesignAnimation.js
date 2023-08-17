import Animate from '../../Animate';

const WithDesignAnimation = ( { children } ) => {
	return (
		<Animate type={ 'fade-in' } duration="150ms" timingFunction="ease-in">
			{ children }
		</Animate>
	);
};

export default WithDesignAnimation;
