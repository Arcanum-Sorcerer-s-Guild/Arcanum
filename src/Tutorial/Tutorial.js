import React, { useContext, useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import "./Tutorial.css";
import DeckDropDownCreator from "../common/DeckDropDownCreator";
import { mtgContext } from "../App.js";
import { Tabs } from "flowbite-react";
import Draggable from "react-draggable";

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

function DraggableImage({ src, index }) {
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  return (
    <Draggable
      onStop={(event, { x, y }) => {
        // Update the position of the image after it has been dragged
        const fixedPosition = { x: 100, y: 100 }; // This is the fixed position of the drop target
        const snappedPosition = { x: 50, y: 50 }; // This is the snapped position inside the drop target
        const positionWithinFixedPosition = {
          x: x - fixedPosition.x,
          y: y - fixedPosition.y,
        };
        const snappedX =
          Math.round(positionWithinFixedPosition.x / snappedPosition.x) *
          snappedPosition.x;
        const snappedY =
          Math.round(positionWithinFixedPosition.y / snappedPosition.y) *
          snappedPosition.y;
        const snappedPositionWithinFixedPosition = {
          x: snappedX,
          y: snappedY,
        };
        const finalPosition = {
          x: snappedPositionWithinFixedPosition.x + fixedPosition.x,
          y: snappedPositionWithinFixedPosition.y + fixedPosition.y,
        };
        setImagePosition(finalPosition);
      }}
      position={imagePosition}
    >
      <img
        key={index}
        className="deckCardHand"
        src={src}
        alt="Draggable Image"
      />
    </Draggable>
  );
}

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
  const [activeStep, setActiveStep] = useState(0);
  const [activeStepDetails, setActiveStepDetails] = useState(<></>);
  const tabsRef = useRef(null);

  const steps = [
    {
      id: "untap",
      name: "Untap",
      details: `All permanents with phasing controlled by the active player phase out, and all phased-out permanents that were controlled by the active player simultaneously phase in. Note the timing which means tapped permanents phasing in will almost immediately get to untap.
    If the day and night cycle has started, the number of spells cast in the previous turn is checked, and if the appropriate conditions are met, day turns to night or night turns to day, including the transformation of Daybound and Nightbound permanents.
    The active player determines which permanents controlled by that player untap, then untaps all those permanents simultaneously. (The player will untap all permanents they control unless a card effect prevents this.)`,
    },
    {
      id: "upkeep",
      name: "Upkeep",
      details: `The upkeep step is the second step of the beginning phase. At the beginning of the upkeep step, any abilities that trigger either during the untap step or at the beginning of upkeep go on the stack. Then the active player gains priority the first time during their turn.`,
    },
    {
      id: "draw",
      name: "Draw",
      details: `The draw step is the third step of the beginning phase. The following events occur during this phase, in order:
    The active player draws a card from their library.
    Any abilities that trigger at the beginning of the draw step go on the stack.
    The active player gains priority.`,
    },
    { id: "main", name: "Main", details: "Main" },
    { id: "phase1", name: "Phase 1", details: "Phase 1" },
    { id: "combatPhase", name: "CombatMain", details: "CombatMain" },
    { id: "phase2", name: "Phase 2", details: "Phase 2" },
    { id: "endStep", name: "End Step", details: "EndStep" },
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
      if (deckInPlay.length > 61) {
        setError("toohighs...");
        setIsOpen(true);
      }
    }
  }, [selectedDeck]);

  useEffect(() => {
    setDeckInPlayLength(deckInPlay.length);
  }, [deckInPlay]);

  // useEffect(() => {

  //   let newdetails = activeStep === 0 ? (<>{steps[0].details}</>) ?
  //   activeStep === 1 ? (<>{steps[1].details}</>) :
  //   activeStep === 2 ? (<>{steps[2].details}</>) :
  //   activeStep === 3 ? (<>{steps[3].details}</>) :
  //   activeStep === 4 ? (<>{steps[4].details}</>) 
  //   setActiveStepDetails(newdetails)
  // }, [activeStep]);

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
        newHandInPlay.unshift(deckInPlay[index]);
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
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <Tabs.Group
          className="w-3/4"
          aria-label="Default tabs"
          ref={tabsRef}
          onActiveStepChange={(tab) => setActiveStep(tab)}
        >
          {steps.map((stepItem, index) => (
            <Tabs.Item active title={stepItem.name}>
              {stepItem.details}
            </Tabs.Item>
          ))}
        </Tabs.Group>
        <div className="flex float-right h-16">
          Cards Left: {deckInPlayLength} || Life: {lifePoints}
          <DeckDropDownCreator selectedDeck={changeDeck} />
        </div>
      </div>

      <div className="playerField">
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
            return Object.keys(card).includes("image_uris") ? (
              <DraggableImage index={index} src={card.image_uris.normal} />
            ) : (
              <DraggableImage
                index={index}
                src={card.card_faces[0].image_uris.normal}
              />
            );
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
