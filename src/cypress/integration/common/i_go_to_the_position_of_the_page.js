/**
 * @module whens
 * @file
 * This file manages typical window scrolling patterns as step definitions.
 */
import { When } from 'cypress-cucumber-preprocessor/steps';
/**
 * Scroll Into View by CSS Selector
 * @description
 * This step definition will scroll the viewport window to the top or
 * bottom of the page.
 *
 * @summary
 * - When I `(scroll|go)` to the `position` of the page
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} position One of: `top` or `bottom`. The vertical extreme of the viewport to be scrolled to.
 *
 * @example
 * // Scrolls to the top of the page.
 * When I scroll to the top of the page
 * When I go to the top of the page
 *
 * @example
 * // Scrolls to the bottom of the page
 * When I go to the bottom of the page
 * When I scroll to the bottom of the page
 *
 * @returns {Promise<*>} - Result
 */
const scrollPageExtremity = position => {
  cy.scrollTo(position);
}

When(/^I (?:go|scroll) to the (top|bottom) of the page$/, (position) => {
  scrollPageExtremity(position)
});
