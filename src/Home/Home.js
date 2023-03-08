import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const [currCard, setCurrCard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.scryfall.com/cards/random`)
      .then((res) => res.json())
      .then((data) => {
        setCurrCard(data);
      });
  }, []);

  if (currCard === false) {
    return <>test</>;
  }

  return (
    <>
    {Object.keys(currCard).length !== 0 ?
    <div>
    {/*    {JSON.stringify(currCard.border_crop)}
       {console.log(JSON.stringify(currCard.border_crop))} */}
      <img src={currCard.image_uris.normal} onClick={()=>navigate(`/DetailView/${currCard.id}`)} />
      {/* {currCard.image_uris.large ? (
        <img src={currCard.image_uris.large} />
      ) : (
        <h1>Loading...</h1>
      )} */}
    </div>
    :
    <div>Loading...</div>}
    </>
  );
};

export default Home;
