/**
 * @module thens
 * @file
 * This file manages typical element visibility checks as step definitions.
 */

import Browser from "../../pages/browser";
import {When} from "cypress-cucumber-preprocessor/steps";

/**
 * Verify form visibility
 *
 * @description
 * This step definition will verify that a form is visible, triggering a failure if not
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector of the `form` html element on which to operate
 * @param {boolean} visible [true] Should text be visible or invisible
 *
 * @returns {Promise<*>} - Result
 */
const shouldSeeForm = (selector, visible = true) => {
    if (visible) {
        cy.get('form').get(selector).as('form').should('be.usable');
    }
    else {
        cy.get('form').get(selector).as('form').should('not.be.usable');
    }
}

/**
 * @step
 *
 * @Then I should see the form <code>selector</code>
 * @stepalias I should not see the form <code>selector</code>
 *
 * @param {string} selector The CSS selector on which to operate
 *
 * @summary
 * This step definition will verify that a form is visible, triggering a failure if not
 *
 * @group Context
 * @provides @form
 * @see {@link shouldSeeForm}
 *
 * @example
 * // Passes if the form is visible, fails if not
 * Then I should see the form `.form-selector`
 */
Then(/^I should (|not )see the form "([^"]*)"$/, (visible, element) => {
    shouldSeeForm(element, visible.length === 0);
});

/**
 * Verify Text Visibility
 *
 * @description
 * This step definition will verify that some text is visible, triggering a failure if not
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} text Some text within the document
 * @param {boolean} visible [true] Should text be visible or invisible
 *
 * @returns {Promise<*>} - Result
 */
const shouldSeeText = (text, visible = true) => {
    if (visible) {
        cy.containsWithAlias(text).should('be.visible');
    }
    else {
        cy.containsWithAlias(text).should('not.be.visible');
    }
};

/**
 * @step
 *
 * @Then I should see the text <code>text</code>
 * @stepalias I should not see the text <code>text</code>
 *
 * @param {string} text The text to determine is visible
 *
 * @summary
 * This step definition will verify that `text` is visible, triggering a failure if not
 *
 * @group Visibility
 * @see {@link shouldSeeText}
 *
 * @example
 * // Passes if the document has an element with `text` and it is visible, fails if not
 * Then I should see the text "text"
 * Then I should see text "text"
 * Then I should see "text"
 *
 * @example
 * // Passes if the document has an element with `text` and it is not visible or does not exist, fails otherwise
 * Then I should not see the text "text"
 * Then I should not see text "text"
 * Then I should not see "text"
 */
Then(/^I should (|not )see (?:|text |the text )"([^"]*)"$/, (visible, text) => {
    shouldSeeText(text, visible.length === 0)
});

// /**
//  * Verify Iframe Text Visibility
//  *
//  * @description
//  * This step definition will verify that some text inside of an iframe is visible, triggering a failure if not
//  *
//  * @summary
//  * - Then I should (|not) see (|text |the text) `text` in `iframe`
//  *
//  * @version 1.0.0
//  * @since 1.0.0
//  *
//  * @param {string} text Some text within the iframe
//  * @param {string} iframe [@iframe] The CSS selector of the iframe on which to operate
//  * @param {boolean} visible [true] Boolean denoting whether to check for visibility or presence
//  *
//  * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
//  *
//  * @example
//  * // Passes if an element with "text" inside the iframe is visible, fails if not
//  * Then I should see the text "text" in iframe
//  * Then I should see text "text" in iframe
//  * Then I should see "text" in iframe
//  *
//  * @example
//  * // Passes if an element with "text" inside the iframe is exists and is visible, fails if not
//  * Then I should see the text "text" in iframe
//  * Then I should see text "text" in iframe
//  * Then I should see "text" in iframe
//  *
//  * @returns {Promise<*>} - Result
//  */
// const shouldSeeTextIframe = (text, iframe='@iframe', visible = true) => {
//     cy.getWithAlias(iframe).withinIframe(`:contains('${text}'):visible:last`, (el) => {
//         // Already checks visibility
//         // el.should('be.visible');
//     });
// };
//
// Then(/^I should (|not )see (?:|text |the text )"([^"]*)" in iframe$/, (visible, text) => {
//     shouldSeeTextIframe(text, '@iframe', visible.length === 0);
// });

/**
 * Verify Element Visibility
 *
 * @description
 * This step definition will verify that an element visible, triggering a failure if not
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {boolean} visible [true] Boolean denoting whether to check for visibility or presence
 *
 * @returns {Promise<*>} - Result
 */
const shouldSeeElement = (selector, visible = true) => {
    if (visible) {
        cy.getWithAlias(selector).should('be.usable');
    }
    else {
        cy.getWithAlias(selector).should('not.be.usable');
    }
}

