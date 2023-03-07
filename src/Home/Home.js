import React, {useEffect,useState} from "react";

const Home = () => {
  const [currCard,setCurrCard] = useState([])

  useEffect(()=> {
    fetch(`https://api.scryfall.com/cards/random`)
    .then(res => res.json())
    .then(data => {
      setCurrCard(data)
    })

  },[])

  return(
  <div>
   {currCard.image_uris.large ? <img src={currCard.image_uris.large}/> : <h1>Loading...</h1>}
  </div>
  )
};

export default Home;
