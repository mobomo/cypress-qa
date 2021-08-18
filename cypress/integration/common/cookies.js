/**
 * @module misc
 * @file
 * This file manages cookie management as step definitions.
 */
import Browser from "../../pages/browser";

/**
 * @step
 *
 * @Then I preserve cookies
 *
 * @summary
 * This step definition will preserve cookies for the next scenario.
 * Must be done every scenario for long multi-test features.
 *
 * @group Browser
 * @see {@link Browser.preserveCookies}
 */
Then(/^I preserve cookies$/, (id, value) => {
    Browser.preserveCookies();
});

/**
 * @step
 *
 * @Then I clear cookies
 *
 * @summary
 * This step definition will clear cookies
 *
 * @group Browser
 * @see {@link Browser.clearCookies}
 */
Then(/^I clear cookies$/, (id, value) => {
    Browser.clearCookies();
});