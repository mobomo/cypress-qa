/**
 * @module thens
 * @file
 * This file manages context setting as step definitions.
 */
import {Then} from "cypress-cucumber-preprocessor/steps";

/**
 * Reset Context
 *
 * @description
 * This step definition will reset (erase) the @_context
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @returns {Promise<*>} - Result
 */
const resetContext = () => {
    cy.resetContext();
}

/**
 * Set Context
 *
 * @description
 * This step definition will set the @_context to `selector`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 *
 * @returns {Promise<*>} - Result
 */
const setContext = (selector) => {
    cy.resetContext().get(selector).as('_context');
}

/**
 * @step
 *
 * @Then I clear context
 * @stepalias I reset context
 *
 * @summary
 * This step definition will reset the `@_context` (overriding @form and @iframe)
 *
 * @group Context
 * @provides @_context
 * @see {@link resetContext}
 */
Then(/^I (clear|reset) context$/, () => {
    resetContext();
});

/**
 * @step
 *
 * @Then I set the context to <code>selector</code>
 *
 * @param {string} selector The CSS selector on which to operate
 *
 * @summary
 * This step definition will set the `@_context` to the element referenced by `selector` (overriding @form and @iframe)
 *
 * @group Context
 * @provides @_context
 * @see {@link resetContext}
 */
Then(/^I set context to "([^"]*)"$/, (selector) => {
    setContext(selector);
});
