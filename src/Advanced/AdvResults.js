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
    <div className="adv-search-results items-center p-2 mt-5 md:mx-52  bg-zinc-500/20 mb-4">
    <div className="adv-header flex flex-wrap justify-between items-center text-center px-5  bg-amber-600/20">
        <h1 className="text-xl p-4">Total Cards: {totalCards}</h1>
        <div className="adv-btns p-2">
            {params.page > 1 ? <button id="page-btn" className="submit-btn" onClick={()=>prevPageFunc()}>Previous Page</button> : <></>}
            {nextPage ? <button id="page-btn" className="submit-btn" onClick={()=>nextPageFunc()}>Next Page</button> : <></>}
        </div>
    </div>
    <div className="adv-img-wrapper flex flex-wrap justify-center items-center my-4 py-5 px-5">
        {results ?
            results.map(card => {
            return (Object.keys(card).includes('image_uris')
                ?
            <div className="adv-img">
                <img className="card-image rounded-2xl transform hover:scale-125 transition-all" key={card.id} src={card.image_uris.small} onClick={()=>onClick(card.id)}/>
                </div>
                    :
                <img  className="card-image rounded-2xl transform hover:scale-125 transition-all" key={card.id}src={card.card_faces[0].image_uris.small} onClick={()=>onClick(card.id)}/>)})
                : <div className="spinner" />}
    </div>
    <div className="adv-footer flex flex-wrap justify-between items-center text-center mt-4 px-5  bg-amber-600/20">
        <div className="adv-btns p-2">
            {params.page > 1 ? <button id="page-btn" className="submit-btn" onClick={()=>prevPageFunc()}>Previous Page</button> : <></>}
            {nextPage ? <button id="page-btn" className="submit-btn" onClick={()=>nextPageFunc()}>Next Page</button> : <></>}
        </div>
    </div>





</div>
    )
  }



export default AdvResults