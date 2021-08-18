/**
 * @module whens
 * @file
 * This file manages typical form and field filling patterns as step definitions.
 */
import { When } from 'cypress-cucumber-preprocessor/steps';

/** FILE UPLOADS ***/

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
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} fileName Path to the file inside of the `fixtures` folder
 * @param {string} fileType The MIME type of the file
 * @param {string} selector The CSS selector of the file field
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 *
 * @returns {Promise<*>} - Result
 */
const uploadFile = (fileName, fileType = '', selector) => {
    cy.getWithAlias(selector).then(subject => {
        changeFileField(subject, fileName, fileType)
    });
}

/**
 * @step
 *
 * @When I fill out the <code>selector</code> field with file <code>fileName</code> of type <code>fileType</code>
 *
 * @param {string} selector The CSS selector of the file field
 * @param {string} fileName Path to the file inside of the `fixtures` folder
 * @param {string} fileType The MIME type of the file
 *
 * @summary
 * This step definition will fills in the `selector` input element with the file located at the `fileName` path with the MIME type `fileType`
 *
 * @group Form filling - Files
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 * @see {@link uploadFile}
 *
 * @example
 * // Fills in the `input[type='file']` input element with the file located at the `jpg.jpg` fixtures path with the MIME type `image/jpg`
 * When I fill in the "input[type='file']" field with file "jpg.jpg" of type "image/jpg"
 */
When(/^I fill (?:|out |in )(?:|the) "([^"]*)"(?:| field) with file "([^"]*)" of type "([^"]*)"$/, (selector, fixture, type) => {
    uploadFile(fixture, type, selector);
});

/**
 * Fill File Field Upload by Label
 *
 * @description
 * This step definition will fill a file field with a file.
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} label The label associated with the element
 * @param {string} fileName Path to the file inside of the `fixtures` folder
 * @param {string} fileType The MIME type of the file
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 *
 * @returns {Promise<*>} - Result
 */
const uploadFileByLabel = (label, fileName, fileType) => {
    cy.getWithAlias('label').contains(label).then( (el) => {
        uploadFile(fileName, fileType, '#' + el.attr('for'))
    });
}

/**
 * @step
 *
 * @When I fill out the field labeled <code>label</code> with file <code>fileName</code> of type <code>fileType</code>
 *
 * @param {string} label The label associated with the element
 * @param {string} fileName Path to the file inside of the `fixtures` folder
 * @param {string} fileType The MIME type of the file
 *
 * @summary
 * This step definition will fills in the input element labelled `label` with the file located at the `fileName` path with the MIME type `fileType`
 *
 * @group Form filling - Files
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 * @see {@link uploadFileByLabel}
 *
 * @example
 * // Fills in the input element labeled "Image" with the file located at the `jpg.jpg` fixtures path with the MIME type `image/jpg`
 * When I fill in the field labeled "Image" with file "jpg.jpg" of type "image/jpg"
 */
