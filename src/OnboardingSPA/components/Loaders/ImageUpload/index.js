import Animate from '../../../../Shared/Animate';

const ImageUploadLoader = () => {
	return (
		<div className="image-upload-loader--loading-box">
			<Animate
				type={ 'load' }
				className="image-upload-loader--loading-box__loader"
			></Animate>
		</div>
	);
};

export default ImageUploadLoader;
