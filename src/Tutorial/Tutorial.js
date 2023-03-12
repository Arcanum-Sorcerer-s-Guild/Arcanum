import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import "./Tutorial.css";
import DeckDropDownCreator from "../common/DeckDropDownCreator";
import { mtgContext } from "../App.js";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Tutorial = () => {
  const { decks, setDecks } = React.useContext(mtgContext);
  const [selectedDeck, setSelectedDeck] = useState(decks[0].name);
  const [lifePoints, setLifePointsk] = useState(20);
  const [deckInPlay, setDeckInPlay] = useState([]);
  const [deckInPlayLength, setDeckInPlayLength] = useState([]);
  const [handInPlay, setHandInPlay] = useState([]);
  const [tutorialStarted, setTutorialStarted] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState("Untap");

  const steps = [
    "Untap",
    "Upkeep",
    "Draw",
    "Main",
    "Phase 1",
    "CombatMain",
    "Phase 2",
    "End Step",
  ];

  const changeDeck = (e) => {
    setSelectedDeck(e.target.value);
    setLifePointsk(20);
  };

  useEffect(() => {
    let errorFlag = true;
    setDeckInPlay([]);
    setDeckInPlayLength(0);
    setHandInPlay([]);
    setTutorialStarted(false);

    let newDeck = [];
    decks.map((deck) => {
      if (deck.name === selectedDeck && deck.deckItems.length !== 0) {
        errorFlag = false;
        deck.deckItems.map((card, index) => {
          //   const newDecks = [...deckInPlay];
          for (let index = 0; index < card.count; index++) {
            newDeck.push(card.cardObj);
          }
        });
      }
    });

    if (errorFlag === true) {
      setError(
        "This is not a valid deck... Try changing it up and ensure it has at least 60 cards..."
      );
      setIsOpen(true);
    } else {
      setDeckInPlay(newDeck);
      console.log(deckInPlay.length);
      if (deckInPlay.length > 61) {
        setError("toohighs...");
        setIsOpen(true);
      }
    }
  }, [selectedDeck]);

  useEffect(() => {
    setDeckInPlayLength(deckInPlay.length);
  }, [deckInPlay]);

  useEffect(() => {
    const newDeckInPlay = [...deckInPlay];
    for (let i = newDeckInPlay.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeckInPlay[i], newDeckInPlay[j]] = [
        newDeckInPlay[j],
        newDeckInPlay[i],
      ];
    }
    setDeckInPlay(newDeckInPlay);
  }, [deckInPlayLength]);

  function closeModal() {
    setIsOpen(false);
  }

  const turnImage = (e) => {
    e.target.className === "deckCard"
      ? (e.target.className = "deckCardTurned")
      : (e.target.className = "deckCard");
  };

  const drawHand = () => {
    if (deckInPlayLength === 0) {
      return;
    }
    if (!tutorialStarted) {
      const newHandInPlay = [...handInPlay];
      const newDeckInPlay = [...deckInPlay];
      for (let index = 0; index < 7; index++) {
        newHandInPlay.push(deckInPlay[index]);
        newDeckInPlay.splice(index, 1);
      }

      setTutorialStarted(true);
      setHandInPlay(newHandInPlay);
      setDeckInPlay(newDeckInPlay);
    } else {
      const newHandInPlay = [...handInPlay];
      const newDeckInPlay = [...deckInPlay];
      for (let index = 0; index < 1; index++) {
        newHandInPlay.push(deckInPlay[index]);
        newDeckInPlay.splice(index, 1);
      }

      setTutorialStarted(true);
      setHandInPlay(newHandInPlay);
      setDeckInPlay(newDeckInPlay);
    }

    console.log(handInPlay, deckInPlay);
  };

  useEffect(() => {
    document.title = "Tutorial";
  }, []);

  return (
    <>
      <div className="playerField wrapper  relative flex w-full h-full flex-wrap">
        <div className="info">
          {steps.map((stepItem) => (
            <a>{stepItem}</a>
          ))}

          <a className="deckName">
            <DeckDropDownCreator selectedDeck={changeDeck} />
          </a>
          <a className="life">#of Cards Left: {deckInPlayLength} </a>
          <a className="life">Life Points: {lifePoints} </a>
        </div>

        <div className="battleField">
          <img
            onClick={turnImage}
            className="deckCard"
            src="/blankMonsterCard.svg"
          ></img>
          <img
            onClick={turnImage}
            className="deckCard"
            src="/blankMonsterCard.svg"
          ></img>
          <img
            onClick={turnImage}
            className="deckCard"
            src="/blankMonsterCard.svg"
          ></img>
          <img
            onClick={turnImage}
            className="deckCard"
            src="/blankMonsterCard.svg"
          ></img>
          <img
            onClick={turnImage}
            className="deckCard"
            src="/blankMonsterCard.svg"
          ></img>
          <img
            onClick={turnImage}
            className="deckCard"
            src="/blankMonsterCard.svg"
          ></img>
        </div>
        
        <div className="lands">
          <img
            onClick={turnImage}
            className="deckCard"
            src="/blankLandCard.svg"
          ></img>
          <img
            onClick={turnImage}
            className="deckCard"
            src="/blankLandCard.svg"
          ></img>
          <img
            onClick={turnImage}
            className="deckCard"
            src="/blankLandCard.svg"
          ></img>
          <img
            onClick={turnImage}
            className="deckCard"
            src="/blankLandCard.svg"
          ></img>
          <img
            onClick={turnImage}
            className="deckCard"
            src="/blankLandCard.svg"
          ></img>
          <img
            onClick={turnImage}
            className="deckCard"
            src="/blankLandCard.svg"
          ></img>
        </div>

        <div className="commandZone">commandZone</div>

        <div className="exile">exile</div>

        <div className="library">
          <img
            onClick={drawHand}
            className="deckCard"
            src="/blankDeck.svg"
          ></img>
        </div>
        <div className="gaveyard">
          <img className="deckCard" src="/blankGraveyard.svg"></img>
        </div>
        <div className="deckHand">

    


          {handInPlay.map((card, index) => {
           return Object.keys(card).includes('image_uris') ?
            <img key={index} className='deckCardHand' src={card.image_uris.normal}/> :
             <img key={index} className='deckCardHand' src={card.card_faces[0].image_uris.normal}/>
          })}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="modalPopUp">
          <h2>📎It looks like you have an invalid deck... Need Some Help?</h2>
          <div>{error}</div>
          <button onClick={closeModal}>Click Here to close</button>
        </div>
      </Modal>
    </>
  );
};
export default Tutorial;
