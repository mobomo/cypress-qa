import { Given, When, And } from 'cypress-cucumber-preprocessor/steps';
import Homepage from '../../pages/prac/homepage';
import Report from '../../pages/prac/report';
import Browser from '../../pages/browser';

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

