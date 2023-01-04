# Project 2 Scaffold

We have created a basic scaffold for you to start working on right away.

Fork this scaffold repository in Github and clone it locally onto your machine. 

Once cloned: 
* open this repo with VSCode
* run `npm install` to install all necessary dependencies
* run `npm start` to start up the application 


We have already set up the project with *Cypress* and *React Testing Library*. 
We have also created some sample tests, so you can practice the Red-Green-Refactor strategy right away. 

## Cypress tests

To run the Cypress tests, you will need to enter `$ npx cypress open` in the command line within your project.  

The Cypress desktop interface will pop up. 

In the first screen select `E2E Testing`, in the second - select Chrome. This will open a testing browser.

In that testing browser, under `E2E Specs`, click on the `App.cy.js` file link.

The test should run automatically and fail with an error message:

> AssertionError: Timed out retrying after 4000ms: Unable to find an accessible element with the role "heading".

Next go into the file `src/App.js` and include an `<h1>` element with the content `Project 2` in the return of the App component.

Refresh the test. The test should now pass. 


## React Testing Library test

To run React Testing Library in this project, you just need to enter `$ npm run test` in the command line within the project.

If your Cypress test was passing, this RTL test should pass as well.

Go ahead and remove from your `src/App.js` file the code that looks similar to this: `<h1>Project 2</h1>`.

Now run `$ npm run test` in your command line again. 

Does the test fail? If it does, your RTL test is working. 

You can make it pass again by returning the heading back into the code. 


- - - 


> **_NOTE:_** You will not need these two particular tests for successfully completing Project 2 - they are only meant as examples of the setup for testing with Cypress and RTL. Once you have observed them, feel free to remove them along with the `<h1>Project 2</h1>` heading from your code.   
