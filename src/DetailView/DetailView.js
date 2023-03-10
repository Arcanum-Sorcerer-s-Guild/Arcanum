import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetailView.css";
import "../App.css";

import { mtgContext } from "../App.js";
import CardIncrementer from "../common/CardIncrementer";
import { Tabs, Card } from "flowbite-react";

const DetailView = () => {
  const { decks, setDecks } = React.useContext(mtgContext);

  const [pulledData, setPulledData] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef(null);

  const [currCard, setCurrCard] = useState({
    name: "",
    id: "",
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
    flavorText: "",
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
            : data.card_faces[0].image_uris.normal,
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
          flavorText: data.flavor_text,
        });
      })
      .catch((err) => {
        alert(
          `${err}: Unable to locate card with id:\n${params.id}\n\nReturning to main page...`
        );
        navigate("/");
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
      {currCard.image !== "" ? (
        <div className="relative flex justify-center mt-20">
          <div className="relative grid grid-cols-2 gap-5">
            <div className="img-col p-1">
              <img
                className="relative rounded-3xl max-w-sm transition-all duration-300 cursor-pointer filter hover:grayscale"
                src={currCard.image}
                alt={currCard.name}
              />
            </div>
            <div className="detail-col px-5 py-2 rounded-md">
              <CardIncrementer
                data={pulledData}
                deckListDropdownOption={true}
                deckSet={decks[0].name}
              />

              <Tabs.Group
                aria-label="Default tabs"
                style="default"
                ref={tabsRef}
                onActiveTabChange={(tab) => setActiveTab(tab)}
              >
                <Tabs.Item active title="Info">
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
                <Tabs.Item title="External Links">
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
                </Tabs.Item>
                <Tabs.Item title="Oracle Text">
                  <p>{currCard.oracleText}</p>

                  <p style={{ fontStyle: "italic" }}>{currCard.flavorText}</p>
                </Tabs.Item>
              </Tabs.Group>
            </div>

            {cardRulings.data ? (
              <>
                <div className="w-250 gap-2 col-span-4">
                  {cardRulings.data.length === 0 ? "" : <h3>Rulings</h3>}
                </div>
                <div className="grid grid-cols-4 align-top p-6 gap-4 flex w-250 gap-2 col-span-3">
                  {cardRulings.data.map((ruling, index) => (
                    <Card>
                      <h5 className=" textColor inline-block text-2xl m-auto text-center font-bold tracking-tight text-orange-500">
                        {ruling.published_at}
                      </h5>
                      <p className=" textColor inline-blockfont-normal text-justify text-gray-700 dark:text-orange-500 b-40 ">
                        {ruling.comment}
                      </p>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="spinner" />
            )}
          </div>
        </div>
      ) : (
        <div className="spinner" />
      )}
    </>
  );
};

export default DetailView;
