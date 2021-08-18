/**
 * @module misc
 * @file
 * This file manages miscellaneous browser patterns as step definitions.
 */
import { Given, When } from 'cypress-cucumber-preprocessor/steps';

/**
 * @step
 *
 * @Then I wait <code>seconds</code> seconds
 *
 * @param {string} seconds The number of seconds to wait
 *
 * @summary
 * This step definition will wait for `seconds` seconds
 *
 * @group Browser
 */
When(/^I wait (\d+) seconds$/, (seconds) => {
  cy.wait(seconds * 1000);
});
