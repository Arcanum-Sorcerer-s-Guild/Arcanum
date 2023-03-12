import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full border-t border-gray-500 shadow md:flex md:items-center md:justify-between dark:bg-gray-800 dark:border-gray-600">
      <span className="footer-links text-sm text-gray-300 sm:text-center dark:text-gray-400">© 2023 Arcanum AllRights Reserved.
      </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-300 dark:text-gray-400 sm:mt-0">
          <li>
            <a className="mr-4 hover:underline md:mr-6" href="https://magic.wizards.com/en">Official Magic Website</a>
          </li>
          <li>
            <a className="mr-4 hover:underline md:mr-6" href="https://www.mtgo.com/en/mtgo/decklists">Magic Online Decklists</a>
          </li>
          <li>
            <a className="mr-4 hover:underline md:mr-6" href="https://magic.wizards.com/en/how-to-play">How to play</a>
          </li>
          <li>
            <a className="mr-4 hover:underline md:mr-6" href="https://scryfall.com/">Scryfall</a>
          </li>
          <li>
            <a className="mr-4 hover:underline md:mr-6" href="https://scryfall.com/docs/api">Scryfall API</a>
          </li>
          <li>
            <a className="mr-4 hover:underline md:mr-6" href="https://gatherer.wizards.com/Pages/Default.aspx">Gatherer</a>
          </li>
          <li>
            <a className="mr-4 hover:underline md:mr-6" href="https://www.tcgplayer.com/">TCG Player</a>
          </li>
          <li>
            <a className="mr-4 hover:underline md:mr-6" href="https://edhrec.com/">EDHREC</a>
          </li>
        </ul>
    </footer>
  );
};

export default Footer;
