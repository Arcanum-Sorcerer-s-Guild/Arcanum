import React, {useEffect,useState} from "react";
import {useParams} from 'react-router-dom'
import './DetailView.css'

const DetailView = () => {
  const [currCard,setCurrCard] = useState({
    name: '',
    set_name: '',
    image: '',
    rarity: '',
    mana_cost: '',
    type_line: '',
    color_identity: '',
    artist: '',
    standard_legal: '',
    legacy_legal: '',
    modern_legal: '',
    vintage_legal: '',
    commander_legal: '',
    priceUSD: null,
    priceUSDFoil: null,
    priceTIX: null,
    tcgplayerLink: '',
    gathererLink: '',
    edhrecLink: '',
    scryfallLink: '',
    oracleText: ''
})

  const [cardRulings,setCardRulings] = useState([])
  let params = useParams();

  useEffect(()=>{
    fetch(`https://api.scryfall.com/cards/${params.id}`)
    .then(res=>res.json())
    .then(data=> {
      setCurrCard({
        name: data.name,
        set_name: data.set_name,
        image: data.image_uris.normal,
        rarity: data.rarity,
        mana_cost: data.mana_cost,
        type_line: data.type_line,
        color_identity: data.color_identity,
        artist: data.artist,
        standard_legal: data.legalities.standard,
        modern_legal: data.legalities.modern,
        legacy_legal: data.legalities.legacy,
        vintage_legal: data.legalities.vintage,
        commander_legal: data.legalities.commander,
        priceUSD: data.prices.usd,
        priceUSDFoil: data.prices.usd_foil,
        priceTIX: data.prices.tix,
        tcgplayerLink: data.purchase_uris.tcgplayer,
        gathererLink: data.related_uris.gatherer,
        edhrecLink: data.related_uris.edhrec,
        scryfallLink: data.scryfall_uri,
        oracleText: data.oracle_text
      })
    })
  },[])

  useEffect(()=>{
    fetch(`https://api.scryfall.com/cards/${params.id}/rulings`)
    .then(res=>res.json())
    .then(data=> {
      setCardRulings(...cardRulings,data)
    })
  },[currCard])

  useEffect(()=> {
    document.title = currCard.name
  },[currCard])


  return (
  <>
  {Object.keys(currCard).length === 0 ?
    <h1>Loading...</h1>
    :
    <>
    <div className="cardDetailContainer">
      <div>
        <img src={currCard.image}/>
      </div>

      <div className="text-gray-600">
          <button>Add to deck</button>
          <span> # in deck</span>
        <div>
          <h1>{currCard.name}</h1>
          <ul>
            <li><div>Set: {currCard.set_name}</div></li>
            <li><div>Rarity: {currCard.rarity}</div></li>
            <li><div>CMC: {currCard.mana_cost}</div></li>
            <li><div>Card Type: {currCard.type_line}</div></li>
            <li><div>Colors: {currCard.color_identity.length === 0 ? currCard.color_identity = "None" : currCard.color_identity}</div></li>
            <li><div>Artist: {currCard.artist}</div></li>
          </ul>
        </div>

        <h3>Legalities</h3>
          <ul>
            <li><div>{`Standard: ${currCard.standard_legal === 'legal' ? "\u2705" : "\u274C"}`}</div></li>
            <li><div>{`Modern: ${currCard.modern_legal === 'legal' ? "\u2705" : "\u274C"}`}</div></li>
            <li><div>{`Legacy: ${currCard.legacy_legal === 'legal' ? "\u2705" : "\u274C"}`}</div></li>
            <li><div>{`Vintage: ${currCard.vintage_legal === 'legal' ? "\u2705" : "\u274C"}`}</div></li>
            <li><div>{`Commander: ${currCard.commander_legal === 'legal' ? "\u2705" : "\u274C"}`}</div></li>
          </ul>

        <h3>Prices</h3>
          <ul>
            <li><div>{currCard.priceUSD ? `USD: $${currCard.priceUSD}` : "USD: No price available"}</div></li>
            <li><div>{currCard.priceUSDFoil ? `USD Foil: $${currCard.priceUSDFoil}` : "USD Foil: No price available"}</div></li>
            <li><div>{currCard.priceTIX ? `TIX: $${currCard.priceTIX}` : "TIX: No price available"}</div></li>
          </ul>
        <h3>External Links</h3>
          <ul>
            <li><a href={currCard.tcgplayerLink}>Purchase at TCG Player</a></li>
            <li><a href={currCard.gathererLink}>View in Gatherer</a></li>
            <li><a href={currCard.scryfallLink}>View in Scryfall</a></li>
            <li><a href={currCard.edhrecLink}>Read about at EDHREC</a></li>
          </ul>

      </div>

    </div>
        <h3>Oracle Text</h3>
        <p>{currCard.oracleText}</p>

        <h3>Rulings</h3>
        {Object.keys(cardRulings).length > 0 ?
          cardRulings.data.map(ruling => <p key={Math.random()}>{`${ruling.published_at} ${ruling.comment}`}</p>)
          : <div>Loading...</div>}
    </>
}
  </>
  )

};

export default DetailView;
