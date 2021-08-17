Feature: Create Event
  @content @e2e-test
  Scenario: Can login as admin
    Given I am on "/user"
    Then I should see the form "#user-login-form"
    When I enter test credentials
    When I submit the form
    Then I should be on the user profile path
    Then I preserve cookies

  @content @e2e-test
  Scenario: Create Event
    Given I am on "/admin"
    Then I should see the element "#toolbar-bar"
    Then I click the "Content" link
    Then I click the "Add content" link
    Then I click the "Event" link
    Then I should see the form "#node-event-form"
    # Details
    When I fill out datetime field "Begin Date" with "now"
    When I fill out datetime field "End Date" with "01 Jan 2025 20:10"
    Then I click the "Details" link
    When I fill out text fields with values
      | label                | text                                                 |
      | Title                | Integration test Event                                 |
      | Nav Title            | -Nav                                                 |
      | Short Description    | Short description test                               |
    Then I select "Onsite (Speaker)" in field labeled "Event Type"
    And I set context to ".field--name-field-banner-image"
    And I click "Banner Image"
    And I click the "Select media" button
    Given I should see the iframe "#entity_browser_iframe_media_entity_browser_modal"
    Then I should see "Image"
    When I fill in the field labeled "Image" with file "jpg.jpg" of type "image/jpg"
    Then I should see the text "Alternative text"
    When I fill out the field labeled "Alternative text" with text "alt text example"
    And I fill out the field labeled "Name" with text "picture name"
    And I fill out the field labeled "Credit" with text "picture credit"
    And I click "Save image"
    When I wait for AJAX to complete
    And I set context to ".field--name-field-banner-image"
    Then I should see the "Remove" button
    Then I should see the form "#node-event-form"
    And I fill out the field labeled "Street address" with "123 Street"
    And I fill out the field labeled "City" with "New York"
    And I select "Florida" in field labeled "State"
    And I fill out the field labeled "Zip code" with "32812"
    And I set context to ".field--name-field-resource-link"
    And I fill out the field labeled "URL" with "https://www.example.com"
    And I fill out the field labeled "Link text" with "link text"
    And I set context to ".field--name-field-action-button"
    And I fill out the field labeled "URL" with "https://www.example.com"
    And I fill out the field labeled "Link text" with "link text"
    And I set context to ".field--name-field-thumbnail"
    And I click "Thumbnail Image"
    And I click the "Select media" button
    Given I should see the iframe "#entity_browser_iframe_media_entity_browser_modal"
    Then I should see "Image"
    When I fill in the field labeled "Image" with file "jpg.jpg" of type "image/jpg"
    Then I should see the text "Alternative text"
    When I fill out the field labeled "Alternative text" with text "alt text example"
    And I fill out the field labeled "Name" with text "picture name"
    And I fill out the field labeled "Credit" with text "picture credit"
    And I click "Save image"
    When I wait for AJAX to complete
    And I set context to ".field--name-field-thumbnail"
    Then I should see the "Remove" button
    And I clear context
    # Body
    Then I click the "Body" link
    When I set context to ".vertical-tabs__pane:visible"
    Then I click the "Add Call to Action" button
    Then I should see "to Body"
    Then I fill out the field labeled "Text" with "text"
    Then I fill out the field labeled "Link" with "https://www.example.com"
    Then I click the "Add Call to Action" button
    When I wait for AJAX to complete
    When I set context to ".vertical-tabs__pane:visible .draggable:last"
    Then I fill out the field labeled "Text" with "text"
    Then I select "Media Download" in field labeled "Type"
    Then I click "Add media"
    When I set context to ".ui-dialog:visible"
    Then I click the "Image" link
    Then I should see text "Allowed types: png gif jpg jpeg."
    Then I fill in the field labeled "Add file" with file "jpg.jpg" of type "image/jpg"
    When I wait for AJAX to complete
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
    When I wait for AJAX to complete
    And I clear context
    # Tags
    Then I click the "Tags" link
    When I set context to ".vertical-tabs__pane:visible"
    When I check the boxes
      | label                  |
      | Alabama                |
      | Arkansas               |
      | COSMIC                 |
      | GFS                    |
      | Human Impact           |
      | Data Visualization     |
      | National Security      |
    And I clear context
    Then I click the "#edit-actions #edit-submit" element
#    Then I click the "Delete" button
#    Then I should see the form "#node-event-delete-form"
#    Then I submit the form