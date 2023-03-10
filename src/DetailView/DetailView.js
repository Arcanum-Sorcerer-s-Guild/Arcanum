import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetailView.css";
import "../App.css";

const DetailView = () => {
  const [currCard, setCurrCard] = useState({
    name: "",
    set_name: "",
    image: "",
    rarity: "",
    mana_cost: "",
    type_line: "",
    color_identity: "",
    artist: "",
    standard_legal: "",
    legacy_legal: "",
    modern_legal: "",
    vintage_legal: "",
    commander_legal: "",

    priceUSD: null,
    priceUSDFoil: null,
    priceTIX: null,
    tcgplayerLink: "",
    gathererLink: "",
    edhrecLink: "",
    scryfallLink: "",
    oracleText: "",
  });

  const [cardRulings, setCardRulings] = useState([]);
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.scryfall.com/cards/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
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
          tcgplayerLink: data.purchase_uris
            ? data.purchase_uris.tcgplayer
            : undefined,
          gathererLink: data.related_uris.gatherer,
          edhrecLink: data.related_uris.edhrec,
          scryfallLink: data.scryfall_uri,
          oracleText: data.oracle_text,
        });
      })
      .catch((err) => {
        alert(
          `${err}: Unable to locate card with id:\n${params.id}\n\nReturning to main page...`
        );
        navigate("/");
      });
  }, []);


  useEffect(() => {
    fetch(`https://api.scryfall.com/cards/${params.id}/rulings`)
      .then((res) => res.json())
      .then((data) => {
        setCardRulings(data);
      });
  }, [currCard]);

  useEffect(() => {
    document.title = currCard.name;
  }, [currCard]);

  return (
    <>
      {currCard.image !== "" ? (
        <div className="relative flex justify-center mt-20">
          <div className="relative grid grid-cols-5 gap-5">
            <div className="img-col col-span-2 p-1">
              <img
                className="card-detail-img rounded-2xl transform hover:scale-125 transition-all"
                src={currCard.image}
                alt={currCard.name}
              />
            </div>
            <div className="detail-col col-span-3 px-5 py-2 rounded-md">
              <button>Add to deck</button>
              <span> # in deck</span>
              <div className="mb-2 border-b border-gray-200 dark:border-gray-700">
                <ul
                  className="flex flex-wrap -mb-px text-sm font-medium text-center"
                  id="myTab"
                  data-tabs-toggle="#myTabContent"
                  role="tablist"
                >
                  <li className="mr-2" role="presentation">
                    <button
                      className="inline-block p-4 border-b-2 rounded-t-lg"
                      id="info-tab"
                      data-tabs-target="#info"
                      type="button"
                      role="tab"
                      aria-controls="info"
                      aria-selected="false"
                    >
                      Info
                    </button>
                  </li>
                  <li className="mr-2" role="presentation">
                    <button
                      className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                      id="legalities-tab"
                      data-tabs-target="#legalities"
                      type="button"
                      role="tab"
                      aria-controls="dashboard"
                      aria-selected="false"
                    >
                      Legalities
                    </button>
                  </li>
                  <li className="mr-2" role="presentation">
                    <button
                      className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                      id="prices-tab"
                      data-tabs-target="#prices"
                      type="button"
                      role="tab"
                      aria-controls="settings"
                      aria-selected="false"
                    >
                      Prices
                    </button>
                  </li>
                  <li role="presentation">
                    <button
                      className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                      id="external-tab"
                      data-tabs-target="#external"
                      type="button"
                      role="tab"
                      aria-controls="contacts"
                      aria-selected="false"
                    >
                      External Links
                    </button>
                  </li>
                </ul>
              </div>
              <div id="myTabContent">
                <div
                  className="hidden"
                  id="info"
                  role="tabpanel"
                  aria-labelledby="info-tab"
                >
                  <div className="card-details mt-2">
                    <table className="auto">
                      <tbody>
                        <tr>
                          <th>Card Name:</th>
                          <td>{currCard.name}</td>
                        </tr>
                        <tr>
                          <th>Set:</th>
                          <td>{currCard.set_name}</td>
                        </tr>
                        <tr>
                          <th>Rarity:</th>
                          <td>{currCard.rarity}</td>
                        </tr>
                        <tr>
                          <th>CMC:</th>
                          <td>{currCard.mana_cost}</td>
                        </tr>
                        <tr>
                          <th>Card Type:</th>
                          <td>{currCard.type_line}</td>
                        </tr>
                        <tr>
                          <th>Colors:</th>
                          <td>
                            {currCard.color_identity.length === 0
                              ? (currCard.color_identity = "None")
                              : currCard.color_identity}
                          </td>
                        </tr>
                        <tr>
                          <th>Artist:</th>
                          <td>{currCard.artist}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="hidden"
                  id="legalities"
                  role="tabpanel"
                  aria-labelledby="legalities-tab"
                >
                  <div className="card-details mt-2">
                    <table className="auto">
                      <tbody>
                        <tr>
                          <th>Standard:</th>
                          <td>
                            {currCard.standard_legal === "legal"
                              ? "\u2705"
                              : "\u274C"}
                          </td>
                        </tr>
                        <tr>
                          <th>Modern:</th>
                          <td>
                            {currCard.modern_legal === "legal"
                              ? "\u2705"
                              : "\u274C"}
                          </td>
                        </tr>
                        <tr>
                          <th>Legacy:</th>
                          <td>
                            {currCard.legacy_legal === "legal"
                              ? "\u2705"
                              : "\u274C"}
                          </td>
                        </tr>
                        <tr>
                          <th>Vintage:</th>
                          <td>
                            {currCard.vintage_legal === "legal"
                              ? "\u2705"
                              : "\u274C"}
                          </td>
                        </tr>
                        <tr>
                          <th>Commander:</th>
                          <td>
                            {currCard.commander_legal === "legal"
                              ? "\u2705"
                              : "\u274C"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="hidden"
                  id="prices"
                  role="tabpanel"
                  aria-labelledby="prices-tab"
                >
                  <div className="card-details mt-2">
                    <table className="auto">
                      <tbody>
                        <tr>
                          <th>USD:</th>
                          <td>
                            {currCard.priceUSD
                              ? `$${currCard.priceUSD}`
                              : "No price available"}
                          </td>
                        </tr>
                        <tr>
                          <th>USD Foil:</th>
                          <td>
                            {currCard.priceUSDFoil
                              ? `$${currCard.priceUSDFoil}`
                              : "No price available"}
                          </td>
                        </tr>
                        <tr>
                          <th>TIX:</th>
                          <td>
                            {currCard.priceTIX
                              ? `$${currCard.priceTIX}`
                              : "No price available"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="hidden"
                  id="external"
                  role="tabpanel"
                  aria-labelledby="external-tab"
                >
                  <div className="card-details mt-2">
                    <ul className="list-inside">
                      {currCard.tcgplayerLink ? (
                        <li>
                          <a href={currCard.tcgplayerLink}>
                            Purchase at TCG Player
                          </a>
                        </li>
                      ) : (
                        <></>
                      )}
                      {currCard.gathererLink ? (
                        <li>
                          <a href={currCard.gathererLink}>View in Gatherer</a>
                        </li>
                      ) : (
                        <></>
                      )}
                      <li>
                        <a href={currCard.scryfallLink}>View in Scryfall</a>
                      </li>
                      <li>
                        <a href={currCard.edhrecLink}>Read about at EDHREC</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="mt-4 mb-2 border-b border-gray-200 dark:border-gray-700">
              <h3>Oracle Text</h3>
              <p>{currCard.oracleText}</p>
              {cardRulings.data ? (
                <div>
                  {cardRulings.data.length === 0 ? "" : <h3>Rulings</h3>}
                  {cardRulings.data.map((ruling) => (
                    <p
                      key={Math.random()}
                    >{`${ruling.published_at} ${ruling.comment}`}</p>
                  ))}
                </div>
              ) : (
                <div className="spinner" />
              )}
            </div> */}
          </div>
        </div>
      ) : (
        <div className="spinner" />
      )}
    </>
  );
};

