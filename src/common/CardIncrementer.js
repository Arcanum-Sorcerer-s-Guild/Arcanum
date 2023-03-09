import React, { useEffect, useContext, useState } from "react";
import { mtgContext } from "../App";

const cssLargeButton = {
  width: "100px",
  height: "30px",
  padding: "auto",
  margin: "5px",
  "text-align": "center",
  "background-color": "#b93b0d",
  "border-radius": "5px",
};
const cssSmallButton = {
  "text-align": "center",
  width: "30px",
  height: "30px",
  padding: "auto",
  margin: "5px",
};
const currentItemText = {
  "text-align": "center",
  "font-size": "30px",
  "font-family": "fantasy",
};

const incrementContainer = {
  "text-align": "center",
  top: "50%",
};

const DeckDropDownCreator = ({ selectedDeck }) => {
  const { decks, setDecks } = React.useContext(mtgContext);

  return (
    <div style={incrementContainer}>
      <select style={cssLargeButton} onChange={selectedDeck}>
        {decks.map((deck, index) => {
          {
            return (
              <option key={index + deck.name} value={deck.name}>
                {deck.name}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

const CardIncrementer = (props) => {
  const { decks, setDecks } = React.useContext(mtgContext);
  const [currentAmmount, setCurrentAmmount] = useState(0);
  const [userUpdatedState, setuserUpdatedState] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(decks[0].name);

  let passedData = props.data;
  let passedId = passedData.id;
  let deckList = props.deckListDropdownOption; //true/false
  let deckSet = props.deckSet; //string

  useEffect(() => {
    if (!deckList) {
      deckSet ? setSelectedDeck(deckSet) : setSelectedDeck(decks[0].name);
    }
  }, [deckSet]);

  // checkcurrentvalue
  useEffect(() => {
    decks.map((deck) => {
      if (deck.name === selectedDeck && deck.deckItems.length !== 0) {
        deck.deckItems.map((card, index) => {
          if (card.id === passedId) {
            setCurrentAmmount(card.count);
          } else {
            setCurrentAmmount(0);
          }
        });
      }
    });
  }, [selectedDeck, decks]);

  useEffect(() => {
    if (userUpdatedState === false) {
      return;
    }

    let found = false;
    const newDecks = [...decks];

    newDecks.map((deck) => {
      if (deck.name === selectedDeck && deck.deckItems.length !== 0) {
        deck.deckItems.map((card, index) => {
          if (card.id === passedId) {
            found = true;
            if (currentAmmount !== 0) {
              card.count = currentAmmount;
            } else {
              deck["deckItems"].splice(index, 1);
            }
          }
        });
      }
    });

    if (found === false && currentAmmount !== 0) {
      newDecks.map((deck) => {
        if (deck.name === selectedDeck) {
          const newCard = {
            id: passedId,
            count: currentAmmount,
            cardObj: passedData,
          };
          deck.deckItems.push(newCard);
        }
      });
    }

    setDecks(newDecks);
  }, [currentAmmount]);

  const changeDeck = (e) => {
    setSelectedDeck(e.target.value);
  };

  return (
    <>
      <div style={incrementContainer}>
        <button
          style={cssSmallButton}
          onClick={() =>
            currentAmmount > 0
              ? (setCurrentAmmount(currentAmmount - 1),
                setuserUpdatedState(true))
              : null
          }
        >
          <i
            class="large ss ss-2x ss-ulg  "
            style={{ transform: "rotate(0deg)" }}
          ></i>
        </button>

        <i style={currentItemText}>{currentAmmount}</i>

        <button
          style={cssSmallButton}
          onClick={() => {
            setCurrentAmmount(currentAmmount + 1);
            setuserUpdatedState(true);
          }}
        >
          <i
            class="large ss ss-2x ss-ulg"
            style={{ transform: "scaleX(-1)" }}
          ></i>
        </button>
      </div>

      {deckList === true ? (
        <DeckDropDownCreator selectedDeck={changeDeck} />
      ) : null}
    </>
  );
};

export default CardIncrementer;
