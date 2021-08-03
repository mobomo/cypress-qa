/**
 * @module misc
 * @file
 * This file manages cookie management as step definitions.
 */
import Browser from "../../pages/browser";

Then(/^I preserve cookies$/, (id, value) => {
    Browser.preserveCookies();
});

Then(/^I clear cookies$/, (id, value) => {
    Browser.clearCookies();
});