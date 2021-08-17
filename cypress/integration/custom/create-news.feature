Feature: Create News
  @content @e2e-test
  Scenario: Can login as admin
    Given I am on "/user"
    Then I should see the form "#user-login-form"
    When I enter test credentials
    When I submit the form
    Then I should be on the user profile path
    Then I preserve cookies

  @content @e2e-test
  Scenario: Create News
    Given I am on "/admin"
    Then I should see the element "#toolbar-bar"
    Then I click the "Content" link
    Then I click the "Add content" link
    Then I click the "News" link
    Then I should see the form "#node-news-form"
    Then I fill in the field labeled "Title" with "News ci test"
    Then I select "Announcement" from the field labeled "Type"
    Then I type "Short description" into the field labeled "Short Description"
    # Body
    Then I click the "Body" link
    When I set context to ".vertical-tabs__pane:visible"
    Then I click the "Add Text Block" button
    Then I should see "to Body"
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
    Then I fill out the field labeled "Image Caption" with text "Caption test"
    Then I fill out the field labeled "Link" with "https://example.com"
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
#    Then I should see the form "#node-news-delete-form"
#    Then I submit the form