import React, { useEffect, useState, useContext } from 'react';
// import './App.css';
import {MagicDataContext} from './Search.js';
import SearchItem from './SearchItem.js';

function GridView(){
  const {searchList, setSearchList} = useContext(MagicDataContext);

  return (
    <div className="grid">
      {searchList.map(card => {
        //console.log('GridView inside map - pokemon:', pokemon);
        return (
          <div>
            <SearchItem key={card.id} card={card} />
          </div>
        )
      })}
    </div>
  )
}



export default GridView
