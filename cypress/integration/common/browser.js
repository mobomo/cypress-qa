/**
 * @module misc
 * @file
 * This file manages miscellaneous browser patterns as step definitions.
 */
import { Given, When } from 'cypress-cucumber-preprocessor/steps';

When(/^I wait (\d+) seconds$/, (seconds) => {
  cy.wait(seconds * 1000);
});