When(/^I fill (?:|out |in )(?:|the )field labeled "([^"]*)" with file "([^"]*)" of type "([^"]*)"$/, (label, fixture, type) => {
    uploadFileByLabel(label, fixture, type);
});
//
// /**
//  * Fill File Field Upload In Iframe
//  *
//  * @description
//  * This step definition will fill a file field inside of an iframe with a file.
//  *
//  * @summary
//  * - When I fill in the `.input-selector` field with file `fixture/path.ext` of type `mime/type` in iframe
//  *
//  * @version 1.0.0
//  * @since 1.0.0
//  *
//  * @param {string} fileName Path to the file inside of the `fixtures` folder
//  * @param {string} fileType The MIME type of the file
//  * @param {string} selector The CSS selector of the iframe
//  * @param {string} elementSelector [@frame] The CSS selector within the iframe on which to operate
//  *
//  * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
//  *
//  * @example
//  * // Fills in the `.input-selector` input element inside of an iframe with the file located at the `fixture/path.ext` path with the MIME type `mime/type`
//  * When I fill in the ".input-selector" field with file "fixture/path.ext" of type "mime/type" in iframe
//  *
//  * @returns {Promise<*>} - Result
//  */
// const uploadFileInIframe = (fileName, fileType = '', selector='@iframe', elementSelector) => {
//     cy.getWithAlias(selector).withinIframe(elementSelector, (el) => {
//         el.then(subject => {
//             changeFileField(subject, fileName, fileType)
//         })
//     });
// }
//
// When(/^I fill (?:|out |in )(?:|the )"([^"]*)"(?:| field) with file "([^"]*)" of type "([^"]*)" in iframe$/, (selector, fixture, type) => {
//     uploadFileInIframe(fixture, type, '@iframe', selector)
// });
//
// /**
//  * Fill File Field Upload By Label In Iframe
//  *
//  * @description
//  * This step definition will fill a file field inside of an iframe with a file, referenced by a label
//  *
//  * @summary
//  * - When I fill in field labeled `label` with file `fixture/path.ext` of type `mime/type` in iframe
//  *
//  * @version 1.0.0
//  * @since 1.0.0
//  *
//  * @param {string} fileName Path to the file inside of the `fixtures` folder
//  * @param {string} fileType The MIME type of the file
//  * @param {string} label The label associated with the file input field
//  *
//  * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
//  *
//  * @example
//  * // Fills in the input element referenced by label named "label" inside of an iframe with the file located at the `fixture/path.ext` path with the MIME type `mime/type`
//  * When I fill in the field labeled "label" with file "fixture/path.ext" of type "mime/type" in iframe
//  *
//  * @returns {Promise<*>} - Result
//  */
// const uploadFileInIframeByLabel = (fileName, fileType, label) => {
//     cy.getWithAlias('@iframe').withinIframe(`label:contains('${label}')`, (el) => {
//         el.then(subject => {
//             cy.getWithAlias('@iframe').withinIframe('#' + subject.attr('for'), (el) => {
//                 el.then(subject => {
//                     changeFileField(subject, fileName, fileType);
//                 })
//             });
//         });
//     });
// }
//
// When(/^I fill (?:|out |in )(?:|the )field labeled "([^"]*)" with file "([^"]*)" of type "([^"]*)" in iframe$/, (label, fixture, type) => {
//     uploadFileInIframeByLabel(fixture, type, label)
// });

/** TYPING ***/

/**
 * Type into element
 *
 * @description
 * This step definition will fill an element with text
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {string} text The text to type
 *
 * @see {@link typeInField}
 *
 * @returns {Promise<*>} - Result
 */
const typeInField = (selector, text) => {
    cy.getWithAlias(selector).type(text);
}

/**
 * @step
 *
 * @When I fill out the field <code>selector</code> with <code>text</code>
 * @stepalias I type <code>text</code> into the field <code>selector</code>
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {string} text The text to type
 *
 * @summary
 * This step definition will type into the field with the element matching `selector`
 *
 * @group Typing
 * @see {@link typeInField}
 *
 * @example
 * // Types "text" into ".element-selector"
 * When I type "text" into the field ".element-selector"
 * When I type the text "text" into field ".element-selector"
 * When I fill ".element-selector" with text "text"
 * When I fill out the field ".element-selector" with "text"
 */
