import React,{useState} from "react";
import {Link} from "react-router-dom"
import './NavBar.css'

const NavBar = () => {
  const [searchTerm,setSearchTerm] = useState('')

  return (
    <nav className="navBar">
      <Link className ="link" to="/">Home</Link>
      <Link className ="link" to="/MyDeck">My Deck</Link>
      <Link className ="link" to="/FeaturedDecks">Featured Decks</Link>
      {/* <Link to="/Tutorial">Tutorial</Link> */}
      <input className="searchBar" type="search" placeholder="Search..." onChange={e=>setSearchTerm(e.target.value)}/>
      <Link className="searchBtn" to={`/Search/${searchTerm}`}><button>Search!</button></Link>
    </nav>
  )};

export default NavBar;
