/**
 * SEARCH CAPABILITIES:
 * - name
 * - id
 *
 * SAMPLE QUERIES:
 * https://api.scryfall.com/cards/named?fuzzy=aust+com&color=black
 * https://api.scryfall.com/cards/search?order=cmc&q=c%3Ared+pow%3D3
 *
**/
/**
 * TODO:
 * - Get the page to display all searches
 *
 */

// my component is updated /search/:id for a value passed, and that'll be what is loaded when searched from the nav bar

import React, { useEffect, useState, createContext } from "react";
import SearchGrid from './SearchGrid.js';
// import './App.css';


export const MagicDataContext = createContext();

const Search = () => {
  // States to represent the list of results and if the page is loading
  const [searchList, setSearchList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // When the query is performed, load the list of search results
  const loadList = () => {
    var promises = [];
    promises.push(fetch(`https://api.scryfall.com/cards/named?fuzzy=aust+com&color=black`)
      .then(response => response.json()));

    Promise.all(promises)
      .then(result => {
        setSearchList(result);
        console.log('promise all fetch json:', result);
        setLoaded(true);
      })
  };

  useEffect(() => {
    loadList();
  }, []);

  // // helper function to add to a query
  // function AddQuery(currentQuery) {
  //   return currentQuery;
  // }

  // Returns a
  return (
  <>
    <h1>Search Results</h1>
    Test
    <button type="button" onClick={() => loadList()}>Search!</button>
    <MagicDataContext.Provider value={ {searchList, setSearchList} }>
      {(loaded !== true)
        ? <div className="spinnerDiv"><div className="spinner"></div></div>
        : (<SearchGrid/>)
      }
    </MagicDataContext.Provider>
  </>);
};

export default Search;
