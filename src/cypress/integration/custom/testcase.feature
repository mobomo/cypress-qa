Feature: Body

  @login @e2e-test
  Scenario: Login form exists
    Given I am on "/user"
    Then I should see elements with below text
      | selector  | text     |
      | label     | Username |
      | label     | Password |
    When I set context to ".usa-footer__primary-section"

  @login @e2e-test
  Scenario: Fill login form with wrong password
    Given I am on "/user"
    Then I should see the form "#user-login-form"
    When I fill out text fields with values
      | label         | text     |
      | Username  | Username  |
    When I fill out the "#edit-pass" field with "Password"
    When I submit the form
    Then I should see the text "Unrecognized username or password"
    Then I should see the form "#user-login-form"

  @login @e2e-test
  Scenario: Can login as admin
    Given I am on "/user"
    Then I should see the form "#user-login-form"
    When I fill out text fields with values
      | label             | text                 |
      | Username      | admin                 |
      | Password      | admin                 |
    When I submit the form
    Then I should be on the user profile path
    Then I preserve cookies

  @content @e2e-test
  Scenario: Can login as admin
    Given I am on "/user"
    Then I should see the form "#user-login-form"
    When I fill out text fields with values
      | label             | text                 |
      | Username      | admin                 |
      | Password      | admin                 |
    When I submit the form
    Then I should be on the user profile path
    Then I preserve cookies

#  @content @e2e-test
#  Scenario: Create Bio
#    Given I am on "/admin"
#    Then I should see the element "#toolbar-bar"
#    Then I click the "Content" link
#    Then I click the "Add content" link
#    Then I click the "Bio" link
#    Then I should see the form "#node-bio-form"
#    When I fill out text fields with values
#      | selector                              | text                                                |
#      | #edit-title-0-value                   | Integration test bio                                 |
#      | #edit-field-page-title-0-value        | -Nav                                                 |
#      | #edit-field-short-description-0-value | Short desciption test                                |
#      | #edit-field-job-title-0-value         | My job title                                         |
#      | #edit-field-division-0-target-id      | Climatic Science and Services Division (CSSD) (911)  |
#    And I click "Contact Image"
#    And I click the "Select media" button
#    Given I should see the iframe "#entity_browser_iframe_media_entity_browser_modal"
#    Then I should see "Image" in iframe
#    When I fill in the field labeled "Image" with file "jpg.jpg" of type "image/jpg" in iframe
#    Then I should see the text "Alternative text" in iframe
#    When I fill out the field labeled "Alternative text" with value "alt text example" in iframe
#    And I fill out the field labeled "Name" with value "picture name" in iframe
#    And I fill out the field labeled "Credit" with value "picture credit" in iframe
#    And I click "Save image" in iframe
#    And I click the "Save" button

  @content @e2e-test
  Scenario: Add About Office content
    Given I am on "/admin"
    Then I should see the element "#toolbar-bar"
    Then I click the "Content" link
    Then I click the "Add content" link
    Then I click the "About Office" link
    Then I should see the form "#node-about-office-form"
    # Details
    Then I click the "Details" link
    When I fill out text fields with values
      | label                | text                           |
      | Title                | Integration test About Office  |
      | Nav Title            | -Nav                           |
      | Short Description    | Short description test         |
    And I click the "Add media" button
    Then I set context to ".ui-dialog:visible"
    Then I should see the element "input[name='files[upload]']"
    When I fill in the field labeled "Add file" with file "jpg.jpg" of type "image/jpg"
    Then I should see the text "Alternative text"
    When I fill out the field labeled "Alternative text" with "alt text example"
    When I fill out the field labeled "Credit" with "credit example"
    When I check the boxes
      | label                  |
      | Alabama                |
      | Arkansas               |
      | COSMIC                 |
      | GFS                    |
      | GOES-R Program Office  |
      | Data Visualization     |
      | National Security      |
    And I click the ".js-form-submit:contains('Save')" element
    And I click the ".js-form-submit:contains('Insert selected')" element
    And I set context to ".vertical-tabs__pane:visible"
    Then I should see the element ".media-library-item__remove"
    Then I reset context
    # Body
    Then I click the "Body" link
    Then I set context to ".vertical-tabs__pane:visible"
    Then I click the "Add Text Block" button
    Then I should see "Add Text Block"
    Then I should see text "Body Text"
    And I fill out the ckeditor labeled "Body Text" with "Body text example"
    Then I reset context
    # Contact Card
    And I click the "Contact Card" link
    And I set context to ".vertical-tabs__pane:visible"
    And I click the "Add Contact Card" button
    And I should see text "Card Title"
    Then I fill out the field labeled "Card Title" with "Card title test"
    And I fill out the field labeled "Description" with "Description test"
    And I fill out the field labeled "Street address" with "123 Street"
    And I fill out the field labeled "City" with "New York"
    And I select "Florida" in field labeled "State"
    And I fill out the field labeled "Zip code" with "32812"
    And I fill out the field labeled "Phone Number" with "321-444-5555"
    And I fill out the field labeled "Email" with "test@mobomo.com"
    Then I reset context
    # More Information
    And I click the "More Information" link
    And I set context to ".vertical-tabs__pane:visible"
    And I click the "Add More Information Section" button
    And I should see the text "to More Information"
    And I fill out the field labeled "Title" with "title"
    And I fill out the field labeled "URL" with "https://example.com"
    And I fill out the field labeled "Link text" with "Link"
    Then I reset context
    Then I click the "#node-about-office-form #edit-actions #edit-submit" element
