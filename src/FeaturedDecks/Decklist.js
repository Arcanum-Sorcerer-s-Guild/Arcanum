import React from "react";

const Decklist = ({ deck }) => {
  const { name, deckItems } = deck;

  return (
    <div>
      <h2>{name}</h2>
        {deckItems.map((card) => (<p>{`${card.count} ${card.cardObj.name}`}</p>))}
    </div>
  );
};

export default Decklist;
