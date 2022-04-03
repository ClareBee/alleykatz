// cypress/integration/app.spec.ts

describe('App basics', () => {
  it('should launch on the home page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    cy.get('footer').contains('Footer');
  });
});
