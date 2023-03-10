import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import '../App.css'
import './Advanced.css'


const AdvResults = () => {
  let params = useParams();
  const [results,setResults] = useState();
  const [pageString,setPageString] = useState();
  const [totalCards,setTotalCards] = useState()
  const [nextPage,setNextPage] = useState();

  let url = "https://api.scryfall.com/cards/search?"
  const navigate = useNavigate();




  const nextPageFunc = () => {
    setPageString(pageString.replace(`page=${Number(params.page)}`,`page=${Number(params.page)+1}`))
    navigate(`/AdvResults/${Number(params.page)+1}/${params.value}`)
  }

  const prevPageFunc = () => {
    setPageString(pageString.replace(`page=${Number(params.page)}`,`page=${Number(params.page)-1}`))
    navigate(`/AdvResults/${Number(params.page)-1}/${params.value}`)
  }

  useEffect(()=> {
    fetch(pageString)
    .then(res=>res.json())
    .then(data=>{
      setResults(data.data)
      setNextPage(data.next_page)
    }
    )},[pageString])

  useEffect(()=>{
    fetch(`${url}${params.value}`)
    .then(res=>res.json())
    .then(data=> {
      console.log(data.total_cards)
      setResults(data.data)
      {data.next_page ? setNextPage(data.next_page) : setNextPage('')}
      setTotalCards(data.total_cards)
      data.has_more ? setPageString(data.next_page.replace(`page=2`,`page=1`)) : setPageString(null)
    })
  },[])

  const onClick = (cardID) => {
    navigate(`/detailview/${cardID}`)
  }

  useEffect(()=>{
    document.title = `Results: ${totalCards} Cards`
  },[totalCards])

  return (
    <>
      <div>Total Results: {totalCards}</div><br/>
      {params.page > 1 ? <button id="page-btn" className="submit-btn" onClick={()=>prevPageFunc()}>Previous Page</button> : <></>}
      {nextPage ? <button id="page-btn" className="submit-btn" onClick={()=>nextPageFunc()}>Next Page</button> : <></>}
      <br/><br/>
    <div className="flexResults">
      {results ?
        results.map(card => {
          return (Object.keys(card).includes('image_uris')
            ?
          <div className="cardDiv">
          <img className="card-image rounded-2xl transform hover:scale-125 transition-all" key={card.id} src={card.image_uris.small} onClick={()=>onClick(card.id)}/>
          </div>
            :
          <img  className="card-image rounded-2xl transform hover:scale-125 transition-all" key={card.id}src={card.card_faces[0].image_uris.small}/>)})
        : <div className="spinner" />}

    </div><br/>
    {params.page > 1 ? <button id="page-btn" className="submit-btn" onClick={()=>prevPageFunc()}>Previous Page</button> : <></>}
      {nextPage ? <button id="page-btn" className="submit-btn" onClick={()=>nextPageFunc()}>Next Page</button> : <></>}
    <br/>
    </>
  )
  }



export default AdvResults