export default DetailView;

// {/* <>
//   {currCard.image !== '' ?
//     <>
//     <div className="cardDetailContainer">
//       <div>
//         <img src={currCard.image}/>
//       </div>

//       <div className="text-gray-600">
//           <button>Add to deck</button>
//           <span> # in deck</span>
//         <div>
//           <h1>{currCard.name}</h1>
//           <ul>
//             <li><div>Set: {currCard.set_name}</div></li>
//             <li><div>Rarity: {currCard.rarity}</div></li>
//             <li><div>CMC: {currCard.mana_cost}</div></li>
//             <li><div>Card Type: {currCard.type_line}</div></li>
//             <li><div>Colors: {currCard.color_identity.length === 0 ? currCard.color_identity = "None" : currCard.color_identity}</div></li>
//             <li><div>Artist: {currCard.artist}</div></li>
//           </ul>
//         </div>

//         <h3>Legalities</h3>
//           <ul>
//             <li><div>{`Standard: ${currCard.standard_legal === 'legal' ? "\u2705" : "\u274C"}`}</div></li>
//             <li><div>{`Modern: ${currCard.modern_legal === 'legal' ? "\u2705" : "\u274C"}`}</div></li>
//             <li><div>{`Legacy: ${currCard.legacy_legal === 'legal' ? "\u2705" : "\u274C"}`}</div></li>
//             <li><div>{`Vintage: ${currCard.vintage_legal === 'legal' ? "\u2705" : "\u274C"}`}</div></li>
//             <li><div>{`Commander: ${currCard.commander_legal === 'legal' ? "\u2705" : "\u274C"}`}</div></li>
//           </ul>

//         <h3>Prices</h3>
//           <ul>
//             <li><div>{currCard.priceUSD ? `USD: $${currCard.priceUSD}` : "USD: No price available"}</div></li>
//             <li><div>{currCard.priceUSDFoil ? `USD Foil: $${currCard.priceUSDFoil}` : "USD Foil: No price available"}</div></li>
//             <li><div>{currCard.priceTIX ? `TIX: $${currCard.priceTIX}` : "TIX: No price available"}</div></li>
//           </ul>
//         <h3>External Links</h3>
//           <ul>
//             {currCard.tcgplayerLink ? <li><a href={currCard.tcgplayerLink}>Purchase at TCG Player</a></li> : <></>}
//             {currCard.gathererLink ? <li><a href={currCard.gathererLink}>View in Gatherer</a></li> : <></>}
//             <li><a href={currCard.scryfallLink}>View in Scryfall</a></li>
//             <li><a href={currCard.edhrecLink}>Read about at EDHREC</a></li>
//           </ul>

//       </div>

//     </div>
//         <h3>Oracle Text</h3>
//         <p>{currCard.oracleText}</p>

//         {cardRulings.data ?
//           <>
//           {cardRulings.data.length === 0 ? "" : <h3>Rulings</h3>  }
//           {cardRulings.data.map(ruling => <p key={Math.random()}>{`${ruling.published_at} ${ruling.comment}`}</p>)}
//           </>
//           : <div className="spinner" />}
//     </>
//         :
//         <div className="spinner" />
// }
//   </>
//   ) */}
