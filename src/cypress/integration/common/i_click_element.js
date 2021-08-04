/**
 * @module whens
 * @file
 * This file manages typical clicking patterns as step definitions.
 */
import {When} from "cypress-cucumber-preprocessor/steps";

When(/^I click (?:|on )the "([^"]*)" link$/, (text) => {
    cy.get('a').should('be.visible').contains(text).click();
});

When(/^I click (?:|on )the "([^"]*)" button$/, (text) => {
    cy.get('a, input[type="submit"], button').should('be.visible').contains(text).click();
});

When(/^I click (?:|on )the "([^"]*)" element$/, (selector) => {
    cy.get(selector).should('be.visible').click();
});

When(/^I click (?:|on )"([^"]*)"$/, (text) => {
    cy.getOrContains(text).should('be.visible').click();
});

When(/^I click (?:|on )"([^"]*)" in iframe$/, (text) => {
    cy.get('@iframe').withinIframe('body', (el) => {
        el.contains(text).should('be.visible').click();
    });
});