When(/^I type (?:|the )(?:|text )"([^"]*)" into (?:|the )(?:|element |field )"([^"]*)"(?:| field| element)$/, (text, selector) => {
    typeInField(selector, text)
});

When(/^I fill (?:out )(?:the )"([^"]*)"(?: field| element) with (?:|text )"([^"]*)"$/, (selector, text) => {
    typeInField(selector, text)
});

/**
 * Type Into an Element Using Label
 *
 * @description
 * This step definition will fill an element with text by label
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} label The label associated with the element
 * @param {string} text The text to type
 *
 * @returns {Promise<*>} - Result
 */
const typeInLabeledField = (label, text) => {
    cy.getWithAlias('label').contains(label).then( (el) => {
        typeInField('#' + el.attr('for'), text);
    })
};

/**
 * @step
 *
 * @When I fill out the field labeled <code>label</code> with <code>text</code>
 * @stepalias I type <code>text</code> into the field labeled <code>label</code>
 *
 * @param {string} label The label associated with the element
 * @param {string} text The text to type
 *
 * @summary
 * This step definition will type into the field referenced by a label matching <code>label</code>
 *
 * @group Typing
 * @see {@link typeInLabeledField}
 *
 * @example
 * // Types "text" into a field labeled "label"
 * When I type "text" into the field labeled "label"
 */
When(/^I type (?:|the )(?:|text )"([^"]*)" into (?:|the )(?:|element |field )labeled "([^"]*)"$/, (text, label) => {
    typeInLabeledField(label, text);
});

When(/^I fill (?:|in |out )(?:|the )field labeled "([^"]*)" with (?:|text )"([^"]*)"$/, (label, text) => {
    typeInLabeledField(label, text);
});

/**
 * Type Into a CKEditor Using Label
 *
 * @description
 * This step definition will fill out a CKEditor with text by label
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} label The label associated with the CKEditor
 * @param {string} text The text to type
 *
 * @returns {Promise<*>} - Result
 */
const typeInCKEditor = (label, text) => {
    cy.getWithAlias('label').contains(label).then( (el) => {
        cy.getWithAlias('#cke_' + el.attr('for') + ' iframe').withinIframe('body', (el) => {
            el.type(text);
        })
    })
};

/**
 * @step
 *
 * @When I fill out the ckeditor labeled <code>label</code> with <code>text</code>
 *
 * @param {string} label The label associated with the element
 * @param {string} text The text to type
 *
 * @summary
 * This step definition will take in a gherkin DataTable and type into multiple fields by label or selector
 *
 * @group Typing
 * @see {@link typeInCKEditor}
 *
 * @example
 * // Types "Body text example" into a CKEditor labeled "Body Text"
 * When I fill out the ckeditor labeled "Body Text" with "Body text example"
 */
When(/^I fill (?:|in |out )(?:|the )ckeditor labeled "([^"]*)" with (?:|text )"([^"]*)"$/, (label, text) => {
    typeInCKEditor(label, text);
});

/**
 * Type Into Fields Using DataTable
 *
 * @description
 * This step definition will fill out fields using a DataTable
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {DataTable} dataTable A gherkin data table with columns headed `selector` or `label` and `text`
 *
 * @returns {Promise<*>} - Result
 */
const typeInFields = (dataTable) => {
    let type = dataTable.rawTable[0][0];
    if (type === 'selector') {
        dataTable.hashes().forEach((row) => {
            typeInField(row.selector, row.text);
        });
    }
    else if (type === 'label'){
        dataTable.hashes().forEach((row) => {
            typeInLabeledField(row.label, row.text)
        });
    }
    else {
        throw new Error("datatable header does not match");
    }
}

/**
 * @step
 *
 * @When I fill out labeled fields with values
 * @stepalias I type into fields
 *
 * @param {DataTable} dataTable A gherkin data table with columns headed `selector` or `label` and `text`
 *
 * @summary
 * This step definition will take in a gherkin DataTable and type into multiple fields by label or selector
 *
 * @group Typing
 * @see {@link typeInFields}
 *
 * @example
 * When I fill out text fields with values
 *   | label     | text      |
 *   | Username  | Username  |
 *   | Password  | Password  |
 *
 * @example
 * When I fill out text fields with values
 *   | selector     | text      |
 *   | #edit-user   | Username  |
 *   | #edit-pass   | Password  |
 */
When(/^I fill (?:in|out) (?:|text |labeled )(?:fields|elements) with(?:| values| text)$/, (dataTable) => {
    typeInFields(dataTable);
});

When(/^I type into (?:fields|elements)$/, (dataTable) => {
    typeInFields(dataTable);
});

/**
 * Type Into Fields Using DataTable
 *
 * @description
 * This step definition will fill out fields using a DataTable
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @see {@link shouldSeeIframe}
 *
 * @returns {Promise<*>} - Result
 */
const submitForm = () => {
    cy.get('@form').submit();
}

/**
 * @step
 *
 * @When I submit the form
 *
 * @summary
 * This step definition will submit a form referenced by the context @form.
 *
 * @group Form filling - Submit
 * @needs @form from {@link thenIShouldSeeTheFormSelector}
 * @see {@link submitForm}
 */
When(/^I submit the form$/, (id, value) => {
    submitForm();
});

// const typeInLabeledFieldIframe = (label, value) => {
//     cy.getWithAlias('@iframe').withinIframe('body', (el) => {
//         el.contains(label).then((element) => {
//             cy.getWithAlias('@iframe').withinIframe('#' + element.attr('for'), (el) => {
//                 el.type(value);
//             });
//         })
//     });
// };
//
// When(/^I type (?:|the )(?:|text )"([^"]*)" into (?:|the )(?:|element |field )labeled "([^"]*)" in iframe$/, (text, label) => {
//     typeInLabeledFieldIframe(label, text);
// });
//
// When(/^I fill (?:in|out) the field labeled "([^"]*)" with (?:|value |text )"([^"]*)" in iframe$/, (label, text) => {
//     typeInLabeledFieldIframe(label, text);
// });

/** CHECKBOXES ***/

/**
 * Check Field
 *
 * @description
 * This step definition will check or uncheck a field by selector
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {boolean} check Boolean denoting whether to check or uncheck the box
 *
 * @returns {Promise<*>} - Result
 */
const checkField = (selector, check = true) => {
    if (check) {
        cy.getWithAlias(selector).check();
    }
    else {
        cy.getWithAlias(selector).uncheck();
    }
}

/**
 * Check Field By Label
 *
 * @description
 * This step definition will check or uncheck a field by label
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} label The label associated with the element
 * @param {boolean} check Boolean denoting whether to check or uncheck the box
 *
 * @returns {Promise<*>} - Result
 */
const checkLabeledField = (label, check = true) => {
    cy.getWithAlias('label').contains(label).then( (el) => {
        checkField('#' + el.attr('for'), check);
    })
};

/**
 * @step
 *
 * @When I check the box <code>label</code>
 * @stepalias I check the <code>label</code> box
 * @stepalias I uncheck the box <code>label</code>
 * @stepalias I uncheck the <code>label</code> box
 *
 * @param {string} label The label associated with the element
 *
 * @summary
 * This step definition will check or uncheck a box labeled `label`
 *
 * @group Form filling - Checkbox
 * @see {@link checkLabeledField}
 *
 * @example
 * When I check the "Data Visualization" box
 * When I check the box "Alabama"
 * When I check the box labeled "Include Wrapped Image"
 *
 * @example
 * When I uncheck the "Published" box
 * When I uncheck the box "Florida"
 * When I uncheck the box labeled "National Security"
 */
When(/^I (|un)check (?:|the )box "([^"]*)"$/, (check, label, text) => {
    checkLabeledField(label, check.length === 0);
});

