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
    .wrap(element, { log: false })
    .should(iframe => expect(iframe.contents().find(selector)).to.exist)
    .then(iframe => {
      callback(cy.wrap(iframe.contents().find(selector), { log: false }))
    });
});

Cypress.Commands.add('getIframeBody', { prevSubject: 'element' }, (element, selector, callback = () => {}) => {
    return cy
        .wrap(element, { log: false })
        .should(iframe => expect(iframe.contents().find('body')).to.exist)
        .then(iframe => {
            cy.wrap(iframe.contents().find('body'))
        });
});

// Need to combine get() and contains() so we can match both selectors and text.
Cypress.Commands.add('getOrContains', ( selector) => {
    cy.get('body', { log: false }).then((body) => {
        let results = body.find(selector);
        if (results.length > 0) {
            cy.wrap(results);
        }
        else {
            results = body.find(`:contains('${selector}'):visible:last`);
            if (results.length > 0) {
                cy.wrap(results);
            }
            else {
                // Fall back to the standard contains()
                cy.contains(selector);
            }
        }
    });
});