/**
 * SEARCH CAPABILITIES:
 * - name
 * - id
 *
 * SAMPLE QUERIES:
 * https://api.scryfall.com/cards/named?fuzzy=aust+com&color=black
 * https://api.scryfall.com/cards/search?order=cmc&q=c%3Ared+pow%3D3
 *
 *
 * SAMPLE SEARCHES:
 * "aust com" returns "Austere Command"
 * "kamahl pit" returns "Kamahl, Pit Fighter"
 * "kamahl" returns the 404 error 'Too many cards match ambiguous name "Kamahl". Add more words to refine your search.'
 * "testtesttest" returns the 404 error 'No cards found matching "testtesttest'
**/
/**
 * TODO:
 * - Get the page to display all searches
 *
 */



import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'


/*
Returns only a single object card:
https://api.scryfall.com/cards/named?fuzzy=
Returns multiple card objects:
https://api.scryfall.com/cards/search?fuzzy=
*/
const Search = ({}) => {
  const [cards, setCards] = useState([]);
  const params = useParams();
  useEffect(()=>{
    fetch('https://api.scryfall.com/cards/search?q='+ params.value.split(' ').join('+'))
    .then(res=>res.json())
    .then(cardData=>setCards(cardData.data))
  }, [])
  return (
  <>
    {(cards).map(card => {
      return (
        <>
          <img src={card.image_uris.small} alt={""}/>
        </>
      )
    })}
  </>);
};
export default Search;