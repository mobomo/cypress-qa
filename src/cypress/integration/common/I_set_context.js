import {When} from "cypress-cucumber-preprocessor/steps";

When(/^I reset context$/, (text, label) => {
    cy.resetContext();
});

When(/^I set context to "([^"]*)"$/, (selector) => {
    cy.resetContext().get(selector).as('_context');
});

When(/^I am looking at vertical tab ""$/, (selector) => {
    cy.resetContext().get(selector).as('_context');
});
