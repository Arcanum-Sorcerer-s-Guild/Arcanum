import React from "react";
import { Footer } from "flowbite-react";

const FooterBar = () => {
  return (
    <div className="main-footer">
      <Footer container={true} className="absolute mt-4" style={{backgroundColor: '#393939'}}>
        <Footer.Copyright href="#" by="Arcanum All Rights Reserved" year={2023} />
        <Footer.LinkGroup>
          <Footer.Link href="https://magic.wizards.com/en" target="_blank">
            Official Magic Website
          </Footer.Link>
          <Footer.Link
            href="https://www.mtgo.com/en/mtgo/decklists"
            target="_blank"
            >
            Magic Online Decklists
          </Footer.Link>
          <Footer.Link
            href="https://magic.wizards.com/en/how-to-play"
            target="_blank"
            >
            How to play
          </Footer.Link>
          <Footer.Link href="https://scryfall.com/docs/api" target="_blank">
            Scryfall API
          </Footer.Link>
          <Footer.Link
            href="https://gatherer.wizards.com/Pages/Default.aspx"
            target="_blank"
            >
            Gatherer
          </Footer.Link>
          <Footer.Link href="https://www.tcgplayer.com/" target="_blank">
            TCG Player
          </Footer.Link>
          <Footer.Link href="https://edhrec.com/" target="_blank">
            EDHREC
          </Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
};

export default FooterBar;