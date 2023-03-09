import React, { useEffect } from "react";
import CardIncrementer from "../common/CardIncrementer.js";
import { mtgContext } from "../App";

const Search = () => {
  const { decks, setDecks } = React.useContext(mtgContext);

  useEffect(() => {
    setDecks([
      {
        name: "myDeck",
        deckItems: [
          {
            id: "bd8fa327-dd41-4737-8f19-2cf5eb1f7cdG",
            count: 5,
            cardObj: [],
          },          {
            id: "bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd",
            count: 8,
            cardObj: [],
          },
        ],
      },
      {
        name: "mdsadasdyDeck",
        deckItems: [
          {
            id: "bd8fa327-dd41-4737-8f19-2cf5eb1f7cdG",
            count: 1,
            cardObj: [],
          },
          {
            id: "bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd",
            count: 11,
            cardObj: [],
          },
        ],
      },
    ]);
  }, []);

  const cardObject = {
    artist: "Chris Rahn",
    artist_ids: ["7742047e-0f80-4c0f-a530-d07460165e86"],
    booster: true,
    border_color: "black",
    card_back_id: "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
    cmc: 0,
    collector_number: "4",
    color_identity: [],
    colors: [],
    digital: true,
    finishes: (2)[("nonfoil", "foil")],
    foil: true,
    frame: "2015",
    full_art: false,
    games: ["mtgo"],
    highres_image: true,
    id: "bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd",
    illustration_id: "da62ded1-bedd-44c6-8950-ca56e691a899",
    image_status: "highres_scan",
    image_uris: {
      small:
        "https://cards.scryfall.io/small/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
      normal:
        "https://cards.scryfall.io/normal/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
      large:
        "https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
      png: "https://cards.scryfall.io/png/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.png?1614638838",
      art_crop:
        "https://cards.scryfall.io/art_crop/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
    },
    keywords: [],
    lang: "en",
    layout: "normal",
    legalities: {
      standard: "not_legal",
      future: "not_legal",
      historic: "not_legal",
      gladiator: "not_legal",
      pioneer: "not_legal",
    },
    mana_cost: "{0}",
    mtgo_foil_id: 53156,
    mtgo_id: 53155,
    multiverse_ids: [382866],
    name: "Black Lotus",
    nonfoil: true,
    object: "card",
    oracle_id: "5089ec1a-f881-4d55-af14-5d996171203b",
    oracle_text: "{T}, Sacrifice Black Lotus: Add three mana of any one color.",
    oversized: false,
    prices: {
      usd: null,
      usd_foil: null,
      usd_etched: null,
      eur: null,
      eur_foil: null,
    },
    prints_search_uri:
      "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A5089ec1a-f881-4d55-af14-5d996171203b&unique=prints",
    produced_mana: (5)[("B", "G", "R", "U", "W")],
    promo: false,
    reprint: true,
    reserved: true,
    rulings_uri:
      "https://api.scryfall.com/cards/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd/rulings",
    scryfall_set_uri: "https://scryfall.com/sets/vma?utm_source=api",
    scryfall_uri: "https://scryfall.com/card/vma/4/black-lotus?utm_source=api",
    security_stamp: "oval",
    set: "vma",
    set_id: "a944551a-73fa-41cd-9159-e8d0e4674403",
    set_name: "Vintage Masters",
    set_search_uri:
      "https://api.scryfall.com/cards/search?order=set&q=e%3Avma&unique=prints",
    set_type: "masters",
    set_uri:
      "https://api.scryfall.com/sets/a944551a-73fa-41cd-9159-e8d0e4674403",
    story_spotlight: false,
    textless: false,
    type_line: "Artifact",
    uri: "https://api.scryfall.com/cards/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd",
    variation: false,
  };

  return (
    <>
      <CardIncrementer data={cardObject} deckListDropdownOption={false} deckSet={'myDeck'}/>
    </>
  );
};
export default Search;
