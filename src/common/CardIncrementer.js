import React, { useEffect, useContext, useState } from "react";
import { mtgContext } from "../App";
import DeckDropDownCreator from "./DeckDropDownCreator.js";
const cssLargeButton = {
  width: "100px",
  height: "30px",
  padding: "auto",
  margin: "5px",
  textAlign: "center",
  backgroundColor: "#b93b0d",
  borderRadius: "5px",
};
const cssSmallButton = {
  textAlign: "center",
  width: "30px",
  height: "30px",
  padding: "auto",
  margin: "5px",
};
const currentItemText = {
  textAlign: "center",
  fontSize: "30px",
  fontFamily: "fantasy",
};

const incrementContainer = {
  textAlign: "center",
  top: "50%",
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
  }, [deckList, decks, deckSet, selectedDeck]);

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
  }, [selectedDeck, decks, passedData]);

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
        <ion-icon name="remove-outline"></ion-icon>
          {/* <i
            className="large ss ss-2x ss-ulg  "
            style={{ transform: "rotate(0deg)" }}
          ></i> */}
        </button>

        <i style={currentItemText}>{currentAmmount}</i>

        <button
          style={cssSmallButton}
          onClick={() => {
            setCurrentAmmount(currentAmmount + 1);
            setuserUpdatedState(true);
          }}
        >
        <ion-icon name="add-outline"></ion-icon>
          {/* <i
            className="large ss ss-2x ss-ulg"
            style={{ transform: "scaleX(-1)" }}
          ></i> */}
        </button>
      </div>

      {deckList === true ? (
        <DeckDropDownCreator selectedDeck={changeDeck} />
      ) : null}
    </>
  );
};

export default CardIncrementer;
