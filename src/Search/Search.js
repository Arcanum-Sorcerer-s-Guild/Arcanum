import React, {useEffect, useState, useNavigate} from "react";
import {useParams, Link} from 'react-router-dom'
import "./Search.css";
import CardIncrementer from "../common/CardIncrementer.js";
import DetailView from "../DetailView/DetailView.js";
import './Search.css'

const Search = ({}) => {
  const [cards, setCards] = useState([]);
  const params = useParams();

  useEffect(()=>{
    fetch('https://api.scryfall.com/cards/search?q='+ params.value.split(' ').join('+'))
    .then(res=>res.json())
    .then(cardData=>setCards(cardData.data))
    .catch(error=>console.log("Your search didn’t match any cards. Please try again by adjusting your terms."))
  }, [params.value])

  return (
    <div>
      {(cards === undefined) ?
        <div>
          <h1> No Cards Found </h1>
          <h4> Your search didn’t match any cards. Please try again by adjusting your terms.</h4>
        </div>:
        cards.map(card => {
          return (
            <div key={card.id}>
              {console.log(card)}
              {card.image_uris === undefined ?
                <div>
                  <div class="card-image">
                    <div class="card-image-front">
                      <img src={card.card_faces[0].image_uris.small} alt={""}/>
                    </div>
                    <div class="card-image-back">
                      <img src={card.card_faces[1].image_uris.small} alt={""}/>
                    </div>
                  </div>
                  <button className="search-btn hover:bg-gray-700 transition-color duration-700">Transforming</button>
                </div>:
                <Link to={`/DetailView/${card.id}`}>
                  <img src={card.image_uris.small} alt={""}/>
                </Link>
              }
              <br/>
            </div>
          )
        })
      }
    </div>
  );
};

export default Search;