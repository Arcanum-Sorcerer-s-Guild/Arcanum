import React, {useEffect, useState} from "react";
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
    <div className="search-results items-center p-2 mt-5 md:mx-52 bg-zinc-500/20 mb-4">
    <div className="search-results-imgs flex flex-wrap justify-between items-center p-2">
        {(cards === undefined) ? 
            <div className="container justify-center items-center text-center">
                <h1 className="text-3xl p-4"> No Cards Found </h1>
                <h4 className="text-lg p-4"> Your search did not match any cards. Please try again by adjusting your terms.</h4> 
            </div> 
        :  
            cards.map((card) => { 
                return(
                    <div>
                        {card.image_uris === undefined ?
                            <div className="card-div flex py-1 my-1">
                                <div className="card-image rounded-2xl cursor-pointer hover:scale-150 transition-all duration-300 ease-in-out">
                                <Link to={`/DetailView/${card.id}`}>
                                    <div className="card-image-front">
                                        <img key={card.id} src={card.card_faces[0].image_uris.small} alt={card.name}/>
                                    </div>
                                  </Link>
                                </div>
                            </div>
                        :
                            <Link to={`/DetailView/${card.id}`}>
                                <div className='card-div'>
                                    <img key={card.id} src={card.image_uris.small} className='card-image rounded-2xl cursor-pointer hover:scale-150 transition-all duration-300 ease-in-out' alt={card.image_uris.small}/>
                                </div>
                            </Link>
                        }
                    </div>
                ) 
            })
        }
    </div>
</div>
  );
};

export default Search;