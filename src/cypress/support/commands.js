// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('withinIframe', { prevSubject: 'element' }, (element, selector, callback = () => {}) => {
    return cy
        .wrap(element)
        .should(iframe => expect(iframe.contents().find(selector)).to.exist)
        .then(iframe => {
            callback(cy.wrap(iframe.contents().find(selector)))
        });
});

Cypress.Commands.add('getIframeBody', (frame) => {
  return cy
  .get('iframe[id="' + frame + '"]')
    .its('0.contentDocument.body').should('exist').should('not.be.empty')
  // wraps "body" DOM element to allow
  // chaining more Cypress commands, like ".find(...)"
  // https://on.cypress.io/wrap
  .then(cy.wrap)
});
