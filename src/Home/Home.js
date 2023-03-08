import React, { useEffect, useState } from "react";

const Home = () => {
  const [currCard, setCurrCard] = useState([]);

  useEffect(() => {
    fetch(`https://api.scryfall.com/cards/random`)
      .then((res) => res.json())
      .then((data) => {
        setCurrCard(data.image_uris);
      });
  }, []);

  if (currCard === false) {
    return <>test</>;
  }

  return (
    <div>
    {/*    {JSON.stringify(currCard.border_crop)}
       {console.log(JSON.stringify(currCard.border_crop))} */}
      <img src={currCard.normal} />
      {/* {currCard.image_uris.large ? (
        <img src={currCard.image_uris.large} />
      ) : (
        <h1>Loading...</h1>
      )} */}
    </div>
  );
};

export default Home;
