import Card from '../SelectableCard';

const SelectableCardList = ({ contents, selected, onSelectedChange }) => {
	const cardList = contents.map((content, idx) => {
		return (
			<Card
				id={idx}
				key={idx}
				path={content.icon}
				title={content.title}
				desc={content.desc}
				onSelectedChange={onSelectedChange}
				isSelected={idx === selected ? true : false}
			/>
		);
	});

	return <div className="selectable_cards">{cardList}</div>;
};

export default SelectableCardList;
