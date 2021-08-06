/**
 * @module thens
 * @file
 * This file manages typical element visibility checks as step definitions.
 */

import Browser from "../../pages/browser";

/**
 * Verify form visibility
 *
 * @description
 * This step definition will verify that a form is visible, triggering a failure if not
 *
 * @summary
 * - Then I should see the form `selector`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector of the `form` html element on which to operate
 * @param {boolean} visible [true] Should text be visible or invisible
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 *
 * @example
 * // Passes if the form is visible, fails if not
 * Then I should see the form `.form-selector`
 *
 * @returns {Promise<*>} - Result
 */
const shouldSeeForm = (selector, visible = true) => {
    if (visible) {
        cy.getWithAlias('form').get(selector).as('form').should('be.usable');
    }
    else {
        cy.getWithAlias('form').get(selector).as('form').should('not.be.usable');
    }
}

Then(/^I should (|not )see the form "([^"]*)"$/, (visible, element) => {
    shouldSeeForm(element, visible.length === 0);
});

/**
 * Verify Text Visibility
 *
 * @description
 * This step definition will verify that some text is visible, triggering a failure if not
 *
 * @summary
 * - Then I should see `text`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} text Some text within the document
 * @param {boolean} visible [true] Should text be visible or invisible
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
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

Then(/^I should (|not )see (?:|text |the text )"([^"]*)"$/, (visible, text) => {
    shouldSeeText(text, visible.length === 0)
});

/**
 * Verify Iframe Text Visibility
 *
 * @description
 * This step definition will verify that some text inside of an iframe is visible, triggering a failure if not
 *
 * @summary
 * - Then I should (|not) see (|text |the text) `text` in `iframe`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} text Some text within the iframe
 * @param {string} iframe [@iframe] The CSS selector of the iframe on which to operate
 * @param {boolean} visible [true] Boolean denoting whether to check for visibility or presence
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 *
 * @example
 * // Passes if an element with "text" inside the iframe is visible, fails if not
 * Then I should see the text "text" in iframe
 * Then I should see text "text" in iframe
 * Then I should see "text" in iframe
 *
 * @example
 * // Passes if an element with "text" inside the iframe is exists and is visible, fails if not
 * Then I should see the text "text" in iframe
 * Then I should see text "text" in iframe
 * Then I should see "text" in iframe
 *
 * @returns {Promise<*>} - Result
 */
const shouldSeeTextIframe = (text, iframe='@iframe', visible = true) => {
    cy.getWithAlias(iframe).withinIframe(`:contains('${text}'):visible:last`, (el) => {
        // Already checks visibility
        // el.should('be.visible');
    });
};

Then(/^I should (|not )see (?:|text |the text )"([^"]*)" in iframe$/, (visible, text) => {
    shouldSeeTextIframe(text, '@iframe', visible.length === 0);
});

/**
 * Verify Element Visibility
 *
 * @description
 * This step definition will verify that an element visible, triggering a failure if not
 *
 * @summary
 * - Then I should (|not) see (|element |the element) `.element-selector`
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
 * // Passes if the document contains a visible element matching `.element-selector`
 * Then I should see the element ".element-selector"
 * Then I should see element ".element-selector"
 *
 * @example
 * // Passes if the document does not contain an element matching `.element-selector` or it is not visible
 * Then I should not see the element ".element-selector"
 * Then I should not see element ".element-selector"
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
Then(/^I should (|not )see (?:|an |the )element "([^"]*)"$/, (visible, selector) => {
    shouldSeeElement(selector, visible.length === 0);
});

/**
 * Verify Iframe Element Visibility
 *
 * @description
 * This step definition will verify that an element visible within an iframe, triggering a failure if not
 *
 * @summary
 * - Then I should see the element `.element-selector` in iframe
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {string} iframe [@iframe] The CSS selector of the iframe on which to operate
 * @param {boolean} visible [true] Boolean denoting whether to check for visibility or presence
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 *
 * @example
 * // Passes if the iframe contains a visible element matching `.element-selector`
 * Then I should see the element ".element-selector" in iframe
 *
 * @example
 * // Passes if the iframe does not contain a visible element matching `.element-selector`
 * Then I should not see the element ".element-selector" in iframe
 *
 * @returns {Promise<*>} - Result
 */
const shouldSeeElementIframe = (selector, iframe = '@iframe', visible = true) => {
    if (visible) {
        cy.getWithAlias(iframe).withinIframe('#edit-inline-entity-form-name-0-value', (el) => {
            el.should('be.usable');
        });
    }
    else {
        cy.getWithAlias(iframe).withinIframe('#edit-inline-entity-form-name-0-value', (el) => {
            el.should('not.be.usable');
        });
    }
};

Then(/^I should (|not )see the element "([^"]*)" in iframe$/, (visible, selector) => {
    shouldSeeElementIframe(selector, '@iframe', visible.length === 0)
});

/**
 * Verify Element Has Text
 *
 * @description
 * This step definition will verify that an element has text
 *
 * @summary
 * - Then I should see (an|the) element ".element-selector" with [text] "text"
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {string} text The text to match
 * @param {boolean} visible [true] Boolean denoting whether to check for visibility or presence
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

Then(/^I should (|not )see (?:|an |the )element "([^"]*)" with (?:|text )"([^"]*)"$/, (visible, selector, text) => {
    shouldSeeElementText(selector, text, visible.length === 0 );
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
 * @param {string} text The text to match
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
 *
 * @returns {Promise<*>} - Result
 */
const shouldSeeIframe = (selector, visible = true) => {
    if (visible) {
        cy.getWithAlias('iframe').get(selector).as('iframe').should('be.visible');
    }
    else {
        cy.getWithAlias('iframe').get(selector).as('iframe').should('not.be.visible');
    }
}

Then(/^I should (|not )see (?:|the )iframe "([^"]*)"$/, (visible, selector) => {
    shouldSeeIframe(selector, visible.length === 0);
});

// Form handling
