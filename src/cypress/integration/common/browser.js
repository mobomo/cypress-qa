import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import Homepage from '../../pages/prac/homepage';
import Report from '../../pages/prac/report';
import Browser from '../../pages/browser';

Given(/^I am on the path "(.*)"$/, (url) => {
  Browser.visit(url)
});

When(/^I click the "(.*)" link$/, (word) => {
  Browser.clickLink(word);
});

When(/^I click on "(.*)"$/, (word) => {
  Browser.click(word);
});

When(/^I scroll lt"(.*)" into view$/, (word) => {
  Browser.scrollTo(word);
});

When(/^I wait (\d+) seconds$/, (seconds) => {
  Browser.wait(seconds);
});

Then(/^I should see the text "(.*)"$/, (word) => {
  Browser.textIsVisible(word);
});

Then(/^I should see the element "(.*)"$/, (word) => {
  Browser.elementIsVisible(word);
});

Then(/^I should see an element "(.*)" with text "(.*)"$/, (element, text) => {
  Browser.elementWithTextIsVisible(element, text);
});

Then(/^I should see elements with below labels$/, (dataTable) => {

  dataTable.hashes().forEach((row) => {
    Browser.elementWithTextIsVisible(row.element, row.label_text);
  });
});

Then(/^I should see the form "(.*)"$/, (formid) => {
  cy.get('#' + formid).as('form').should('be.visible');
});

When(/^I fill out text fields with values$/, (dataTable) => {
  dataTable.hashes().forEach((row) => {
    cy.get('#' + row.id).type(row.value);
  });
});

When(/^I fill out "(.*)" field with value "(.*)"$/, (id, value) => {
  cy.get('#' + id).type(value);
});

When(/^I submit the form$/, (id, value) => {
  cy.get('@form').submit();
});