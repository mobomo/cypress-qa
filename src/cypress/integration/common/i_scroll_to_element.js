/**
 * @module whens
 * @file
 * This file manages typical scrolling patterns	as step definitions.
 */
import { When } from 'cypress-cucumber-preprocessor/steps';

/**
 * Scroll Into View by CSS Selector
 * @description This step definition will scroll the viewport window until the provided selector is visible on the page.
 *
 * It should be noted that a built-in step definition with a
 * similar syntax exists to scroll into view by providing a
 * text value, `When I scroll "My text" into view`.

 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 *
 * @example
 * // Scrolls the #main-content element into view
 * When I scroll to "#main-content"
 * @example
 * // Scrolls the #main-footer element into view
 * When I scroll to the "#main-footer" into view
 * @example
 * // Scrolls the #main-header element into view
 * When I scroll to the "#main-header" element
 * @returns {Promise<*>} - Result
 */
const scrollSelectorIntoView = (selector) => {
  cy.get(selector).scrollIntoView();
}

When(/^I scroll(?:\sto)?(?:\sthe)? "([^"].*)"(?:\selement\sinto\sview)?/, (selector) => {
  scrollSelectorIntoView(selector);
});

/**
 * Scroll to the top or bottom of CSS Selector
 *
 * @description
 * This step definition will scroll the given element until the
 * element's bottom or top is visible on the page.
 *
 * This step definition passes `ensureScrollable: false` as an
 * option to the `.scrollTo()` function. It is possible that passing
 * this step an element that cannot be scrolled will result in a
 * false positive.

 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} position One of: `top`, `bottom`
 * @param {string} selector The CSS selector on which to operate
 *
 * @example
 * // Scrolls to the top of `.scrollable-selector`
 * When I scroll to the top of ".scrollable-selector"
 * @example
 * // Scrolls to the bottom of `.scrollable-selector`
 * When I scroll to the bottom of ".scrollable-selector"
 * @example
 * // Scrolls to the top of `.scrollable-selector`
 * When I scroll the top of ".scrollable-selector" into view
 * @example
 * // Scrolls to the bottom of `.scrollable-selector`
 * When I scroll the bottom of ".scrollable-selector" into view
 */
const scrollToSelectorTopOrBottom = (position, selector) => {
  cy.get(selector).scrollTo('bottom', {ensureScrollable: false});
}


When(/^I scroll(?:\sthe)?(?:\sto)?(?:\sthe) (top|bottom) of "([^"].*)"(?:\sinto)?(?:\sview)?/, (position, selector) => {
  scrollToSelectorTopOrBottom(position, selector);
});
