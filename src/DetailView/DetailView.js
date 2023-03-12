import React, { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetailView.css";
import "../App.css";

import { mtgContext } from "../App.js";
import CardIncrementer from "../common/CardIncrementer";
import { Tabs, Timeline } from "flowbite-react";
import TextLoading from "./TextLoading.js"
import CardLoading from "./CardLoading.js"

const DetailView = () => {
  const { decks } = React.useContext(mtgContext);
  const [open, setOpen] = useState(false);
  const [pulledData, setPulledData] = useState({});

  const [currCard, setCurrCard] = useState({
    name: "",
    id: "",
    set_name: "",
    image: "",
    rarity: "",
    mana_cost: "None",
    type_line: "",
    color_identity: "",
    artist: "",
    standard_legal: "",
    set: "",
    legacy_legal: "",
    modern_legal: "",
    vintage_legal: "",
    commander_legal: "",
    oracle_id: "",
    priceUSD: null,
    priceUSDFoil: null,
    priceTIX: null,
    tcgplayerLink: "",
    gathererLink: "",
    edhrecLink: "",
    scryfallLink: "",
    oracleText: "",
    flavorText: "",
    releaseDate: "",
    reprint: false,
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
        setPulledData(data);
        setCurrCard({
          name: data.name,
          id: data.id,
          set_name: data.set_name,
          image: Object.keys(data).includes("image_uris")
            ? data.image_uris.normal
            : data.card_faces.map(card => { return (card.image_uris.normal) }),
          rarity: data.rarity[0].toUpperCase() + data.rarity.slice(1),
          mana_cost: Object.keys(data).includes("card_faces") ? data.card_faces[0].mana_cost : data.mana_cost,
          type_line: data.type_line,
          color_identity: data.color_identity,
          artist: data.artist,
          oracle_id: data.oracle_id,
          set: data.set,
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
          oracleText: Object.keys(data).includes("card_faces")
            ? [data.card_faces[0].oracle_text, data.card_faces[1].oracle_text]
            : [data.oracle_text],
          flavorText: Object.keys(data).includes("card_faces")
            ? [data.card_faces[0].flavor_text, data.card_faces[1].flavor_text]
            : [data.flavor_text],
          releaseDate: data.released_at,
          reprint: data.reprint,
        });
      })
      .catch((err) => {
        console.log(err)
        // alert(
        //   `${err}: Unable to locate card with id:\n${params.id}\n\nReturning to main page...`
        // );
        // navigate("/");
      });
  }, [params.id]);

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

      <h1 class=" text-4xl mt-3 font-extrabold leading-none tracking-tight text-white-900 md:text-5xl lg:text-6xl ">{currCard.name}</h1>

      <div className="flex justify-center mt-10">
        <div className={Array.isArray(currCard.image) ? "grid grid-cols-3 gap-2" : "grid grid-cols-3 gap-2"}>
          {currCard.image !== "" ? (
            <>
              {console.log(currCard)}

              {/*GRID-COL-1 Default card view (Back side for flip cards) */}
              <div className="img-col p-1">
                {Array.isArray(currCard.image)
                  ? <><div onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
                    Hover to see backside of card:
                    <img
                      className="rounded-3xl transition-all duration-300 cursor-pointer filter hover:grayscale object-position: center"
                      src={open ? currCard.image[1] : currCard.image[0]}
                      alt={currCard.name}
                    />
                  </div>
                  </>
                  : <img
                    className="rounded-3xl transition-all duration-300 cursor-pointer filter hover:grayscale object-position: center"
                    src={currCard.image}
                    alt={currCard.name}
                  />}
              </div>

              {/* GRID-COL-2 Card Details */}
              <div className="detail-col px-4 py-2 rounded-md shadow-xl">
                <CardIncrementer
                  data={pulledData}
                  deckListDropdownOption={true}
                  deckSet={decks[0].name}
                />

                <Tabs.Group
                  aria-label="Pills"
                  style="pills"
                  className="border-orange-600"
                >
                  <Tabs.Item title="Info" >

                    <div className="card-details mt-2">
                      <table className="auto">
                        <tbody>
                          <tr>
                            <th>Card Name:</th>
                            <td>{currCard.name}</td>
                          </tr>
                          <tr>
                            <th>Set:</th>
                            <td><ul className="list-inside"><li><button onClick={() => navigate(`/AdvResults/1/q=e:${currCard.set}`)}>{currCard.set_name}</button></li></ul></td>
                          </tr>
                          <tr>
                            <th>Rarity:</th>
                            <td>{currCard.rarity}</td>
                          </tr>
                          <tr>
                            <th>CMC:</th>
                            {currCard.mana_cost === '' ? <td>None</td> : <td>{currCard.mana_cost}</td>}
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
                            <td><ul className="list-inside"><li><button onClick={() => navigate(`/AdvResults/1/q=a:"${currCard.artist}"`)}>{currCard.artist}</button></li></ul></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Tabs.Item>

                  <Tabs.Item title="Legalities">
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
                  </Tabs.Item>
                  <Tabs.Item title="Prices">
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
                  </Tabs.Item>
                  <Tabs.Item title="Links">
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
                        <li>
                          <button onClick={() => navigate(`/AdvResults/1/q=!${currCard.name}&unique=art`)}>Alternate Arts</button>
                        </li>
                      </ul>
                    </div>
                  </Tabs.Item>
                  <Tabs.Item title="Oracle Text">

                    {Array.isArray(currCard.image) ? <><h3>Front: </h3><br /></> : <></>}

                    <th>Oracle Text: </th>
                    {currCard.oracleText[0] === undefined ? <><td>None</td><br/></> : <><td>{currCard.oracleText[0]}</td><br /></>}
                    <th>Flavor Text:</th>
                    {currCard.flavorText[0] === undefined ? <td>None</td> : <td style={{ fontStyle: "italic" }}>{currCard.flavorText[0]}</td>}

                    {Array.isArray(currCard.image) ?
                      <>
                        <br /><h3>Back:</h3><br />
                        <th>Oracle Text: </th>
                        {currCard.oracleText[1] === undefined ? <><td>None</td><br/></> : <><td>{currCard.oracleText[1]}</td><br /></>}
                        <th>Flavor Text:</th>
                        {currCard.flavorText[1] === undefined ? <td>None</td> : <td style={{ fontStyle: "italic" }}>{currCard.flavorText[1]}</td>}

                      </>

                      : <></>}

                  </Tabs.Item>
                </Tabs.Group>


              </div>


              {/* COL 3 TIMELINE */}
              {cardRulings.data ?
                <div>
                  <div className="timeline">

                    <Timeline>
                      <Timeline.Item>

                        <Timeline.Content>
                          <Timeline.Point />
                          <Timeline.Time>
                            {currCard.releaseDate}
                          </Timeline.Time>
                          {currCard.reprint ?
                            <Timeline.Body className="text-white">
                              {currCard.name} released in {currCard.set_name} ({currCard.set.toUpperCase()}).
                            </Timeline.Body>
                            :
                            <Timeline.Body className="text-white">
                              {currCard.name} reprinted in {currCard.set_name} ({currCard.set.toUpperCase()}).
                            </Timeline.Body>
                          }

                          {cardRulings.data.map(ruling =>
                            <>
                              <Timeline.Point />
                              <Timeline.Time>
                                {ruling.published_at} Ruling:
                              </Timeline.Time>

                              <Timeline.Body className="text-white">
                                {ruling.comment}
                              </Timeline.Body>
                            </>
                          )}
                        </Timeline.Content>
                      </Timeline.Item>
                    </Timeline></div></div> : <TextLoading />
              }
            </>
          ) : (
            <>
              {/* Card Image loading */}
              <CardLoading />

              {/* Text box loading... */}
              <div>
                <TextLoading />
                <TextLoading />
                <TextLoading />
              </div>
            </>
          )}
        </div>
      </div>

    </>
  );
};

export default DetailView;
