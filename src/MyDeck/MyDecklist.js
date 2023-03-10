import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Deck.css";
import { mtgContext } from "../App";


const Decklist = ({ deck }) => {
  const { name, deckItems } = deck;
  const [imageFrontURI, setimageFrontURI] = useState(
    process.env.PUBLIC_URL + "/Magic_card_back.webp"
  );
  const [imageBackURI, setimageBackURI] = useState(
    process.env.PUBLIC_URL + "/Magic_card_back.webp"
  );

  const navigate = useNavigate();

  let cardsByType = {};
  let deckCount = 0;
  for (let item of deckItems) {
    deckCount++;
    let cardType = item.cardObj.type_line.split("—")[0].trim(); // Clean "Legendary Creature — Phryxian Drake" to "Legendary Creature"
    if (!Object.keys(cardsByType).includes(cardType)) {
      cardsByType[cardType] = {};
      cardsByType[cardType]["count"] = Number(item.count);
      cardsByType[cardType]["cards"] = [item];
    } else {
      cardsByType[cardType]["count"] += Number(item.count);
      cardsByType[cardType]["cards"].push(item);
    }
  }


  console.log(cardsByType);

  return (
    <div className="deck-wrapper mt-10 mx-24">
      <h1 className="deck-header text-2xl font-bold p-3">{name}</h1>
      <div className="grid grid-cols-10">
        <div className="deck-list col-span-6 justify-center">
            <div className="deck-list text-sm p-5"> 
              <div className="grid grid-cols-2"> 
                {Object.keys(cardsByType).map((type) => (
                  <div className="col-1 p-1">
                    <div className="font-bold italic">{type} ({cardsByType[type]["count"]})</div>
                    <ul className="list-inside">
                      {cardsByType[type].cards.map((card, index) => (
                        <li key={index}>
                          <span
                            onMouseOver={() => {
                              console.log("mouseover card.cardObj:", card.cardObj);
                              if (Object.keys(card.cardObj).includes("image_uris")) {
                                setimageFrontURI(card.cardObj.image_uris.normal);
                                setimageBackURI(
                                  process.env.PUBLIC_URL + "/Magic_card_back.webp"
                                );
                              } else {
                                setimageFrontURI(
                                  card.cardObj.card_faces[0].image_uris.normal
                                );
                                setimageBackURI(
                                  card.cardObj.card_faces[1].image_uris.normal
                                );
                              }
                            }}
                            onClick={() => navigate(`/DetailView/${card.cardObj.id}`)}
                          >
                            {card.count} {card.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))} 
              </div>
            </div>
        </div>
        <div className="deck-img col-span-4 relative flex justify-center gap-2">
          <div className="front-img rounded-2xl transform hover:scale-150 transition-all mt-5">
            <img src={imageFrontURI} />
          </div>
          <div className="back-img shrink rounded-2xl transform hover:scale-150 transition-all mt-5">
            <img src={imageBackURI} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decklist;

//     <div className="mt-10 mx-24">
//       <h1 className="deck-header text-2xl font-bold p-3">{name}</h1>

//       <div className="Gray relative grid grid-cols-10 mt-1">

//         <div className="grid cols-span-6">
          // <div className="relative grid grid-cols-2 mt-1">
          // <div className="deck-list text-sm p-5">
          //   <div className="grid grid-cols-2">
// {Object.keys(cardsByType).map((type) => (
//   <div className="col-1 p-1">
//     <div className="font-bold italic">{type} ({cardsByType[type]['count']})</div>
//     <ul className="list-inside">
//       {cardsByType[type].cards.map((card, index) => (
//         <li key={index}>
//           <span
//             onMouseOver={
//               () => {
//                 console.log('mouseover card.cardObj:', card.cardObj)
//                 if(Object.keys(card.cardObj).includes('image_uris')) {
//                   setimageFrontURI(card.cardObj.image_uris.normal)
//                   setimageBackURI(process.env.PUBLIC_URL + '/Magic_card_back.webp')
//                 } else {
//                   setimageFrontURI(card.cardObj.card_faces[0].image_uris.normal)
//                   setimageBackURI(card.cardObj.card_faces[1].image_uris.normal)
//                 }
//               }
//             }
//             onClick={() => navigate(`/DetailView/${card.cardObj.id}`)}
//           >
//             {card.count} {card.name}
//           </span>
//         </li>
//       ))}
//     </ul>
//   </div>
// ))}
//   </div>
// </div>
//        </div>

//         <div className="deck-img relative flex justify-center">
//           <div className="front-img rounded-2xl transform hover:scale-150 transition-all mt-5">
//             <img src={imageFrontURI}/>
//           </div>
//           <div className="back-img shrink rounded-2xl transform hover:scale-150 transition-all mt-5">
//           <img src={imageBackURI}/>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Decklist;

// for each type: <h1>type, type.count</h1>
// for each type: for each card in type.cards: <p>card1.count card1.cardObj.name</p>
// return (
//   <div>
//     <h2>{name}</h2>

//       {Object.keys(cardsByType).map(type => {
//         return (
//           <ul>
//             <h1>{type}</h1>
//             {cardsByType[type].map(card => <li>{`${card.count} ${card.cardObj.name}`}</li>)} {/* It's not treating cardsByType[type] as an array for some reason. */}
//           </ul>
//         )
//       })}

//       {deckItems.map((card) => (<p>{`${card.count} ${card.cardObj.name}`}</p>))}

//       {/* {deckItems.map((card) => (<p>{`${card.count} ${card.cardObj.name}`}</p>))} */}
//   </div>
// );

// let cardsByType = {}
//   for (let item of deckItems) {
//     let type = item.cardObj.type_line.split("—")[0].trim(); // Clean "Legendary Creature — Phryxian Drake" to "Legendary Creature"
//     if (! Object.keys(cardsByType).includes(type)) {
//       cardsByType[type] = Number(item.count);
//     } else {
//       cardsByType[type] += Number(item.count);
//     }
//   }
//   console.log('cardsByType:', cardsByType);
