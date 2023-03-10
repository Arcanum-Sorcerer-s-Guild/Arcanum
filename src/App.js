import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./common/NavBar.js";
import Footer from "./common/Footer.js"
import Home from "./Home/Home.js";
import Search from "./Search/Search.js";
import DetailView from "./DetailView/DetailView.js";
import MyDeck from "./MyDeck/MyDeck.js";
import NotFound from "./NotFound/NotFound.js";
import Tutorial from "./Tutorial/Tutorial";
import Advanced from "./Advanced/Advanced.js"
import AdvResults from "./Advanced/AdvResults.js"

export const mtgContext = React.createContext();

function App() {
  const [decks, setDecks] = useState([{
    name: "My Deck",
    deckItems: [],
  }]);

  return (
    <mtgContext.Provider value={{ decks, setDecks }}>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Search/:value" element={<Search />} />
        <Route path="/DetailView/:id" element={<DetailView />} />
        <Route path="/MyDeck" element={<MyDeck />} />
        <Route path="/Tutorial" element={<Tutorial />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/Advanced" element={<Advanced/>}/>
        <Route path="/AdvResults/:page/:value" element={<AdvResults/>}/>
      </Routes>
      <Footer />
    </mtgContext.Provider>
  );
}

export default App;