import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import GoogleSearchPage from '../../../pages/google/google-search-page';
import GoogleResultsPage from '../../../pages/google/google-results-page';

Given(/^I'm at Google$/, () => {
  GoogleSearchPage.visit();
});

When(/^I type search word 'github'$/, () => {
  GoogleSearchPage.type('github');
});

When(/^Press 'Search'$/, () => {
  GoogleSearchPage.pressSearch();
});

Then(/^I have some results$/, () => {
  GoogleResultsPage.expect().toHaveResults();
});