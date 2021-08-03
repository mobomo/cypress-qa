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
