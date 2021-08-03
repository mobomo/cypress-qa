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

// Wrap the frame to allow chaining Cypress commands like .find().
Cypress.Commands.add('getIframeBody', (frame) => {
  return cy
  .get('iframe[id="' + frame + '"]')
    .its('0.contentDocument.body').should('exist').should('not.be.empty')
  .then(cy.wrap)
});

// Need to combine get() and contains() so we can match both selectors and text.
Cypress.Commands.add('getOrContains', ( selector) => {

    // I don't know why all the duplication is necessary, but it seems like it is.
    /** @todo cleanup */
    let list = cy.get(`${selector}, :contains('${selector}')`);
    list.eq(0, { log: false }).then(el => {
        // The first element will be html if we are matching against content (text)
        if (el.prop('tagName') === 'HTML') {
            // So instead, get the innermost element (last)
            list = cy.get(`${selector}, :contains('${selector}')`, { log: false }).last({ log: false });
        }
        else {
            // The first element will be our element if we are matching against a selector
            list = cy.wrap(el, { log: false });
        }
    });
    return list;
});