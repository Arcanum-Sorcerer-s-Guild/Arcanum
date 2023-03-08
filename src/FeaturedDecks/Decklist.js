import React, { useState } from "react"
// import deck from "./decklists/Brittney (5-0).txt"

// function importAll(r) {
//   let files = {};
//   r.keys().map(item => { files[item.replace('./', '')] = r(item); });
//   return files;
// }
// const files = importAll(require.context('./decklists', false, '/\.txt/'));

const Decklist = () => {
  const [deck, setDeck] = useState([]);
  

  const importFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      parse(text)
    };
    reader.readAsText(e.target.files[0])
  }

  const parse = (text) => {
    const lines = text.split('\n')
    let cards = [];
    for (let line of lines) {
      // Stop at the first blank line (skips the sideboard)
      if (! line.match(/^\d/)) {
        pullCards(cards);
        break;
      }

      let parts = line.trim().split(' ');
      let card = {
        count: parts[0],
        name: parts.slice(1).join(' '),
      };
      cards.push(card);
    }
  }

  const pullCards = (cards) => {
    console.log('pulling cards:', cards)

    let promises = [];
    for (let card of cards) {
      let cleanName = card.name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').replace(/ /g, '+').toLowerCase();
      promises.push(
        fetch(`https://api.scryfall.com/cards/named?exact=${cleanName}`)
          .then((res) => res.json())
          .then((data) => {
            return ({count: card.count, cardObj: data})
          })
      )
    }

    Promise.all(promises)
      .then(result => {
        let objs = result.map((obj) => ({...obj, id: obj.cardObj.id, name: obj.cardObj.name}))
        setDeck(objs)
      })
  }

  
  const encode = (deck) => {
    let encoded = [];
    for (let o of deck) {
      encoded.push(o.count)
      encoded.push(' ')
      encoded.push(o.cardObj.name)
      encoded.push('\n')
    }
    return encoded;
  }

  const exportFile = () => {
    const element = document.createElement("a");
    const file = new Blob(encode(deck), {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div>
      <h1>Decklist</h1>
      <div><input type="file" onChange={(e) => importFile(e)} /></div>
      <div><button onClick={() => exportFile()}>Export</button></div>
      {deck.length > 0 ? <><h2>Deck</h2><div><pre>{JSON.stringify(deck, null, 2)}</pre></div></> : <p></p>}
    </div>
  )
  
}

export default Decklist