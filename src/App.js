import logo from "./logo.svg";
import "./App.css";
import React, { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./common/NavBar.js";
import Home from "./Home/Home.js";
import Search from "./Search/Search.js";
import DetailView from "./DetailView/DetailView.js";
import MyDeck from "./MyDeck/MyDeck.js";
import FeaturedDecks from "./FeaturedDecks/FeaturedDecks.js";
import NotFound from "./NotFound/NotFound.js";
import Tutorial from "./Tutorial/Tutorial";

export const mtgContext = React.createContext();

function App() {
  const [deck, setDeck] = useState({
    name: "myDeckString",
    deckItems: [],
  });

  return (
    <mtgContext.Provider value={{ deck, setDeck }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search/:value" element={<Search />} />
        <Route path="/DetailView/:id" element={<DetailView />} />
        <Route path="/MyDeck" element={<MyDeck />} />
        <Route path="/featureddecks" element={<FeaturedDecks />} />
        <Route path="/Tutorial" element={<Tutorial />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </mtgContext.Provider>
  );
}

export default App;
