/**
 * @module misc
 * @file
 * This file manages typical drupal-specific patterns as step definitions.
 */
import { Given, When, And } from 'cypress-cucumber-preprocessor/steps';
import Drupal from '../../pages/drupal';

When(/^I am on the login screen"$/, () => {
  Drupal.visit('/user')
});

/**
 * Enter Test Credentials
 *
 * @description
 * This step definition will enter the username and password into fields labeled
 * "Username" and "Password", the credentials which correspond to environment variables:
 *
 * `CYPRESS_DRUPAL_USER` and `CYPRESS_DRUPAL_PASS`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @returns {Promise<*>} - Result
 */
const enterTestCredentials = () => {
  let username = Cypress.env("DRUPAL_USER");
  let password = Cypress.env("DRUPAL_PASS");

  cy.getWithAlias('label').contains('Username').then( (el) => {
    cy.getWithAlias('#' + el.attr('for')).type(username);
  })
  cy.getWithAlias('label').contains('Password').then( (el) => {
    cy.getWithAlias('#' + el.attr('for')).type(password, {log: false});
  })
}

/**
 * @step
 *
 * @When I enter test credentials
 *
 * @summary
 * This step definition will enter secret credentials specified as environment variables
 *
 * @group Drupal
 * @see {@link enterTestCredentials}
 */
When(/^I enter test credentials$/, () => {
  enterTestCredentials();
});

/**
 * @step
 *
 * @When I log in with username <code>username</code> and password <code>password</code>
 *
 * @param {string} username The username to log in with
 * @param {string} password The password to log in with
 *
 * @summary
 * This step definition will login with `username` and `password` credentials
 *
 * @group Drupal
 * @see {@link Drupal.login}
 */
When(/^I log in with username "(.*)" and password "(.*)"$/, (username, password) => {
  Drupal.login(username, password);
});

/**
 * Verify User Profile Path
 *
 * @description
 * This step definition will verify that our current path is `/user/<id>`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @returns {Promise<*>} - Result
 */
const verifyUserProfilePath = () => {
  cy.url().then((data) => {
    let url = data.split('/');
    expect(url[url.length - 2]).to.equal('user');
    expect(parseInt(url[url.length - 1])).to.be.a('number');
  });
}

/**
 * @step
 *
 * @When I should be on the user profile path
 *
 * @summary
 * This step definition will verify that our current path is `/user/<id>`
 *
 * @group Drupal
 * @see {@link verifyUserProfilePath}
 */
When(/^I should be on the user profile path$/, () => {
  verifyUserProfilePath();
});

/**
 * Wait For Ajax
 *
 * @description
 * This step definition will wait for the ajax throbber to get removed from the DOM
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @returns {Promise<*>} - Result
 */
const waitForAjax = () => {
  cy.get('.ajax-progress-throbber').should('not.exist');
};

/**
 * @step
 *
 * @When I wait for AJAX to complete
 *
 * @summary
 * This step definition will wait for the ajax throbber to get removed from the DOM
 *
 * @group Drupal
 * @see {@link waitForAjax}
 */
When(/^I wait for AJAX to complete$/, () => {
  waitForAjax();
});

/**
 * Fill Drupal DateTime Field
 *
 * @description
 * This step definition will fill a Drupal DateTime field with `time`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} label The label associated with the element
 * @param {string} time The time formatted `dd M yyyy hh:mm`
 *
 * @returns {Promise<*>} - Result
 */
const setDateTimeLabeledField = (label, time) => {

  let dateTime;
  if (time === 'now') {
    dateTime = new Date();
  }
  else {
    dateTime = new Date(time);
  }

  Number.prototype.pad = function(size) {
    let s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }

  let dateString = dateTime.getFullYear() + '-' + ('0' + (dateTime.getMonth() + 1)).slice(-2) + '-' + ('0' + dateTime.getDate()).slice(-2);
  let timeString = ('0' + dateTime.getHours()).slice(-2) + ':' + ('0' + dateTime.getMinutes()).slice(-2) + ':00';

  console.log(dateString);

  cy.getWithAlias('.fieldset-legend').contains(label).then( (el) => {
    let fieldset = el.parents('fieldset');
    fieldset.find('input[type="date"]').val(dateString);
    fieldset.find('input[type="time"]').val(timeString);
  })
};

/**
 * @step
 *
 * @When I fill out datetime field <code>label</code> with <code>datetime</code>
 *
 * @param {string} label The label associated with the element
 * @param {string} datetime The Drupal DateTime formatted `dd M yyyy hh:mm`
 *
 * @summary
 * This step definition will fill out a Drupal DateTime field
 *
 * @group Form filling - Date and time
 * @see {@link setDateTimeLabeledField}
 *
 * @example
 * When I fill out datetime field "Begin Date" with "now"
 *
 * @example
 * When I fill out datetime field "End Date" with "01 Jan 2025 20:10"
 */
When(/^I fill out datetime field "([^"]*)" with "([^"]*)"$/, (label, datetime) => {
  setDateTimeLabeledField(label, datetime);
});