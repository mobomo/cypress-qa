import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import Homepage from '../../pages/prac/homepage';
import Report from '../../pages/prac/report';
import Browser from '../../pages/browser';

Given(/^I am on the path "([^"].*)"$/, (url) => {
  Browser.visit(url)
});

When(/^I click the "([^"].*)" link$/, (word) => {
  Browser.clickLink(word);
});

When(/^I click the "([^"].*)" button$/, (element) => {
  Browser.clickButton(element);
});

When(/^I click the "([^"].*)" element$/, (element) => {
  Browser.clickElement(element);
});

When(/^I click on "([^"].*)"$/, (word) => {
  Browser.click(word);
});

When(/^I click on "([^"].*)" in iframe$/, (word) => {
  cy.get('@iframe').withinIframe('body', (el) => {
    el.contains(word).click();
  });
});

When(/^I scroll "([^"].*)" into view$/, (word) => {
  Browser.scrollTo(word);
});

When(/^I wait (\d+) seconds$/, (seconds) => {
  Browser.wait(seconds);
});

// Element visibility
Then(/^I should see the text "([^"].*)"$/, (word) => {
  Browser.textIsVisible(word);
});

Then(/^I should see the text "([^"].*)" in iframe$/, (word) => {
  cy.get('@iframe').withinIframe('body', (el) => {
    el.contains(word).should('be.visible');
  });
});

Then(/^I should see the element "([^"].*)"$/, (element) => {
  Browser.elementIsVisible(element);
});

Then(/^I should see the element "([^"].*)" in iframe$/, (element) => {
  cy.get('@iframe').withinIframe('#edit-inline-entity-form-name-0-value', (el) => {
    el.should('be.visible');
  });
});

Then(/^I should see an element "([^"].*)" with text "([^"].*)"$/, (element, text) => {
  Browser.elementWithTextIsVisible(element, text);
});

Then(/^I should see elements with below labels$/, (dataTable) => {

  dataTable.hashes().forEach((row) => {
    Browser.elementWithTextIsVisible(row.element, row.label_text);
  });
});

// Visibility with aliasing
Then(/^I should see the form "([^"].*)"$/, (element) => {
  cy.get('form').get(element).as('form').should('be.visible');
});

Then(/^I should see the iframe "([^"].*)"$/, (element) => {
  cy.get('iframe').get(element).as('iframe').should('be.visible');
});

// Form handling

When(/^I fill out text fields with values$/, (dataTable) => {
  dataTable.hashes().forEach((row) => {
    cy.get('#' + row.id).type(row.value);
  });
});

When(/^I fill out the field element "([^"].*)" with value "([^"].*)"$/, (element, value) => {
  cy.get(element).type(value);
});

When(/^I fill out the field labeled "([^"].*)" with value "([^"].*)"$/, (label, value) => {
  cy.get('label').contains(label).then( (el) => {
    cy.get('#' + el.attr('for')).type(value);
  })
});

When(/^I fill out the field labeled "([^"].*)" with value "([^"].*)" in iframe$/, (label, value) => {
  cy.get('@iframe').withinIframe('body', (el) => {
    el.contains(label).then((element) => {
      cy.get('@iframe').withinIframe('#' + element.attr('for'), (el) => {
        el.type(value);
      });
    })
  });
});

When(/^I submit the form$/, (id, value) => {
  // cy.intercept({
  //   headers: {
  //     'X-Requested-With': 'XMLHttpRequest'
  //   }
  // }).as('xhr');
  //
  // cy.wait('@xhr').catch((err) => {
  //   cy.log('No XHR request present');
  // });

  cy.get('@form').submit();
});

Then(/^I fill in the "([^"].*)" field with file "([^"].*)" of type "([^"].*)"$/, (element, fixture, type) => {
  Browser.uploadFile(fixture, type, element)
});

Then(/^I fill in the "([^"].*)" field with file "([^"].*)" of type "([^"].*)" in iframe$/, (element, fixture, type) => {
  Browser.uploadFileInIframe(fixture, type, '@iframe', element)
});

// cookies
Then(/^I preserve cookies$/, (id, value) => {
  Browser.preserveCookies();
});

Then(/^I clear cookies$/, (id, value) => {
  Browser.clearCookies();
});