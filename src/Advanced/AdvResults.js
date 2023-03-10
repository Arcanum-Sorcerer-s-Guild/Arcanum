import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import '../App.css'
import './Advanced.css'


const AdvResults = () => {
  let params = useParams();
  const [results,setResults] = useState();
  const [nextPage,setNextPage] = useState();

  let url = "https://api.scryfall.com/cards/search?"
  const navigate = useNavigate();

  const nextPageFunc = () => {
    fetch(nextPage)
    .then(res=>res.json())
    .then(data=>{
      setResults(data.data)
      data.has_more ? setNextPage(data.next_page) : setNextPage('')
    })

  }

  useEffect(()=>{
    fetch(`${url}${params.value}`)
    .then(res=>res.json())
    .then(data=> {
      setResults(data.data)
      data.has_more ? setNextPage(data.next_page) : setNextPage('')
    })
  },[])

  const onClick = (cardID) => {
    navigate(`/detailview/${cardID}`)
  }

  return (
    <div className="flexResults">
      {results ? results.map(card => {return (Object.keys(card).includes('image_uris') ? <img key={card.id} src={card.image_uris.small} onClick={()=>onClick(card.id)}/> : <img key={card.id}src={card.card_faces[0].image_uris.small}/>)})
       : <div className="spinner" />}

    {nextPage ? <button onClick={()=>nextPageFunc()}>Next Page</button> : <></>}
    </div>
  )
  }



export default AdvResults



