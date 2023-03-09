import logo from "./logo.svg";
import "./App.css";
import React, { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./common/NavBar.js";
import Footer from "./common/Footer.js"
import Home from "./Home/Home.js";
import Search from "./Search/Search.js";
import DetailView from "./DetailView/DetailView.js";
import MyDeck from "./MyDeck/MyDeck.js";
import FeaturedDecks from "./FeaturedDecks/FeaturedDecks.js";
import NotFound from "./NotFound/NotFound.js";
import Tutorial from "./Tutorial/Tutorial";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch.js"

export const mtgContext = React.createContext();

function App() {
  const [decks, setDecks] = useState([{
    name: "myDeck",
    deckItems: [],
  }]);

  return (
    <mtgContext.Provider value={{ decks, setDecks }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search/:value" element={<Search />} />
        <Route path="/DetailView/:id" element={<DetailView />} />
        <Route path="/MyDeck" element={<MyDeck />} />
        <Route path="/FeaturedDecks" element={<FeaturedDecks />} />
        <Route path="/Tutorial" element={<Tutorial />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/AdvancedSearch" element={<AdvancedSearch/>}/>
      </Routes>
      <Footer />
    </mtgContext.Provider>
  );
}

export default App;
