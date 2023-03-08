import React, { useEffect, useContext, useState } from "react";
import { mtgContext } from "../App";

const CardIncrementer = (props) => {
  const { deck, setDeck } = React.useContext(mtgContext);
  const [currentAmmount, setCurrentAmmount] = useState(0);
  const [userState, setUserState] = useState(false);

  let passedData = props.data;
  let passedId = passedData.id;

  useEffect(() => {
    if (userState === false) {
      return;
    }

    let found = false;
    const newDeck = { ...deck };

    newDeck["deckItems"].map((card, index) => {
      if (card.id === passedId) {
        found = true;
        if (currentAmmount > 0) {
          card.count = currentAmmount;
        } else {
          delete newDeck["deckItems"][index];
        }
      }
    });

    if (found === false) {
      const newCard = {
        id: passedId,
        count: currentAmmount,
        cardObj: passedData,
      };
      newDeck.deckItems.push(newCard);
    }

    setDeck(newDeck);
    console.log(deck);

  }, [currentAmmount]);

  const cssLargeButton = {
    width: "100px",
    height: "30px",
    padding: "auto",
    margin: "5px",
  };
  const cssSmallButton = {
    width: "30px",
    height: "30px",
    padding: "auto",
    margin: "5px",
  };

  return (
    <>
      {JSON.stringify(deck)}
      <button
        style={cssLargeButton}
        onClick={() => {
          setCurrentAmmount(currentAmmount + 1);
          setUserState(true);
        }}
      >
        Add to Deck
      </button>
      <button
        style={cssSmallButton}
        onClick={() =>
          currentAmmount > 0
            ? (setCurrentAmmount(currentAmmount - 1), setUserState(true))
            : null
        }
      >
        ◀️
      </button>
      {currentAmmount}
      <button
        style={cssSmallButton}
        onClick={() => {
          setCurrentAmmount(currentAmmount + 1);
          setUserState(true);
        }}
      >
        ▶️
      </button>
    </>
  );
};

export default CardIncrementer;