When(/^I (|un)check (?:|the )box labeled "([^"]*)"$/, (check, label, text) => {
    checkLabeledField(label, check.length === 0);
});

When(/^I (|un)check (?:|the )"([^"]*)"(?:| box)$/, (check, label, text) => {
    checkLabeledField(label, check.length === 0);
});

/**
 * @step
 *
 * @When I check the <code>selector</code> element
 * @stepalias I uncheck the <code>selector</code> element
 *
 * @param {string} selector The CSS selector on which to operate
 *
 * @summary
 * This step definition will check or uncheck the `selector` box
 *
 * @group Form filling - Checkbox
 * @see {@link checkLabeledField}
 *
 * @example
 * When I check "#edit-published" element
 *
 * @example
 * When I uncheck "#edit-include-wrapped-image" element
 */
When(/^I (|un)check (?:|the )"([^"]*)" element$/, (check, label, text) => {
    checkField(label, check.length === 0);
});

/**
 * Check Checkboxes Using DataTable
 *
 * @description
 * This step definition will check our uncheck checkboxes using a DataTable
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {DataTable} dataTable A gherkin data table with columns headed `selector` or `label`
 * @param {boolean} check A boolean denoting whether to check our uncheck the checkbox
 *
 * @returns {Promise<*>} - Result
 */
const checkFieldDataTable = (dataTable, check) => {
    let type = dataTable.rawTable[0][0];
    if (type === 'selector') {
        dataTable.hashes().forEach((row) => {
            checkField(row.selector, check);
        });
    }
    else if (type === 'label'){
        dataTable.hashes().forEach((row) => {
            checkLabeledField(row.label, check);
        });
    }
    else {
        throw new Error("datatable header does not match");
    }
}

