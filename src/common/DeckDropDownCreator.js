import React, {useContext} from "react";
import { mtgContext } from "../App";

const cssLargeButton = {
    width: "100px",
    height: "30px",
    padding: "auto",
    margin: "5px",
    textAlign: "center",
    "backgroundColor": "#b93b0d",
    "borderRadius": "5px",
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