# Arcanum

Arcanum is a Magic: the Gathering website that utilizes the Scryfall API and React to provide a seamless deck building and card searching application at your fingertips.

To install fork this scaffold repository in Github and clone it locally onto your machine.

Once cloned:
* open this repo with VSCode
* run `npm install` to install all necessary dependencies
* run `npm start` to start up the application
* Navigate to localhost:3000/ in your local browser and behold!


## The Home Page

The home page showcases many of the features that can be found throughout Arcanum.

- Front and center is the Random Card of the Moment.  Clicking this card (and every other card in Arcanum) will display additional details and statistics it.
- Next is the navbar, which helpfully lists all of the major components of the application each of which are explained in further detail below.
- As well, the navbar features a search bar capable of finding any Magic: the Gathering card from name. Simply type in the name and press the enter key or click the search button.
- If you enjoy the Random Card of the Moment and want another you can press the random card link in the navbar to go to a random card's summary page.
- Finally, the footer provides many useful links to the Magic community that are definitely worth checking out.  Some of these include the Official Magic: the Gathering website, a learn to play guide, and detailed documentation for the Scryfall API which was used to develop this application.

## The Card Detail Page
The card details page displays many useful statistics and tools for your specified card.  This information is presented in various tabs that can be clicked through.  As well, this screen provides an option to add or remove the selected card from your deck.

### These tabs include:
* Info: The card's specific set, rarity, CMC, Types, Color,etc...
* Legalities: What tournament formats that the card is legal.
* Prices: The current price in USD or TIX from the last 24 hours
* External links: For purchasing the card online or viewing popular deck strategies.

### Adding and removing cards to your deck:
* Before adding or removing cards, ensure your deck is selected in the MyDeck dropdown box.
* Following this, press the hammer icons to add or remove cards from your selected deck.
* The total number will automatically update to show you how many are in the deck.

## The My Deck Page
This page showcases a curated selection of top decks.  As well, it supports a robust import/export feature for adding and viewing your own decks.

### To import
 1. Press import
 1. Select file to import
 1. Click open to confirm selection
 1. Have fun!

### To export
 1. Select deck to export from dropdown menu
 1. Press export
 1. Select location for save file
 1. Click save to confirm selection
 1. Be sure to come back!

## The Tutorial Page
Under construction!

## The Advanced Search Page
When the regular search bar won't cut it, the advanced search will help you find your perfect card!

### Search and Sort Results by:
* Name
* Converted Mana Cost
* Inner Card Text
* Color
* Card Type
* Rarity
* Artist

## Contributors
 - Joseph Hartsfield
 - Jacob Steward
 - David Bonilla (The Destroyer)
 - Kyle Hackett
 - Michael Blumberg
 - Jason Martin