/**
 * @step
 *
 * @When I check the boxes
 * @stepalias I uncheck the boxes
 *
 * @param {DataTable} dataTable A gherkin data table with a single column headed `selector` or `label`
 *
 * @summary
 * This step definition will take in a gherkin DataTable and check or uncheck boxes by label or selector
 *
 * @group Form filling - Checkbox
 * @see {@link checkFieldDataTable}
 *
 * @example
 * When I check the boxes
 *   | label     |
 *   | Florida   |
 *   | Georgia   |
 *
 * @example
 * When I uncheck the boxes
 *   | selector      |
 *   | #box-florida  |
 *   | #box-georgia  |
 */
When(/^I (|un)check the boxes$/, (check, dataTable) => {
    checkFieldDataTable(dataTable, check.length === 0);
});

/**
 * Select Field
 *
 * @description
 * This step definition will choose a selection in a select box
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {string} selection Text of the option to select
 *
 * @returns {Promise<*>} - Result
 */
const selectField = (selector, selection) => {
    cy.getWithAlias(selector).select(selection);
}

/**
 * @step
 *
 * @When I select <code>selection</code> in <code>selector</code>
 *
 * @param {string} selection The text of the option you want to select
 * @param {string} selector The CSS selector on which to operate
 *
 * @summary
 * This step definition will select from the option named `selection` from the select element referenced by `selector`
 *
 * @group Form filling - Select
 * @see {@link selectField}
 *
 * @example
 * When I select "Florida" in "#edit-state"
 */