/**
 * @step
 *
 * @Then I should see the element <code>selector</code>
 * @stepalias I should not see the element <code>selector</code>
 *
 * @param {string} selector The CSS selector on which to operate
 *
 * @summary
 * This step definition will verify that the element referenced by `selector` is visible, triggering a failure if not
 *
 * @group Visibility
 * @see {@link shouldSeeElement}
 *
 * @example
 * // Passes if the document contains a visible element matching `.element-selector`
 * Then I should see the element ".element-selector"
 * Then I should see element ".element-selector"
 *
 * @example
 * // Passes if the document does not contain an element matching `.element-selector` or it is not visible
 * Then I should not see the element ".element-selector"
 * Then I should not see element ".element-selector"
 */
Then(/^I should (|not )see (?:|an |the )element "([^"]*)"$/, (visible, selector) => {
    shouldSeeElement(selector, visible.length === 0);
});

// /**
//  * Verify Iframe Element Visibility
//  *
//  * @description
//  * This step definition will verify that an element visible within an iframe, triggering a failure if not
//  *
//  * @summary
//  * - Then I should see the element `.element-selector` in iframe
//  *
//  * @version 1.0.0
//  * @since 1.0.0
//  *
//  * @param {string} selector The CSS selector on which to operate
//  * @param {string} iframe [@iframe] The CSS selector of the iframe on which to operate
//  * @param {boolean} visible [true] Boolean denoting whether to check for visibility or presence
//  *
//  * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
//  *
//  * @example
//  * // Passes if the iframe contains a visible element matching `.element-selector`
//  * Then I should see the element ".element-selector" in iframe
//  *
//  * @example
//  * // Passes if the iframe does not contain a visible element matching `.element-selector`
//  * Then I should not see the element ".element-selector" in iframe
//  *
//  * @returns {Promise<*>} - Result
//  */
// const shouldSeeElementIframe = (selector, iframe = '@iframe', visible = true) => {
//     if (visible) {
//         cy.getWithAlias(iframe).withinIframe(selector, (el) => {
//             el.should('be.usable');
//         });
//     }
//     else {
//         cy.getWithAlias(iframe).withinIframe(selector, (el) => {
//             el.should('not.be.usable');
//         });
//     }
// };
//
// Then(/^I should (|not )see the element "([^"]*)" in iframe$/, (visible, selector) => {
//     shouldSeeElementIframe(selector, '@iframe', visible.length === 0)
// });

/**
 * Verify Element Has Text
 *
 * @description
 * This step definition will verify that an element has text
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {string} text The text to match
 * @param {boolean} visible [true] Boolean denoting whether to check for visibility or presence
 *
 * @returns {Promise<*>} - Result
 */
const shouldSeeElementText = (selector, text, visible = true) => {
    if (visible) {
        cy.getWithAlias(selector).contains(text).should('be.usable');
    }
    else {
        cy.getWithAlias(selector).contains(text).should('not.be.usable');
    }
};

/**
 * @step
 *
 * @Then I should see the element <code>selector</code> with text <code>text</code>
 * @stepalias I should not see the element <code>selector</code> with text <code>text</code>
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {string} text The text to determine is visible
 *
 * @summary
 * This step definition will verify that the element referenced by `selector` which contains the text `text` is visible
 *
 * @group Visibility
 * @see {@link shouldSeeElementText}
 *
 * @example
 * // Passes if the an `.element-selector` contains the text `text`
 * Then I should see an element ".element-selector" with text "text"
 * Then I should see the element ".element-selector" with text "text"
 * Then I should see element ".element-selector" with text "text"
 * Then I should see an element ".element-selector" with "text"
 * Then I should see the element ".element-selector" with "text"
 * Then I should see element ".element-selector" with "text"
 *
 * @example
 * // Passes if the an `.element-selector` does not contain the text `text`
 * Then I should not see an element ".element-selector" with text "text"
 * Then I should not see the element ".element-selector" with text "text"
 * Then I should not see element ".element-selector" with text "text"
 * Then I should not see an element ".element-selector" with "text"
 * Then I should not see the element ".element-selector" with "text"
 * Then I should not see element ".element-selector" with "text"
 */
Then(/^I should (|not )see (?:|an |the )element "([^"]*)" with (?:|text )"([^"]*)"$/, (visible, selector, text) => {
    shouldSeeElementText(selector, text, visible.length === 0 );
});


/**
 * Verify Button Has Text
 *
 * @description
 * This step definition will verify that a button has text
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} text The text to match
 * @param {boolean} visible [true] Boolean denoting whether to check for visibility or presence
 *
 * @returns {Promise<*>} - Result
 */
const shouldSeeButton = (text, visible) => {
    if (visible) {
        cy.getWithAlias('a, input[type="submit"], button').contains(text).should('be.visible');
    }
    else {
        cy.getWithAlias('a, input[type="submit"], button').contains(text).should('not.be.visible');
    }
}

/**
 * @step
 *
 * @Then I should see the <code>text</code> button
 * @stepalias I should not see the <code>text</code> button
 *
 * @param {string} text The text to determine is visible
 *
 * @summary
 * This step definition will verify that a button with the text `text` is visible.
 *
 * @group Visibility
 * @see {@link shouldSeeButton}
 *
 * @example
 * Then I should see the "Remove" button
 */
When(/^I should (|not )see (?:|the )"([^"]*)" button$/, (visible, text) => {
    shouldSeeButton(text, visible.length === 0);
});

