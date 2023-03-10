import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import './Advanced.css'

const Advanced = () => {


  const [inputs,setInputs] = useState({})
  const [chosenColors] = useState([])

  const navigate = useNavigate();
  let searchTerm = [];

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setInputs(values => ({...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(inputs.hasOwnProperty('cardName'))
      searchTerm = [`${inputs.cardName}`]

    if(inputs.hasOwnProperty('cardText'))
      searchTerm.push(`o:${inputs.cardText}`)

    if(inputs.hasOwnProperty('cardType'))
      searchTerm.push(`t:${inputs.cardType}`)

    if(chosenColors.length > 0)
      searchTerm.push(`c=${chosenColors.join("")}`)

    if(inputs.hasOwnProperty('cardRarity'))
      searchTerm.push(`r=${inputs.cardRarity}`)

    if(inputs.hasOwnProperty('cardArtist'))
      searchTerm.push(`artist:${inputs.cardArtist}`)

    if(inputs.hasOwnProperty('cardCMC'))
      searchTerm.push(`cmc:${inputs.cardCMC}`)

    searchTerm = searchTerm.join("+")

    if(inputs.hasOwnProperty('orderShown')) {
      searchTerm = `order=${inputs.orderShown}&q=${searchTerm}`
    } else {
      searchTerm = `q=${searchTerm}`
    }

    navigate(`/AdvResults/${searchTerm}`)
  }


  const updateColors = (color) => {
    if (chosenColors.includes(color)) {
      const index = chosenColors.indexOf(color)
      chosenColors.splice(index,1)
    } else {
      chosenColors.push(color)
    }
  }

  return(
    <>
    <h1>Advanced Search:</h1><br/>
    <form className="advancedForm" onSubmit={handleSubmit}>

      <label>
        Card Name <input className="textBox" name="cardName" value={inputs.name} type="text" onChange={handleChange} />
      </label>
      <br/><br/>

      <label>
        Converted Mana Cost <input className="textBox" name="cardCMC" value={inputs.name} type="text" onChange={handleChange} />
      </label>
      <br/><br/>

      <label>
        Card Text<input className="textBox" name="cardText" value={inputs.name} type="text" onChange={handleChange}/>
      </label>
      <br/><br/>

      <label>
        Card Type
        <select className="textBox" name="cardType" value={inputs.name} onChange={handleChange}>
          <option value=""></option>
          <option value="Artifact">Artifact</option>
          <option value="Land">Land</option>
          <option value="Creature">Creature</option>
          <option value="Legendary">Legendary</option>
          <option value="Enchantment">Enchantment</option>
          <option value="Sorcery">Sorcery</option>
          <option value="Planeswalker">Planeswalker</option>
          <option value="Instant">Instant</option>
        </select>
      </label>
      <br/><br/>

      <label>
        Card Color:
        <div>Searches all colors when none are checked</div>
        White<input type="checkbox" name="colorWhite" value='w' defaultChecked={false} onChange={()=>updateColors('w')}/>
        Blue<input type="checkbox" name="colorBlue" value='u' defaultChecked={false} onChange={()=>updateColors('u')}/>
        Black<input type="checkbox" name="colorBlack" value='b' defaultChecked={false} onChange={()=>updateColors('b')}/>
        Red<input type="checkbox" name="colorGreen" value='r' defaultChecked={false} onChange={()=>updateColors('r')}/>
        Green<input type="checkbox" name="colorRed" value='g' defaultChecked={false} onChange={()=>updateColors('g')} />
        Colorless<input type="checkbox" name="colorLess" value='c' defaultChecked={false} onChange={()=>updateColors('c')}/>
      </label>
      <br/><br/>

      <label>
      Card Rarity
      <select className="textBox" name="cardRarity" value={inputs.name} onChange={handleChange}>
        <option value=""></option>
        <option value="c">Common</option>
        <option value="u">Uncommon</option>
        <option value="r">Rare</option>
        <option value="m">Mythic Rare</option>
      </select>
      </label>
      <br/><br/>

      <label>
        Artist <input className="textBox" name="cardArtist" value={inputs.name} type="text" onChange={handleChange} />
      </label>
      <br/><br/>

      <label>
        Order of search results:
        <select className="textBox" name="orderShown" value={inputs.name} onChange={handleChange}>
          <option value=""></option>
          <option value="name">Name</option>
          <option value="set">Set</option>
          <option value="released">Released</option>
          <option value="rarity">Rarity</option>
          <option value="color">Color</option>
          <option value="usd">USD</option>
          <option value="cmc">CMC</option>
          <option value="power">Power</option>
          <option value="toughness">Toughness</option>
          <option value="edhrec">EDHREC</option>
          <option value="artist">Artist</option>
        </select>
      </label>
      <br/><br/>

      <input type="submit" />
    </form>
    </>
  )
}

export default Advanced;


