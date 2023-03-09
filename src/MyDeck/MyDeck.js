import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyDeck.css";

const MyDeck = () => {
  const [decks, setDecks] = useState([]);
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/DeckArray")
      .then((res) => res.json())
      .then((data) => {
        setDecks(data);
      });
  }, []);

  const countArr = [];

  let artifactCards = 0;
  let creatureCards = 0;
  let enchantmentCards = 0;
  let instantCards = 0;
  let landCards = 0;
  let planeswalkerCards = 0;
  let sorceryCards = 0;

  for (let i = 0; i < decks.length; i++) {
    if (decks[i].cardObj.type_line === "Artifact") {
      artifactCards++;
    }

    if (decks[i].cardObj.type_line === "Creature") {
      creatureCards++;
    }
    if (decks[i].cardObj.type_line === "Enchantment") {
      enchantmentCards++;
    }
    if (decks[i].cardObj.type_line === "Instant") {
      instantCards++;
    }
    if (decks[i].cardObj.type_line === "Land") {
      landCards++;
    }
    if (decks[i].cardObj.type_line === "Planeswalker") {
      planeswalkerCards++;
    }
    if (decks[i].cardObj.type_line === "Sorcery") {
      sorceryCards++;
    }
  }

  countArr.push(
    artifactCards,
    creatureCards,
    enchantmentCards,
    instantCards,
    landCards,
    planeswalkerCards,
    sorceryCards
  );
  console.log(countArr);

  return (
    <div className="mt-10 mx-24">
      <h1 className="text-2xl font-bold p-3"> Decklist</h1>

      <div className="relative grid grid-rows-2 grid-cols-2 mt-1">
        <div className="deck-list text-sm">
          <div className="grid grid-cols-2">
            <div className="col-1 p-5">
              <div className="font-bold italic">
                Artifacts ({countArr[0] === 0 ? 0 : countArr[0]})
              </div>
              <ul className="list-inside">
                {decks.map((card) =>
                  card.cardObj.type_line === "Artifact" ? (
                    <li key={card.cardId}>
                      {card.count}{" "}
                      <a
                        href="#1"
                        target="test"
                        onMouseOver={(e) => setImage(e.currentTarget.target)}
                        onClick={() => navigate(`/DetailView/${card.cardId}`)}
                      >
                        {card.cardObj.name}
                      </a>
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
              <div className="font-bold italic mt-5">
                Creature ({countArr[1]})
              </div>
              <ul className="list-inside">
                {decks.map((card) =>
                  card.cardObj.type_line === "Creature" ? (
                    <li key={card.cardId}>
                      {card.count}{" "}
                      <a
                        href="#2"
                        target="test2"
                        onMouseOver={(e) => setImage(e.currentTarget.target)}
                        onClick={() => navigate(`/DetailView/${card.cardId}`)}
                      >
                        {card.cardObj.name}
                      </a>
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
              <div className="font-bold italic mt-5">
                Enchantment ({countArr[2]})
              </div>
              <ul className="list-inside">
                {decks.map((card) =>
                  card.cardObj.type_line === "Enchantment" ? (
                    <li key={card.cardId}>
                      {card.count}{" "}
                      <a
                        href="#3"
                        target="test3"
                        onMouseOver={(e) => setImage(e.currentTarget.target)}
                        onClick={() => navigate(`/DetailView/${card.cardId}`)}
                      >
                        {card.cardObj.name}
                      </a>
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
              <div className="font-bold italic mt-5">
                Instant ({countArr[3]})
              </div>
              <ul className="list-inside">
                {decks.map((card) =>
                  card.cardObj.type_line === "Instant" ? (
                    <li key={card.cardId}>
                      {card.count}{" "}
                      <a
                        href="#4"
                        target="test4"
                        onMouseOver={(e) => setImage(e.currentTarget.target)}
                        onClick={() => navigate(`/DetailView/${card.cardId}`)}
                      >
                        {card.cardObj.name}
                      </a>
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
            </div>
            <div className="col-1 p-5">
              <div className="font-bold italic">Land ({countArr[4]})</div>
              <ul className="list-inside">
                {decks.map((card) =>
                  card.cardObj.type_line === "Land" ? (
                    <li key={card.cardId}>
                      {card.count}{" "}
                      <a
                        href="#5"
                        target="test5"
                        onMouseOver={(e) => setImage(e.currentTarget.target)}
                        onClick={() => navigate(`/DetailView/${card.cardId}`)}
                      >
                        {card.cardObj.name}
                      </a>
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
              <div className="font-bold italic mt-5">
                Planeswalker ({countArr[5]})
              </div>
              <ul className="list-inside">
                {decks.map((card) =>
                  card.cardObj.type_line === "Planeswalker" ? (
                    <li key={card.cardId}>
                      {card.count}{" "}
                      <a
                        href="#6"
                        target="test6"
                        onMouseOver={(e) => setImage(e.currentTarget.target)}
                        onClick={() => navigate(`/DetailView/${card.cardId}`)}
                      >
                        {card.cardObj.name}
                      </a>
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
              <div className="font-bold italic mt-5">
                Sorcery ({countArr[6]})
              </div>
              <ul className="list-inside">
                {decks.map((card) =>
                  card.cardObj.type_line === "Sorcery" ? (
                    <li key={card.cardId}>
                      {card.count}{" "}
                      <a
                        href="#7"
                        target="test7"
                        onMouseOver={(e) => setImage(e.currentTarget.target)}
                        onClick={() => navigate(`/DetailView/${card.cardId}`)}
                      >
                        {card.cardObj.name}
                      </a>
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="deck-img">{image}</div>
      </div>
    </div>
  );
};

export default MyDeck;
