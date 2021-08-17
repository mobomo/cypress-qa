/**
 * @module misc
 * @file
 * This file manages typical drupal-specific patterns as step definitions.
 */
import { Given, When, And } from 'cypress-cucumber-preprocessor/steps';
import Drupal from '../../pages/drupal';

When(/^I am on the login screen"$/, () => {
  Drupal.visit('/')
});


When(/^I enter test credentials$/, () => {

  let username = Cypress.env("DRUPAL_USER");
  let password = Cypress.env("DRUPAL_PASS");

  cy.getWithAlias('label').contains('Username').then( (el) => {
    cy.getWithAlias('#' + el.attr('for')).type(username);
  })
  cy.getWithAlias('label').contains('Password').then( (el) => {
    cy.getWithAlias('#' + el.attr('for')).type(password, {log: false});
  })
});

When(/^I log in with username "(.*)" and password "(.*)"$/, (username, password) => {
  Drupal.login(username, password);
});

When(/^I should be on the user profile path$/, () => {
  cy.url().then((data) => {
    let url = data.split('/');
    expect(url[url.length - 2]).to.equal('user');
    expect(parseInt(url[url.length - 1])).to.be.a('number');
  });
});

When(/^I wait for AJAX to complete$/, () => {
  cy.get('.ajax-progress-throbber').should('not.exist');
});

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

When(/^I fill out datetime field "([^"]*)" with "([^"]*)"$/, (label, time) => {
  setDateTimeLabeledField(label, time);
});