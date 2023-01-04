import '@testing-library/cypress/add-commands';
// import cy from 'cypress';

describe('App component', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should render a heading that says "Project 2" ', () => {
        cy.findByRole('heading').should('contain', 'Project 2');
    })
})