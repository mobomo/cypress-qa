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

When(`I navigate/go to {string}`, (route) => {
  navigateToURLorPath(route);
});

Given(`I am on/at {string}`, (route) => {
  navigateToURLorPath(route);
});
