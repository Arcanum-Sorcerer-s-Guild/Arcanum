import React, { useEffect, useState, useContext } from 'react';
import {MagicDataContext} from './Search.js';
// import Search, {MagicDataContext} from './Search.js';

function SearchItem({card}){

  //const {detailPoke, setDetailPoke} = useContext(MagicDataContext);

  //console.log('GridItem return - pokemon:', pokemon);
  //console.log(pokemon.sprites.front_default)
  return (
    <div className='gridItemDiv'>
      <img src={card.image_uris.normal} alt={"The Card"}/>
      <p>{card.id}</p>
    </div>
    // <>
    //   <br></br>
    //   item
    //   <p>{card.id}</p>
    // </>
  );
}


export default SearchItem