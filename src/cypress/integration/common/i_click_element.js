/**
 * @module whens
 * @file
 * This file manages typical clicking patterns as step definitions.
 */
import {When} from "cypress-cucumber-preprocessor/steps";

When(/^I click (?:|on )the "([^"].*)" link$/, (text) => {
    cy.get('a').contains(text).click();
});

When(/^I click (?:|on )the "([^"].*)" button$/, (text) => {
    cy.get('a, input[type="submit"], button').filter(':visible').contains(text).click();
});

When(/^I click (?:|on )the "([^"].*)" element$/, (selector) => {
    cy.get(selector).click();
});

When(/^I click (?:|on )"([^"].*)"$/, (text) => {
    cy.contains(text).click();
});

When(/^I click on "([^"].*)" in iframe$/, (text) => {
    cy.get('@iframe').withinIframe('body', (el) => {
        el.contains(text).click();
    });
});