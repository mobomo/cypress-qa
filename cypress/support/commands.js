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

Cypress.Commands.add('getIframe', { prevSubject: 'element' }, (element) => {
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

// Aliases
// @see https://github.com/cypress-io/cypress/issues/8873
Cypress.Commands.add('getWithAlias', (selector, options) => {
    let aliases = cy.state('aliases');
    if (selector[0] === '@') {
        cy.get(selector, options)
    }
    else if (typeof aliases !== 'undefined' && typeof aliases['_context'] !== 'undefined') {
        // Assume all aliases are contextual
        let cx = '@_context';
        if (typeof aliases[aliases['_context']] !== 'undefined') {
            cx = '@' + aliases['_context'];
        }

        if (aliases['_context'] === 'iframe') {
            cy
                .get('@iframe')
                .should(iframe => expect(iframe.contents().find(selector)).to.exist)
                .then(iframe => {
                    cy.wrap(iframe.contents().find(selector))
                });
        }
        else {
            cy.get(cx).find(selector);
        }
    }
    else {
        cy.get(selector, options);
    }
});

Cypress.Commands.add('containsWithAlias', (text, options) => {
    let aliases = cy.state('aliases');
    if (typeof aliases !== 'undefined' && typeof aliases['_context'] !== 'undefined') {
        // Assume all aliases are contextual
        let cx = '@_context';
        if (typeof aliases[aliases['_context']] !== 'undefined') {
            cx = '@' + aliases['_context'];
        }

        if (aliases['_context'] === 'iframe') {
            cy
                .get('@iframe')
                .should(iframe => expect(iframe.contents().find(`:not(script,style):contains('${text}'):visible:last, [value~='${text}']`)).to.exist)
                .then(iframe => {
                    cy.wrap(iframe.contents().find(`:not(script,style):contains('${text}'):visible:last, [value~='${text}']`))
                });
        }
        else {
            cy.get(cx).contains(text);
        }
    }
    else {
        cy.contains(text, options);
    }
});

// Cypress.Commands.overwrite('get', (originalFn, selector, options) => {
//     let aliases = cy.state('aliases');
//
//     if (aliases !== undefined && aliases['_context'] !== undefined) {
//         // Assume all aliases are contextual
//         if (aliases[aliases['_context']] !== undefined) {
//             return originalFn('@' + aliases['_context']).get(selector, options);
//         }
//         else {
//             return originalFn('@_context').get(selector, options);
//         }
//     }
//     else {
//         return originalFn(selector, options);
//     }
// });

Cypress.Commands.overwrite('as', (originalFn, obj, alias) => {
    let aliases = cy.state('aliases');
    if (typeof aliases === 'undefined') {
        aliases = {};
    }
    aliases[alias] = obj;

    // Assume all aliases are contextual
    aliases['_context'] = alias;

    cy.state('aliases', aliases);

    return originalFn(obj, alias);
});

Cypress.Commands.add('resetContext', () => {
    let aliases = cy.state('aliases');
    aliases['_context'] = undefined;
    cy.state('aliases', aliases);
});