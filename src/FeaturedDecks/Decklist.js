import React from "react";

const Decklist = ({ deck }) => {
  const { deckName, deckList } = deck;

  return (
    <div>
      <h2>{deckName}</h2>
        {deckList.map((card) => (<p>{`${card.count} ${card.cardObj.name}`}</p>))}
    </div>
  );
};

export default Decklist;
