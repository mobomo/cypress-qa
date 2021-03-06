/**
 * @module whens
 * @file
 * This file manages typical scrolling patterns	as step definitions.
 */
import { When } from 'cypress-cucumber-preprocessor/steps';

/**
 * Scroll Into View by CSS Selector
 *
 * @description
 * This step definition will scroll the viewport window
 * until the provided selector is visible on the page.
 *
 * @summary
 * - When I scroll to `selector`
 * - When I scroll the `selector` element into view
 * - When I scroll to the `selector` element
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
 * // Scrolls the `#main-content` element into view
 * When I scroll to "#main-content"
 *
 * @example
 * // Scrolls the `#main-footer` element into view
 * When I scroll the "#main-footer" element into view
 *
 * @example
 * // Scrolls the `#main-header` element into view
 * When I scroll to the "#main-header" element
 *
 * @returns {Promise<*>} - Result
 */
const scrollSelectorIntoView = (selector) => {
  cy.getOrContains(selector).should('be.visible').scrollIntoView();
}

/**
 * @step
 *
 * @When I scroll to <code>selector</code>
 *
 * @param {string} selector The CSS selector on which to operate
 *
 * @stepalias I scroll to the <code>selector</code> element
 * @stepalias I scroll the <code>selector</code> element into view
 *
 * @summary
 * This step definition will scroll the viewport window
 * until the provided selector is visible on the page.
 *
 * @group Scrolling
 * @see {@link scrollSelectorIntoView}
 */
When(/^I scroll(?:\sto)?(?:\sthe)? "([^"]*)"(?:\selement\sinto\sview)?/, (selector) => {
  scrollSelectorIntoView(selector);
});

/**
 * Scroll to the top or bottom of CSS Selector
 *
 * @description
 * This step definition will scroll the given element until the
 * element's bottom or top is visible on the page.
 *
 * @summary
 * - When I scroll to `(top|bottom)` of `selector`
 * - When I scroll the `(top|bottom)` of `selector` into view
 *
 * This step definition passes `ensureScrollable: false` as an
 * option to the `.scrollTo()` function. It is possible that passing
 * this step an element that cannot be scrolled will result in a
 * false positive.

 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {PositionType} positionType One of: `topLeft` | `top` | `topRight` | `left` | `center` | `right` | `bottomLeft` | `bottom` | `bottomRight`
 * @param {string} selector The CSS selector on which to operate
 *
 * @example
 * // Scrolls to the top of `.scrollable-selector`
 * When I scroll to the top of ".scrollable-selector"
 *
 * @example
 * // Scrolls to the bottom of `.scrollable-selector`
 * When I scroll to the bottom of ".scrollable-selector"
 *
 * @example
 * // Scrolls to the top of `.scrollable-selector`
 * When I scroll the top of ".scrollable-selector" into view
 *
 * @example
 * // Scrolls to the bottom of `.scrollable-selector`
 * When I scroll the bottom of ".scrollable-selector" into view
 *
 * @returns {Promise<*>} - Result
 */
const scrollToSelectorTopOrBottom = (positionType, selector) => {
  cy.get(selector).should('exist').scrollTo(positionType, {ensureScrollable: false});
}

/**
 * @step
 *
 * @When I scroll to the <code>position</code> of <code>selector</code>
 * @stepalias I scroll the <code>position</code> of <code>selector</code> into view
 *
 * @param {string} position One of: `topLeft` | `top` | `topRight` | `left` | `center` | `right` | `bottomLeft` | `bottom` | `bottomRight`
 * @param {string} selector The CSS selector on which to operate
 *
 * @summary
 * This step definition will verify that a form is visible, triggering a failure if not
 *
 * @group Scrolling
 * @see {@link scrollToSelectorTopOrBottom}
 */
When(/^I scroll(?:\sthe)?(?:\sto)?(?:\sthe) (topLeft|top|topRight|left|center|right|bottomLeft|bottom|bottomRight) of "([^"]*)"(?:\sinto)?(?:\sview)?/, (position, selector) => {
  scrollToSelectorTopOrBottom(position, selector);
});