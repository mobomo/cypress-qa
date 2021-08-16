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
 * - When I click the `text` link
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} text The text inside of the link we want to click on
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 *
 * @example
 * // Clicks on a link with the text "Home"
 * When I click the "Home" link
 *
 * @returns {Promise<*>} - Result
 */
const clickLink = (text) => {
    cy.getWithAlias('a').should('be.visible').contains(text).click();
}

When(/^I (?:click|press) (?:|on )the "([^"]*)" link$/, (text) => {
    clickLink(text);
});

const clickButton = (text) => {
    cy.getWithAlias('a, input[type="submit"], button').should('be.visible').contains(text).click();
}

When(/^I (?:click|press) (?:|on )the "([^"]*)" button$/, (text) => {
    clickButton(text);
});

const clickElement = (selector) => {
    cy.getWithAlias(selector).should('be.visible').click();
}

When(/^I (?:click|press) (?:|on )the "([^"]*)" element$/, (selector) => {
    clickElement(selector)
})

const clickText = (text) => {
    if (text === 'Save image') {
        cy.containsWithAlias('Save image');
    }
    cy.containsWithAlias(text).should('be.visible').click();
}

When(/^I (?:click|press) (?:|on )"([^"]*)"$/, (something) => {
    clickText(something)
});

const clickLinkIframe = (text) => {
    cy.getWithAlias('@iframe').withinIframe('body', (el) => {
        el.get('a').should('be.visible').contains(text).click();
    });
}

When(/^I (?:click|press) (?:|on )the "([^"]*)" link in iframe$/, (text) => {
    clickLinkIframe(text);
});

const clickButtonIframe = (text) => {
    cy.getWithAlias('@iframe').withinIframe('body', (el) => {
        el.get('a, input[type="submit"], button').should('be.visible').contains(text).click();
    });
}

When(/^I (?:click|press) (?:|on )the "([^"]*)" button in iframe$/, (text) => {
    clickButtonIframe(text);
});

const clickElementIframe = (selector) => {
    cy.getWithAlias('@iframe').withinIframe('body', (el) => {
        cy.getWithAlias(selector).should('be.visible').click();
    });
}

When(/^I (?:click|press) (?:|on )the "([^"]*)" element in iframe$/, (selector) => {
    clickElementIframe(selector)
})

const clickTextIframe = (text) => {
    cy.getWithAlias('@iframe').withinIframe('body', (el) => {
        el.contains(text).should('be.visible').click();
    });
}

When(/^I (?:click|press) (?:|on )"([^"]*)" in iframe$/, (something) => {
    clickElementOrTextInIframe(something)
});

const clickElementOrTextInIframe = (something) => {
    cy.getWithAlias('@iframe').withinIframe('body', (el) => {
        el.contains(something).should('be.visible').click();
    });
};