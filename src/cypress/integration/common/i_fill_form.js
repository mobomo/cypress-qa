/**
 * @module whens
 * @file
 * This file manages typical form and field filling patterns as step definitions.
 */
import { When } from 'cypress-cucumber-preprocessor/steps';

/**
 * Fill File Field Upload
 *
 * @description
 * This step definition will fill a file field with a file.
 *
 * @summary
 * - When I fill in the `.input-selector` field with file `fixture/path.ext` of type `mime/type`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} fileName Path to the file inside of the `fixtures` folder
 * @param {string} fileType The MIME type of the file
 * @param {string} selector The selector of the file field element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 *
 * @example
 * // Fills in the `.input-selector` input element with the file located at the `fixture/path.ext` path with the MIME type `mime/type`
 * When I fill in the ".input-selector" field with file "fixture/path.ext" of type "mime/type"
 *
 * @returns {Promise<*>} - Result
 */
const uploadFile = (fileName, fileType = '', selector) => {
    cy.get(selector).then(subject => {
        cy.fixture(fileName, 'base64')
            .then(Cypress.Blob.base64StringToBlob)
            .then(blob => {
                const el = subject[0]
                const testFile = new File([blob], fileName, {type: fileType})
                const dataTransfer = new DataTransfer()
                dataTransfer.items.add(testFile)
                el.files = dataTransfer.files
            });
        cy.wrap(subject).trigger('change');
    })
}

When(/^I fill in the "([^"].*)" field with file "([^"].*)" of type "([^"].*)"$/, (element, fixture, type) => {
    uploadFile(fixture, type, element)
});

/**
 * Fill File Field Upload In Iframe
 *
 * @description
 * This step definition will fill a file field inside of an iframe with a file.
 *
 * @summary
 * - When I fill in the `.input-selector` field with file `fixture/path.ext` of type `mime/type` in iframe
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} fileName Path to the file inside of the `fixtures` folder
 * @param {string} fileType The MIME type of the file
 * @param {string} selector The selector of the iframe
 * @param {string} elementSelector [@frame] The selector of the file field element within the iframe
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 *
 * @example
 * // Fills in the `.input-selector` input element inside of an iframe with the file located at the `fixture/path.ext` path with the MIME type `mime/type`
 * When I fill in the ".input-selector" field with file "fixture/path.ext" of type "mime/type" in iframe
 *
 * @returns {Promise<*>} - Result
 */
const uploadFileInIframe = (fileName, fileType = '', selector='@iframe', elementSelector) => {
    cy.get(selector).withinIframe(elementSelector, (el) => {
        el.then(subject => {
            cy.fixture(fileName, 'base64')
                .then(Cypress.Blob.base64StringToBlob)
                .then(blob => {
                    const el = subject[0]
                    const testFile = new File([blob], fileName, {type: fileType})
                    const dataTransfer = new DataTransfer()
                    dataTransfer.items.add(testFile)
                    el.files = dataTransfer.files
                });
            cy.wrap(subject).trigger('change');
        })
    });
}

When(/^I fill in the "([^"].*)" field with file "([^"].*)" of type "([^"].*)" in iframe$/, (element, fixture, type) => {
    uploadFileInIframe(fixture, type, '@iframe', element)
});

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

When(/^I fill out the field labeled "([^"].*)" with value "([^"].*)" in iframe$/, (label, value) => {
    cy.get('@iframe').withinIframe('body', (el) => {
        el.contains(label).then((element) => {
            cy.get('@iframe').withinIframe('#' + element.attr('for'), (el) => {
                el.type(value);
            });
        })
    });
});

