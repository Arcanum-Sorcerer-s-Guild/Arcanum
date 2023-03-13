import React from "react";
import { mtgContext } from "../App";

const cssLargeButton = {
    width: "100%",
    height: "75%",
    padding: "auto",
    textAlign: "center",
    backgroundColor: "#b93b0d",
    borderRadius: "5px",
  };


  
  const incrementContainer = {
    textAlign: "center",

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
  }
  export default DeckDropDownCreator