import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetailView.css";
import "../App.css";

import { mtgContext } from "../App.js";
import CardIncrementer from "../common/CardIncrementer";
import { Tabs, Table, Carousel } from "flowbite-react";

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
                className="relative mx-auto rounded-3xl max-w-sm transition-all duration-300 cursor-pointer filter hover:grayscale"
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
                style="underline"
                className="mx-auto flex"
                ref={tabsRef}
                onActiveTabChange={(tab) => setActiveTab(tab)}
              >
                <Tabs.Item active title="Info">
                  <div className="mt-2">
                    <Table className="max-w-200">
                      <Table.Body className="divide-y bg-[#393939]">
                        <Table.Row >
                          <Table.HeadCell>Card Name:</Table.HeadCell>
                          <Table.Cell>{currCard.name}</Table.Cell>
                        </Table.Row>
                        <Table.Row >
                          <Table.HeadCell>Set:</Table.HeadCell>
                          <Table.Cell>{currCard.set_name}</Table.Cell>
                        </Table.Row>
                        <Table.Row >
                          <Table.HeadCell>Rarity:</Table.HeadCell>
                          <Table.Cell>{currCard.rarity}</Table.Cell>
                        </Table.Row>
                        <Table.Row >
                          <Table.HeadCell>Mana Cost:</Table.HeadCell>
                          <Table.Cell>{currCard.mana_cost}</Table.Cell>
                        </Table.Row>
                        <Table.Row >
                          <Table.HeadCell>Card Type:</Table.HeadCell>
                          <Table.Cell>{currCard.type_line}</Table.Cell>
                        </Table.Row>
                        <Table.Row >
                          <Table.HeadCell>Colors:</Table.HeadCell>
                          <Table.Cell>
                            {currCard.color_identity.length === 0
                              ? (currCard.color_identity = "None")
                              : currCard.color_identity}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row >
                          <Table.HeadCell>Artist:</Table.HeadCell>
                          <Table.Cell>{currCard.artist}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </div>
                </Tabs.Item>
                <Tabs.Item title="Legalities">
                  <div className="card-details mt-2">
                    <Table className="max-w-lg whitespace-wrap">
                      <Table.Body className="divide-y bg-[#393939]">
                        <Table.Row >
                          <Table.HeadCell>Standard:</Table.HeadCell>
                          <Table.Cell>
                            {currCard.standard_legal === "legal"
                              ? "\u2705"
                              : "\u274C"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row >
                          <Table.HeadCell>Modern:</Table.HeadCell>
                          <Table.Cell>
                            {currCard.modern_legal === "legal"
                              ? "\u2705"
                              : "\u274C"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row >
                          <Table.HeadCell>Legacy:</Table.HeadCell>
                          <Table.Cell>
                            {currCard.legacy_legal === "legal"
                              ? "\u2705"
                              : "\u274C"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row >
                          <Table.HeadCell>Vintage:</Table.HeadCell>
                          <Table.Cell>
                            {currCard.vintage_legal === "legal"
                              ? "\u2705"
                              : "\u274C"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row >
                          <Table.HeadCell>Commander:</Table.HeadCell>
                          <Table.Cell>
                            {currCard.commander_legal === "legal"
                              ? "\u2705"
                              : "\u274C"}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </div>
                </Tabs.Item>
                <Tabs.Item title="Prices">
                  <div className="card-details mt-2">
                    <Table className="max-w-lg whitespace-wrap">
                      <Table.Body className="divide-y bg-[#393939]">
                        <Table.Row >
                          <Table.HeadCell>USD:</Table.HeadCell>
                          <Table.Cell>
                            {currCard.priceUSD
                              ? `$${currCard.priceUSD}`
                              : "No price available"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row >
                          <Table.HeadCell>USD Foil:</Table.HeadCell>
                          <Table.Cell>
                            {currCard.priceUSDFoil
                              ? `$${currCard.priceUSDFoil}`
                              : "No price available"}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row >
                          <Table.HeadCell>TIX:</Table.HeadCell>
                          <Table.Cell>
                            {currCard.priceTIX
                              ? `$${currCard.priceTIX}`
                              : "No price available"}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </div>
                </Tabs.Item>
                <Tabs.Item title="External Links">
                  <div className="card-details mt-2">
                    <ul className="list-inside">
                      {currCard.tcgplayerLink ? (
                        <li>
                          <a href={currCard.tcgplayerLink} target="_blank">
                            Purchase at TCG Player
                          </a>
                        </li>
                      ) : (
                        <></>
                      )}
                      {currCard.gathererLink ? (
                        <li>
                          <a href={currCard.gathererLink} target="_blank">View in Gatherer</a>
                        </li>
                      ) : (
                        <></>
                      )}
                      <li>
                        <a href={currCard.scryfallLink} target="_blank">View in Scryfall</a>
                      </li>
                      <li>
                        <a href={currCard.edhrecLink} target="_blank">Read about at EDHREC</a>
                      </li>
                    </ul>
                  </div>
                </Tabs.Item>
                <Tabs.Item title="Oracle Text">
                  <div className="card-details mt-2">
                    <Table>
                      <Table.Body className="divide-y bg-[#393939]">
                        <Table.Row >
                          <Table.HeadCell>Oracle:</Table.HeadCell>
                          <Table.Cell>{currCard.oracleText}</Table.Cell>
                        </Table.Row>
                        <Table.Row >
                          <Table.HeadCell>Flavor:</Table.HeadCell>
                          <Table.Cell className="max-w-100 mx-auto">
                            {currCard.flavorText}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </div>
                </Tabs.Item>
              </Tabs.Group>
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner" />
      )}

      {cardRulings.data ? (
        <div className="h-42 textColor sm:h-70 xl:h-32 2xl:h-40  m-4">
          <Carousel
          className="bg-[#393939]"
          arrow
            slideInterval={6000}
          >
            {cardRulings.data.map((ruling, index) => (

                <div key={index} className="text-center h-full ">
                  <h5 className="w-100 underline textColor inline-block text-2xl m-auto text-center font-bold tracking-tight text-orange-500 ">
                    Rulings {index + 1} of {cardRulings.data.length}. Dated:{" "}
                    {ruling.published_at}
                  </h5>
                  <br />
                  <p className="w-100 textColor inline-block text-2xl m-auto text-center font-bold tracking-tight text-white pl-12 pr-12">
                    {ruling.comment}
                  </p>
                </div>
     
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="spinner" />
      )}
    </>
  );
};

export default DetailView;
