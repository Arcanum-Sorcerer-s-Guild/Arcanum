import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./NavBar.css";
import { mtgContext } from "../App";


const NavBar = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const onClick = () => {
      fetch(`https://api.scryfall.com/cards/random`)
        .then((res) => res.json())
        .then((data) => {
          navigate(`detailview/${data.id}`)

        });
  }

  return (
    <div className="nav-wrapper relative flex w-full flex-wrap items-center justify-center shadow-lg">
      <div className="brand-ribbon py-1">
        <Link className="link p-3 text-5xl" to="/">
          <i className="brand-logo ss ss-parl3 p-3">
            <span>rcanum</span>
          </i>
        </Link>
      </div>
      <nav className="nav-bar relative w-full flex items-center justify-around shadow-lg px-2">
          <div className="links relative inline-flex items-center">
            <Link className="relative inline-flex items-center p-3" to="/MyDeck">
              <i className="deck-icon ss ss-s00 p-1"/><span> My Decklist</span>
              <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full top-2 -right-0">4</div>
            </Link>
            |
            <Link className="link p-3" to="/FeaturedDecks">
              <i className="deck-icon ss ss-ss3 p-1"/> <span> Featured Decks</span>
            </Link>
            |
            <Link className="link p-3" to="/Tutorial">
              <i className="deck-icon ss ss-atq p-1"/><span> Tutorial</span>
            </Link>
            |
            <button className="p-3" onClick={()=>onClick()}>  <i className="deck-icon ss ss-gn3 p-1"/> <span>Random Card</span></button>
            |
            <Link className="link p-3" to="/Advanced">
              <i className="deck-icon ss ss-v10 p-1"/><span> Advanced</span>
            </Link>

          </div>

          <div className="search-bundle flex-shrink-0">
            <input
              className="search-input text-black italic"
              type="search"
              placeholder="Search..."
              onKeyPress={(e) => { if (e.key === "Enter") {navigate(`Search/${searchTerm}`)}}}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link className="text-black p-1" to={`/Search/${searchTerm}`}>
              <button className="search-btn hover:bg-gray-700 transition-color duration-700">SEARCH</button>
            </Link>
          </div>
      </nav>
    </div>

    //old code
    // <nav className="navBar">
    //   <Link className ="link" to="/">Home</Link>
    //   <Link className ="link" to="/MyDeck">My Deck</Link>
    //   <Link className ="link" to="/FeaturedDecks">Featured Decks</Link>
    //   {/* <Link to="/Tutorial">Tutorial</Link> */}
    //   <Link className="searchBtn" to={`/Search/${searchTerm}`}><button>SEARCH</button></Link>
    //   <input className="searchBar" type="search" placeholder="Search..." onChange={e=>setSearchTerm(e.target.value)}/>
    // </nav>
  );
};

export default NavBar;
