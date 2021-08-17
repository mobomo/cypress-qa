Feature: Create Page
  @content @e2e-test
  Scenario: Can login as admin
    Given I am on "/user"
    Then I should see the form "#user-login-form"
    When I enter test credentials
    When I submit the form
    Then I should be on the user profile path
    Then I preserve cookies

  @content @e2e-test
  Scenario: Create Page
    Given I am on "/admin"
    Then I should see the element "#toolbar-bar"
    Then I click the "Content" link
    Then I click the "Add content" link
    Then I click the "Page" link
    Then I should see the form "#node-basic-page-form"
    # Details
    Then I click the "Details" link
    When I fill out text fields with values
      | label                | text                                                 |
      | Page Title           | Integration test Page                                |
      | Navigation Title     | -Nav                                                 |
      | Short Description    | Short description test                               |
    Then I check the box labeled "Add Related Content Feed"
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
    Then I should see the form "#node-basic-page-form"
    When I check the boxes
      | label                  |
      | Alabama                |
      | Arkansas               |
    # Homepage Jumbotron
    Then I click the "Homepage Jumbotron" link
    When I set context to ".vertical-tabs__pane:visible"
    Then I click on "Background Image"
    Then I should see "Select media"
    Then I click the "Select media" button
    Given I should see the iframe "#entity_browser_iframe_media_entity_browser_modal"
    Then I should see "Image"
    When I fill in the field labeled "Image" with file "jpg.jpg" of type "image/jpg"
    Then I should see the text "Alternative text"
    When I fill out the field labeled "Alternative text" with text "alt text example"
    And I fill out the field labeled "Name" with text "picture name"
    And I fill out the field labeled "Credit" with text "picture credit"
    And I click "Save image"
    When I wait for AJAX to complete
    Then I set context to ".field--name-field-background-image"
    Then I should see the "Remove" button
    Then I should see the form "#node-basic-page-form"
    Then I fill out the field labeled "Featured Text" with "feature text"
    Then I fill out the field labeled "URL" with "https://example.com"
    Then I fill out the field labeled "Link text" with "link text"
    Then I fill out the field labeled "Feature Label" with "feature label"
    Then I reset context
    # Body
    Then I click the "Body" link
    When I set context to ".vertical-tabs__pane:visible"
    Then I click the "Add Text Block" button
    Then I should see "Include Wrapped Image"
    And I fill out the ckeditor labeled "Body Text" with "Body text example"
    And I check the box labeled "Include Wrapped Image"
    Then I should see "Image Alignment"
    Then I set context to ".field--name-field-image"
    Then I click on "Image"
    Then I should see "Select media"
    Then I click the "Select media" button
    Given I should see the iframe "#entity_browser_iframe_media_entity_browser_modal"
    Then I should see "Image"
    When I fill in the field labeled "Image" with file "jpg.jpg" of type "image/jpg"
    Then I should see the text "Alternative text"
    When I fill out the field labeled "Alternative text" with text "alt text example"
    And I fill out the field labeled "Name" with text "picture name"
    And I fill out the field labeled "Credit" with text "picture credit"
    And I click "Save image"
    When I wait for AJAX to complete
    Then I set context to ".field--name-field-image"
    Then I should see the "Remove" button
    Then I reset context
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
#    Then I should see the form "#node-basic-page-delete-form"
#    Then I submit the form