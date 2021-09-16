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
Given(`I am on/at {string}`, (uri) => {
  if (uri === 'the homepage') {
    navigateToURLorPath('/');
  }
  else {
    navigateToURLorPath(uri);
  }
});

/**
 * Verify Path
 *
 * @description
 * This step definition will verify that our current path is `uri`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} path The URI we expect to be on
 *
 * @returns {Promise<*>} - Result
 */
const verifyPath = (path) => {
  cy.url().then((url) => {
    let parts = url.split('/');
    parts.splice(0, 3);
    let newPath = '/' + parts.join('/');

    expect(newPath).to.equal(path);
  });
}

/**
 * @step
 *
 * @When I should be on <code>path</code>
 * @stepalias I should be at <code>path</code>
 *
 * @summary
 * This step definition will verify that our current path is `path`
 *
 * @example
 * I should be on "/node/add/basic_page"
 *
 * @group Drupal
 * @see {@link verifyUserProfilePath}
 */
When(`I should be on/at {string}`, (path) => {
  verifyPath(path);
});

/**
 * Verify Path
 *
 * @description
 * This step definition will verify that our current path is `uri`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} uri The URI we expect to be on
 *
 *  * @example
 * I should be on "/node/add/basic_page"
 *
 * @returns {Promise<*>} - Result
 */
const verifyUri = (uri) => {
  cy.url().then((url) => {
    expect(url).to.equal(uri);
  });
}

/**
 * @step
 *
 * @When I should be on <code>uri</code>
 * @stepalias I should be at <code>uri</code>
 *
 * @summary
 * This step definition will verify that our current URI is `uri`
 *
 * @example
 * I should be on "https://example.com/node/add/basic_page"
 *
 * @group Drupal
 * @see {@link verifyUserProfilePath}
 */
When(`I should be on/at the URL {string}`, (uri) => {
  verifyUri(uri);
});