/**
 * @module whens
 * @file
 * This file manages typical scrolling patterns	as step definitions.
 */
import { When } from 'cypress-cucumber-preprocessor/steps';

/**
 * Navigate to a URL or Path
 *
 * @description
 * Navigates to a provided URL or Path
 *
 * @summary
 *  - When I `(navigate|go)` to `route`
 *  - Given I am `(on|at)` `route`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} route The URL or Path to navigate the browser to
 *
 * @example
 * // Navigates to a route called `/user`
 * When I navigate to "/user"
 * When I go to "/user"
 *
 * @example
 * // Sets scenario start point to `https://mobomo.com`
 * Given I am on "https://mobomo.com"
 *
 * @returns {Promise<*>} - Result
 */

const navigateToURLorPath = (route) => {
  cy.visit(route);
}

/**
 * @step
 *
 * @When I go to <code>uri</code>
 * @stepalias I navigate to <code>uri</code>
 *
 * @param {string} uri The URI to navigate to
 *
 * @summary
 * This step definition will navigate the browser to `uri`
 *
 * @group Navigation
 * @see {@link navigateToURLorPath}
 */
When(`I navigate/go to {string}`, (route) => {
  navigateToURLorPath(route);
});

/**
 * @step
 *
 * @Given I am on <code>uri</code>
 * @stepalias I am at <code>uri</code>
 *
 * @param {string} uri The URI to navigate to
 *
 * @summary
 * This step definition will navigate the browser to `uri`
 *
 * @group Navigation
 * @see {@link navigateToURLorPath}
 */
Given(`I am on/at {string}`, (route) => {
  if (route === 'the homepage') {
    navigateToURLorPath('/');
  }
  else {
    navigateToURLorPath(route);
  }
});
