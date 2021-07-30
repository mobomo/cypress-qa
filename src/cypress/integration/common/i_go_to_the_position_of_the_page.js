import { When } from 'cypress-cucumber-preprocessor/steps';

When(/^I (go|scroll) to the top of the page$/, () => {
  cy.scrollTo('top');
});

When(/^I (go|scroll) to the bottom of the page$/, () => {
  cy.scrollTo('bottom');
});
