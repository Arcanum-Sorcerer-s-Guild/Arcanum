import React, {useEffect} from "react";
import Decklist from "./Decklist";


const FeaturedDecks = () => {
  
  useEffect(()=> {
    document.title = 'Arcanum: Featured Decks'
  },[])

  return (
    <>
      These are some Featured Decks
      <Decklist />
    </>
  );
};

export default FeaturedDecks;