import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import Homepage from '../../../pages/prac/homepage';
import Report from '../../../pages/prac/report';

Given(/^I am on the Report$/, () => {
    Report.visit();
});

Given(/^I am on the Homepage$/, () => {
    Homepage.visit();
});