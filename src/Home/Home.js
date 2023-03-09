import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

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

  useEffect(()=> {
    document.title = 'Arcanum: Home'
  },[])

  if (currCard === false) {
    return <>test</>;
  }

  return (
    <div className="wrapper mt-10">
      <div className="hero-section w-full flex justify-center items-center shadow-lg">
        <div className="flex flex-col justify-center items-center shadow-lg">
        <div className="animate-pulse"><div className="pulse opacity-100 blur-2xl transition-all"></div></div>
          {Object.keys(currCard).length !== 0 ? (
            <div>
              <img
                className="random-card rounded-2xl transform hover:scale-150 transition-all"
                src={currCard.image_uris.normal}
                alt={currCard.id}
                onClick={() => navigate(`/DetailView/${currCard.id}`)}
              />
            </div>
          ) : (
            <div className="loading-text text-center text-5xl text-white font-bold drop-shadow-lg">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

// original code
// {/* <div className="relative flex w-full flex-wrap items-center justify-center mt-10"> */}
// {Object.keys(currCard).length !== 0 ?
// <div>
// {/*    {JSON.stringify(currCard.border_crop)}
//    {console.log(JSON.stringify(currCard.border_crop))} */}
//   <img className="random-card" src={currCard.image_uris.normal} alt={currCard.id} onClick={()=>navigate(`/DetailView/${currCard.id}`)} />
//   {/* {currCard.image_uris.large ? (
//     <img src={currCard.image_uris.large} />
//   ) : (
//     <h1>Loading...</h1>
//   )} */}
// </div>
// :
// <div>Loading...</div>}
// </div>
// );

export default Home;
