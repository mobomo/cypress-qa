Feature: Create Search Recommendation
  @content @e2e-test
  Scenario: Can login as admin
    Given I am on "/user"
    Then I should see the form "#user-login-form"
    When I enter test credentials
    When I submit the form
    Then I should be on the user profile path
    Then I preserve cookies

  @content @e2e-test
  Scenario: Create Search Recommendation
    Given I am on "/admin"
    Then I should see the element "#toolbar-bar"
    Then I click the "Content" link
    Then I click the "Add content" link
    Then I click the "Search Recommendation" link
    Then I should see the form "#node-search-recommendation-form"
    # Details
    Then I click the "Details" link
    When I fill out text fields with values
      | label                    | text                                                 |
      | Title                    | Integration test Search Recommendation               |
      | URL                      | https://example.com                                  |
      | Link text                | link text                                            |
      | Short Description        | Short description                                    |
      | Search Phrases (value 1) | phrase                                               |
    Then I click on "Thumbnail"
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
    Then I reset context
    Then I click the "#edit-actions #edit-submit" element
#    Then I click the "Delete" button
#    Then I should see the form "#node-search-recommendation-delete-form"
#    Then I submit the form