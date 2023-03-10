import React from "react";

const Decklist = ({ deck }) => {
  const { name, deckItems } = deck;

  return (
    <div className="grid grid-cols-1">
      <h2 className="text-md font-bold">{name}</h2>
      <ul className="list-inside">
        {deckItems.map((card) => (
          <li>{`${card.count} ${card.cardObj.name}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Decklist;
