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
 * Internal function to attach a file to an upload field jQuery element
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {JQuery<HTMLElement>} subject The jQuery wrapper of the input element
 * @param {string} fileName Path to the file inside of the `fixtures` folder
 * @param {string} fileType The MIME type of the file
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 *
 * @example
 * // Fills in the `subject` jQuery element with the file located at the `fixture/path.ext` path with the MIME type `mime/type`
 * changeFileField(subject, 'fixture/path.ext', 'mime/type')
 *
 * @returns {Promise<*>} - Result
 */
const changeFileField = (subject, fileName, fileType) => {
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
}

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
 * @param {string} selector The CSS selector of the file field
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
    cy.get('input[type="file"]').get(selector).then(subject => {
        changeFileField(subject, fileName, fileType)
    })
}

When(/^I fill in (?:|the) "([^"]*)"(?:| field) with file "([^"]*)" of type "([^"]*)"$/, (element, fixture, type) => {
    uploadFile(fixture, type, element)
});

When(/^I fill in (?:|the )field labeled "([^"]*)" with file "([^"]*)" of type "([^"]*)"$/, (label, fixture, type) => {
    cy.get('label').contains(label).then( (el) => {
        uploadFile( fixture, type, '#' + el.attr('for'))
    })
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
 * @param {string} selector The CSS selector of the iframe
 * @param {string} elementSelector [@frame] The CSS selector within the iframe on which to operate
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
            changeFileField(subject, fileName, fileType)
        })
    });
}

When(/^I fill in the "([^"]*)" field with file "([^"]*)" of type "([^"]*)" in iframe$/, (selector, fixture, type) => {
    uploadFileInIframe(fixture, type, '@iframe', selector)
});

/**
 * Fill File Field Upload By Label In Iframe
 *
 * @description
 * This step definition will fill a file field inside of an iframe with a file, referenced by a label
 *
 * @summary
 * - When I fill in field labeled `label` with file `fixture/path.ext` of type `mime/type` in iframe
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} fileName Path to the file inside of the `fixtures` folder
 * @param {string} fileType The MIME type of the file
 * @param {string} label The label associated with the file input field
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 *
 * @example
 * // Fills in the input element referenced by label named "label" inside of an iframe with the file located at the `fixture/path.ext` path with the MIME type `mime/type`
 * When I fill in the field labeled "label" with file "fixture/path.ext" of type "mime/type" in iframe
 *
 * @returns {Promise<*>} - Result
 */
const uploadFileInIframeByLabel = (fileName, fileType, label) => {
    cy.get('@iframe').withinIframe(`label:contains('${label}')`, (el) => {
        el.then(subject => {
            cy.get('@iframe').withinIframe('#' + subject.attr('for'), (el) => {
                el.then(subject => {
                    changeFileField(subject, fileName, fileType);
                })
            });
        });
    });
}

When(/^I fill in (?:|the )field labeled "([^"]*)" with file "([^"]*)" of type "([^"]*)" in iframe$/, (label, fixture, type) => {
    uploadFileInIframeByLabel(fixture, type, label)
});

/**
 * Type into element
 *
 * @description
 * This step definition will fill an element with text
 *
 * @summary
 * - When I type `text` into `.element-selector`
 * - When I fill `.element-selector` with `text`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {string} text The text to type
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 *
 * @example
 * // Types "text" into ".element-selector"
 * When I type "text" into the field ".element-selector"
 * When I type the text "text" into field ".element-selector"
 * When I fill ".element-selector" with text "text"
 * When I fill out the field ".element-selector" with "text"
 *
 * @returns {Promise<*>} - Result
 */
const typeInField = (selector, text) => {
    cy.get(selector).type(text);
}

When(/^I type (?:|the )(?:|text )"([^"]*)" into (?:|the )(?:|element |field )"([^"]*)"(?:| field| element)$/, (text, selector) => {
    typeInField(selector, text)
});

When(/^I fill (?:out )(?:the )(?:field |element )"([^"]*)"(?: field| element) with (?:|text )"([^"]*)"$/, (selector, text) => {
    typeInField(selector, text)
});

/**
 * Type Into an Element Using Label
 *
 * @description
 * This step definition will fill an element with text by label
 *
 * @summary
 * - When I type "text" into the field labeled "label"
 * - When I fill out the field labeled "label" with text "text"
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {string} text The text to type
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 *
 * @example
 *
 * @returns {Promise<*>} - Result
 */
const typeInLabeledField = (label, text) => {
    cy.get('label').contains(label).then( (el) => {
        typeInField('#' + el.attr('for'), text);
    })
};

When(/^I type (?:|the )(?:|text )"([^"]*)" into (?:|the )(?:|element |field )labeled "([^"]*)"$/, (text, label) => {
    typeInLabeledField(label, text);
});

When(/^I fill out the field labeled "([^"]*)" with text "([^"]*)"$/, (label, text) => {
    typeInLabeledField(label, text);
});

const typeInFields = (dataTable) => {
    let type = dataTable.rawTable[0][0];
    if (type === 'selector') {
        dataTable.hashes().forEach((row) => {
            typeInField(row.selector, row.text);
        });
    }
    else if (type === 'label'){
        dataTable.hashes().forEach((row) => {
            cy.get('label').contains(row.label).then((el) => {
                typeInField('#' + el.attr('for'), row.text);
            });
        });
    }
    else {
        throw new Error("datatable header does not match");
    }
}
When(/^I fill out (?:|text |labeled )(?:fields|elements) with(?:| values| text)$/, (dataTable) => {
    typeInFields(dataTable);
});

When(/^I type into (?:fields|elements)$/, (dataTable) => {
    typeInFields(dataTable);
});

const submitForm = () => {
    cy.get('@form').submit();
}

When(/^I submit the form$/, (id, value) => {
    submitForm();
});

const typeInLabeledFieldIframe = (label, value) => {
    cy.get('@iframe').withinIframe('body', (el) => {
        el.contains(label).then((element) => {
            cy.get('@iframe').withinIframe('#' + element.attr('for'), (el) => {
                el.type(value);
            });
        })
    });
};

When(/^I type (?:|the )(?:|text )"([^"]*)" into (?:|the )(?:|element |field )labeled "([^"]*)" in iframe$/, (text, label) => {
    typeInLabeledFieldIframe(label, text);
});

When(/^I fill out the field labeled "([^"]*)" with (?:|value |text )"([^"]*)" in iframe$/, (label, text) => {
    typeInLabeledFieldIframe(label, text);
});