When(/^I select "([^"]*)" in "([^"]*)"$/, (selection, selector) => {
    selectField(selector, selection);
});

/**
 * Select Field By Label
 *
 * @description
 * This step definition will choose a selection in a select box by label
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} label The label associated with the element
 * @param {string} selection Text of the option to select
 *
 * @returns {Promise<*>} - Result
 */
const selectLabeledField = (label, selection) => {
    cy.getWithAlias('label').contains(label).then( (el) => {
        selectField('#' + el.attr('for'), selection);
    })
};

/**
 * @step
 *
 * @When I select <code>selection</code> in <code>label</code>
 * @stepalias I select  <code>selection</code> from the field labeled <code>label</code>
 *
 * @param {string} selection The text of the option you want to select
 * @param {string} label The label associated with the element
 *
 * @summary
 * This step definition will select from the option named `selection` from the select element with the label `label`
 *
 * @group Form filling - Select
 * @see {@link selectLabeledField}
 *
 * @example
 * When I select "Florida" in "State"
 * When I select "Florida" from the field labeled "State"
 */
When(/^I select "([^"]*)" (?:|in |from )(?:|the )field labeled "([^"]*)"$/, (selection, label) => {
    selectLabeledField(label, selection);
});

/**
 * Select Options Using DataTable
 *
 * @description
 * This step definition will select options using a DataTable
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {DataTable} dataTable A gherkin data table with columns headed `selector` or `label` and `selection`
 * @param {string} selection The option in the select element to select
 *
 * @returns {Promise<*>} - Result
 */
const selectDataTable = (dataTable, check) => {
    let type = dataTable.rawTable[0][0];
    if (type === 'selector') {
        dataTable.hashes().forEach((row) => {
            selectField(row.selector, row.selection);
        });
    }
    else if (type === 'label'){
        dataTable.hashes().forEach((row) => {
            selectLabeledField(row.label, row.selection);
        });
    }
    else {
        throw new Error("datatable header does not match");
    }
}

/**
 * @step
 *
 * @When I select
 *
 * @param {DataTable} dataTable A gherkin data table with columns headed `selector` or `label` and `selection`
 *
 * @summary
 * This step definition will take in a gherkin DataTable and select options label or selector
 *
 * @group Form filling - Select
 * @see {@link selectDataTable}
 *
 * @example
 * When I select
 *   | label     | selection     |
 *   | Country   | United States |
 *   | State     | Florida       |
 *
 * @example
 * When I select
 *   | selector        | selection     |
 *   | #edit-country   | United States |
 *   | #edit-state     | Florida       |
 */
When(/^I select$/, (dataTable) => {
    selectDataTable(dataTable);
});

// YY-mm-dd
// RFC3339 time hh:mm:ss
/**
 * Fill Date Field
 *
 * @description
 * This step definition will fill a date field with `date`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The label associated with the element
 * @param {string} date The date formatted `YY-mm-dd`
 *
 * @returns {Promise<*>} - Result
 */
const setDateField = (selector, date) => {
    cy.getWithAlias(selector).then((el) => {
        el.val(date);
    });
}

/**
 * @step
 *
 * @When I fill out the field <code>selector</code> with date <code>date</code>
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {string} date The date formatted `YY-mm-dd`
 *
 * @summary
 * This step definition will fill out a date field
 *
 * @group Form filling - Date and time
 * @see {@link setDateField}
 *
 * @example
 * When I fill out the field "#edit-date" with date "22-08-01"
 */
When(/^I fill out the field "([^"]*)" with date "([^"]*)"$/, (selector, date) => {
    setDateField(selector, date);
});

/**
 * Fill Date Field by Label
 *
 * @description
 * This step definition will fill a date field labeled `label` with `date`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} label The label associated with the element
 * @param {string} date The date formatted `YY-mm-dd`
 *
 * @returns {Promise<*>} - Result
 */
const setDateLabeledField = (label, selection) => {
    cy.getWithAlias('label').contains(label).then( (el) => {
        setDateField('#' + el.attr('for'), selection);
    })
};

/**
 * @step
 *
 * @When I fill out the field labeled <code>label</code> with date <code>date</code>
 *
 * @param {string} label The label associated with the element
 * @param {string} date The date formatted `YY-mm-dd`
 *
 * @summary
 * This step definition will fill a date field labeled `label` with `date`
 *
 * @group Form filling - Date and time
 * @see {@link setDateLabeledField}
 *
 * @example
 * When I fill out the field labeled "Date" with date "22-08-01"
 */
When(/^I fill out the field labeled "([^"]*)" with date "([^"]*)"$/, (date, label) => {
    setDateLabeledField(label, date);
});

/**
 * Fill Time Field by Label
 *
 * @description
 * This step definition will fill a time field labeled `label` with `time`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {string} time The date formatted `hh:mm:ss`
 *
 * @returns {Promise<*>} - Result
 */
const setTimeField = (selector, time) => {
    cy.getWithAlias(selector).then((el) => {
        el.val(time);
    });
}

/**
 * @step
 *
 * @When I fill out the field <code>selector</code> with time <code>time</code>
 *
 * @param {string} selector The CSS selector on which to operate
 * @param {string} time The RFC3339 time formatted `hh:mm:ss`
 *
 * @summary
 * This step definition will fill out a time field
 *
 * @group Form filling - Date and time
 * @see {@link setTimeField}
 *
 * @example
 * When I fill out the field "#edit-time" with time "18:02:00"
 */
When(/^I fill out the field "([^"]*)" with time "([^"]*)"$/, (selector, time) => {
    setTimeField(selector, time);
});

/**
 * Fill Time Field by Label
 *
 * @description
 * This step definition will fill a time field labeled `label` with `time`
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 * @param {string} label The label associated with the element
 * @param {string} time The date formatted `hh:mm:ss`
 *
 * @returns {Promise<*>} - Result
 */
const setTimeLabeledField = (label, time) => {
    cy.getWithAlias('label').contains(label).then( (el) => {
        setDateField('#' + el.attr('for'), time);
    })
};

/**
 * @step
 *
 * @When I fill out the field labeled <code>label</code> with time <code>time</code>
 *
 * @param {string} label The label associated with the element
 * @param {string} time The RFC3339 time formatted `hh:mm:ss`
 *
 * @summary
 * This step definition will fill out a time field
 *
 * @group Form filling - Date and time
 * @see {@link setTimeLabeledField}
 *
 * @example
 * When I fill out the field labeled "Time" with time "18:02:00"
 */
When(/^I fill out the field labeled "([^"]*)" with time "([^"]*)"$/, (label, time) => {
    setTimeLabeledField(label, time);
});