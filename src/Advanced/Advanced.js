import React, {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import './Advanced.css'

const Advanced = () => {
  const [inputs,setInputs] = useState({})
  const [chosenColors] = useState([])

  const navigate = useNavigate();
  let searchTerm = [];
  let pageValue = 1;

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

    if(searchTerm === '') {
      alert('Please enter in search terms before submitting.')
      return
    }

    if(inputs.hasOwnProperty('orderShown')) {
      searchTerm = `order=${inputs.orderShown}&q=${searchTerm}`
    } else {
      searchTerm = `q=${searchTerm}`
    }

    navigate(`/AdvResults/${pageValue}/${searchTerm}`)
  }

  useEffect(()=> {document.title = 'Advanced Search'},[])

  const updateColors = (color) => {
    if (chosenColors.includes(color)) {
      const index = chosenColors.indexOf(color)
      chosenColors.splice(index,1)
    } else {
      chosenColors.push(color)
    }
  }

  return(
    <div className="flex flex-col justify-center items-center">
    <form className="bg-zinc-500/25 shadow-md rounded px-20 pt-6 pb-8 mb-4 mt-5" onSubmit={handleSubmit}>
      <h1>Advanced Search</h1><br/>

      <div>Card Name:</div>
      <input placeholder="Choose something scary..." className="search-input text-black italic" name="cardName" value={inputs.name} type="text" onChange={handleChange} />
      <br/><br/>

      <div>Converted Mana Cost</div>
      <input placeholder="Choose a number" className="search-input text-black italic" name="cardCMC" value={inputs.name} type="text" onChange={handleChange} />
      <br/><br/>

      <div>Inner Card Text</div>
      <input placeholder="Choose the word win" className="search-input text-black italic" name="cardText" value={inputs.name} type="text" onChange={handleChange}/>
      <br/><br/>

      <div>Artist</div>
      <input placeholder="Artist name here" className="search-input text-black italic" name="cardArtist" value={inputs.name} type="text" onChange={handleChange} />
      <br/><br/>

      <div>Card Rarity</div>
      <select className="search-input text-black italic" name="cardRarity" value={inputs.name} onChange={handleChange}>
        <option value=""></option>
        <option value="c">Common</option>
        <option value="u">Uncommon</option>
        <option value="r">Rare</option>
        <option value="m">Mythic Rare</option>
      </select>
      <br/><br/>


        <div>Card Type</div>
        <select className="search-input text-black italic" name="cardType" value={inputs.name} onChange={handleChange}>
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
      <br/><br/>


      <div className="checkBoxDiv">Card Color: (Unless checked searches all colors)</div>
        <input type="checkbox" name="colorWhite" value='w' defaultChecked={false} onChange={()=>updateColors('w')}/>White<br/>
        <input type="checkbox" name="colorBlue" value='u' defaultChecked={false} onChange={()=>updateColors('u')}/>Blue<br/>
        <input type="checkbox" name="colorBlack" value='b' defaultChecked={false} onChange={()=>updateColors('b')}/>Black<br/>
        <input type="checkbox" name="colorGreen" value='r' defaultChecked={false} onChange={()=>updateColors('r')}/>Red<br/>
        <input type="checkbox" name="colorRed" value='g' defaultChecked={false} onChange={()=>updateColors('g')} />Green<br/>
        <input type="checkbox" name="colorLess" value='c' defaultChecked={false} onChange={()=>updateColors('c')}/>Colorless<br/>
      <br/>


        <div>Order of search results:</div>
        <select className="search-input text-black italic" name="orderShown" value={inputs.name} onChange={handleChange}>
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

      <br/><br/>

      <input type="submit" className="submit-btn hover:bg-gray-700 transition-color duration-70" />
    </form>
    </div>

  )
}

export default Advanced;


