import logo from "./logo.svg";
import "./App.css";
import React, { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./common/NavBar.js";
import Home from "./Home/Home.js";
import Search from "./Search/Search.js";
import DetailView from "./DetailView/DetailView.js";
import MyDeck from "./MyDeck/MyDeck.js";
import FeatureDecks from "./FeaturedDecks/FeaturedDecks.js";
import NotFound from "./NotFound/NotFound.js";
import Tutorial from "./Tutorial/Tutorial";

import CardIncrementer from "./common/CardIncrementer";
export const mtgContext = React.createContext();

function App() {
  const [deck, setDeck] = useState({
    name: "myDeckString",
    deckItems: [

    ],
  });


  const jsontest = {
    
      artist:"Chris Rahn",
      booster:true,
      border_color:"black",
      card_back_id:"0aeebaf5-8c7d-4636-9e82-8c27447861f7",
      cmc:0,
      collector_number:"4",
      color_identity:[],
      colors:[],
      digital:true,
      finishes:(2) ['nonfoil', 'foil'],
      foil:true,
      frame:"2015",
      full_art:false,
      games:['mtgo'],
      highres_image:true,
      id:"bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd",
      illustration_id:"da62ded1-bedd-44c6-8950-ca56e691a899",
      image_status:"highres_scan",
      image_uris:{small: 'https://cards.scryfall.io/small/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838', normal: 'https://cards.scryfall.io/normal/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838', large: 'https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838', png: 'https://cards.scryfall.io/png/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.png?1614638838', art_crop: 'https://cards.scryfall.io/art_crop/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838'},
      keywords:[],
      lang:"en",
      layout:"normal",
      legalities:{standard: 'not_legal', future: 'not_legal', historic: 'not_legal', gladiator: 'not_legal', pioneer: 'not_legal'},
      mana_cost:"{0}",
      mtgo_foil_id:53156,
      mtgo_id:53155,
      multiverse_ids:[382866],
      name:"Black Lotus",
      nonfoil:true,
      object:"card",
      oracle_id:"5089ec1a-f881-4d55-af14-5d996171203b",
      oracle_text:"{T}, Sacrifice Black Lotus: Add three mana of any one color.",
      oversized:false,
      }
  

  return (
    <mtgContext.Provider value={{ deck, setDeck }}>
      <NavBar />
      <CardIncrementer data={jsontest}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search/:value" element={<Search />} />
        <Route path="/DetailView/:id" element={<DetailView />} />
        <Route path="/MyDeck" element={<MyDeck />} />
        <Route path="/FeatureDecks" element={<FeatureDecks />} />
        <Route path="/Tutorial" element={<Tutorial />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </mtgContext.Provider>
  );
}

export default App;
