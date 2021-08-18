/**
 * @module whens
 * @file
 * This file manages typical clicking patterns as step definitions.
 */
import {When} from "cypress-cucumber-preprocessor/steps";

/**
 * Clicks a Link
 *
 * @description
 * This step definition will click on an `a` tag containing the text provided
 *
 * @summary
 * - When I click on the `text` link
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} text The text inside of the link we want to click on
 *
 * @example
 * // Clicks on a link with the text "Home"
 * When I click on the "Home" link
 * When I press the "Home" link
 *
 * @returns {Promise<*>} - Result
 */
const clickLink = (text) => {
    cy.getWithAlias('a').should('be.visible').contains(text).click();
}

/**
 * @step
 *
 * @When I click on the <code>text</code> link
 * @stepalias I press the <code>text</code> link
 *
 * @param {string} text The text of the link (tag: `a`) to click on
 *
 * @summary
 * This step definition will click on a link with the text `text`
 *
 * @group Clicking
 * @see {@link clickLink}
 *
 * @example
 * When I click on the "View More" link
 * When I press the "Read More" link
 */
When(/^I (?:click|press) (?:|on )the "([^"]*)" link$/, (text) => {
    clickLink(text);
});

/**
 * Clicks a Button
 *
 * @description
 * This step definition will click on an `a`, `input[type="submit"]`, or `button` tag containing the text provided
 *
 * @summary
 * - When I click on the `text` button
 * - When I press the `text` button
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} text The text inside of the button we want to click on
 *
 * @example
 * // Clicks on a button with the text "Submit"
 * When I click on the "Submit" button
 * When I press the "Submit" button
 *
 * @returns {Promise<*>} - Result
 */
const clickButton = (text) => {
    cy.getWithAlias('a, input[type="submit"], button').should('be.visible').contains(text).click();
}

/**
 * @step
 *
 * @When I click on the <code>text</code> button
 * @stepalias I press the <code>text</code> button
 *
 * @param {string} text The text of the button (tags: `a`, `input[type="submit"]`, `button`) to click on
 *
 * @summary
 * This step definition will click on a button with the text `text`
 *
 * @group Clicking
 * @see {@link clickButton}
 *
 * @example
 * When I click on the "Save" button
 * When I press the "Remove" button
 */
When(/^I (?:click|press) (?:|on )the "([^"]*)" button$/, (text) => {
    clickButton(text);
});

/**
 * Clicks an Element
 *
 * @description
 * This step definition will click on an element matching the selector
 *
 * @summary
 * - When I click on the `selector` element
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 *
 * @example
 * // Clicks on any element matching ".selector"
 * When I click on the ".selector" element
 * When I press the ".selector" element
 *
 * @returns {Promise<*>} - Result
 */
const clickElement = (selector) => {
    cy.getWithAlias(selector).should('be.visible').click();
}

/**
 * @step
 *
 * @When I click on the <code>selector</code> element
 * @stepalias I press the <code>selector</code> element
 *
 * @param {string} selector The CSS selector on which to operate
 *
 * @summary
 * This step definition will click on the element matching `selector`
 *
 * @group Clicking
 * @see {@link clickElement}
 *
 * @example
 * When I click on the ".js-submit" element
 * When I press the ".js-submit" element
 */
When(/^I (?:click|press) (?:|on )the "([^"]*)" element$/, (selector) => {
    clickElement(selector)
})

/**
 * Clicks on Text
 *
 * @description
 * This step definition will click on any element with text
 *
 * @summary
 * - When I click the `selector` element
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} text The text contained in the element we want to click
 *
 * @example
 * // Clicks on any element with the text "text"
 * When I click on "text"
 * When I press "text"
 *
 * @returns {Promise<*>} - Result
 */
const clickText = (text) => {
    if (text === 'Save image') {
        cy.containsWithAlias('Save image');
    }
    cy.containsWithAlias(text).should('be.visible').click();
}

/**
 * @step
 *
 * @When I click on <code>text</code>
 * @stepalias I press <code>text</code>
 *
 * @param {string} text The text to click
 *
 * @summary
 * This step definition will click on any element with the text `text`
 *
 * @group Clicking
 * @see {@link clickText}
 *
 * @example
 * When I click on "Collapse"
 * When I press "View More"
 */
When(/^I (?:click|press) (?:|on )"([^"]*)"$/, (something) => {
    clickText(something)
});

//
// const clickLinkIframe = (text) => {
//     cy.getWithAlias('@iframe').withinIframe('body', (el) => {
//         el.get('a').should('be.visible').contains(text).click();
//     });
// }
//
// When(/^I (?:click|press) (?:|on )the "([^"]*)" link in iframe$/, (text) => {
//     clickLinkIframe(text);
// });
//
// const clickButtonIframe = (text) => {
//     cy.getWithAlias('@iframe').withinIframe('body', (el) => {
//         el.get('a, input[type="submit"], button').should('be.visible').contains(text).click();
//     });
// }
//
// When(/^I (?:click|press) (?:|on )the "([^"]*)" button in iframe$/, (text) => {
//     clickButtonIframe(text);
// });
//
// const clickElementIframe = (selector) => {
//     cy.getWithAlias('@iframe').withinIframe('body', (el) => {
//         cy.getWithAlias(selector).should('be.visible').click();
//     });
// }
//
// When(/^I (?:click|press) (?:|on )the "([^"]*)" element in iframe$/, (selector) => {
//     clickElementIframe(selector)
// })
//
// const clickTextIframe = (text) => {
//     cy.getWithAlias('@iframe').withinIframe('body', (el) => {
//         el.contains(text).should('be.visible').click();
//     });
// }
//
// When(/^I (?:click|press) (?:|on )"([^"]*)" in iframe$/, (something) => {
//     clickElementOrTextInIframe(something)
// });
//
// const clickElementOrTextInIframe = (something) => {
//     cy.getWithAlias('@iframe').withinIframe('body', (el) => {
//         el.contains(something).should('be.visible').click();
//     });
// };