/**
 * Verify Link Has Text
 *
 * @description
 * This step definition will verify that a link has text
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} text The text to match
 * @param {boolean} visible [true] Boolean denoting whether to check for visibility or presence
 *
 * @returns {Promise<*>} - Result
 */
const shouldSeeLink = (text, visible) => {
    if (visible) {
        cy.getWithAlias('a').contains(text).should('be.visible');
    }
    else {
        cy.getWithAlias('a').contains(text).should('not.be.visible');
    }
}

/**
 * @step
 *
 * @Then I should see the <code>text</code> link
 * @stepalias I should not see the <code>text</code> link
 *
 * @param {string} text The text to determine is visible
 *
 * @summary
 * This step definition will verify that a link with the text `text` is visible.
 *
 * @group Visibility
 * @see {@link shouldSeeLink}
 */
When(/^I should (|not )see (?:|the )"([^"]*)" link$/, (visible, text) => {
    shouldSeeLink(text, visible.length === 0);
});

/**
* Verify Element Has Text
*
* @description
* This step definition will take in a DataTable and verify that an element has text
*
* @summary
* - Then I should see (an|the) element ".element-selector" with [text] "text"
*   | selector  | text      |
*   | ...     | ...  |
*
* @version 1.0.0
* @since 1.0.0
*
* @param {DataTable} dataTable The Cucumber DataTable given by Gherkin keyed with columns 'selector' and 'text'
* @param {boolean} visible [true] Boolean denoting whether to check for visibility or presence
*
* @example
* // Passes if there are elements matching the passed datatable element selector and text
* I should see elements with below text
*   | selector  | text      |
*   | label     | Username  |
*   | label     | Password  |
*
* @example
* // Passes if there are not elements matching the passed datatable element selector and text or they are not visible
* I should see not elements with below text
*   | selector  | text      |
*   | label     | Username  |
*   | label     | Password  |
*
* @returns {Promise<*>} - Result
*/
const shouldSeeElementTextInTable = (dataTable, visible = true) => {
    dataTable.hashes().forEach((row) => {
        shouldSeeElementText(row.selector, row.text, visible);
    });
}

/**
 * @step
 *
 * @Then I should see elements with below text
 * @stepalias I should not see elements with below text
 *
 * @param {DataTable} dataTable A gherkin data table with columns headed `selector` and `text`
 *
 * @summary
 * This step definition will verify that multiple elements in `dataTable` are visible.
 *
 * @group Visibility
 * @see {@link shouldSeeElementTextInTable}
 *
 * @example
 * Then I should see elements with below text
 *   | selector  | text     |
 *   | label     | Username |
 *   | label     | Password |
 *
 * @example
 * Then I should not see elements with below text
 *   | selector  | text     |
 *   | label     | Username |
 *   | label     | Password |
 */
Then(/^I should (|not )see elements with below text$/, (visible, dataTable) => {
    shouldSeeElementTextInTable(dataTable, visible.length === 0)
});

/**
 * Verify Element in Iframe Has Text
 *
 * @description
 * This step definition will verify that an element in an iframe has text
 *
 * @summary
 * - Then I should see [the] iframe `.element-selector`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {boolean} visible [true] Boolean denoting whether to check for visibility or presence
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 *
 * @example
 * // Passes if the an `.element-selector` contains the text `text`
 * Then I should see the iframe ".element-selector"
 * Then I should see iframe ".element-selector"
 *
 * @example
 * // Passes if the an `.element-selector` does not contain the text `text`
 * Then I should not see the iframe ".element-selector"
 * Then I should not see iframe ".element-selector"
 *
 * @returns {Promise<*>} - Result
 */
const shouldSeeIframe = (selector, visible = true) => {
    if (visible) {
        cy.get('iframe').get(selector).as('iframe').should('be.visible');
    }
    else {
        cy.get('iframe').get(selector).as('iframe').should('not.be.visible');
    }
}

/**
 * @step
 *
 * @Then I should see the iframe <code>selector</code>
 * @stepalias I should not see the iframe <code>selector</code>
 *
 * @param {string} selector The CSS selector on which to operate
 *
 * @summary
 * This step definition will verify that an iframe referenced by `selector` is visible, and set the `@iframe` context.
 *
 * @group Context
 * @provides @iframe
 * @see {@link shouldSeeIframe}
 */
Then(/^I should (|not )see (?:|the )iframe "([^"]*)"$/, (visible, selector) => {
    shouldSeeIframe(selector, visible.length === 0);
});

// Form handling
