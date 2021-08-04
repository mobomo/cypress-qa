Feature: Common

  @steps
  Scenario: Filling iframe
    Given I am on "/user/login"
    Then I should see the form "#user-login-form"
    #When I type the text "admin" into the field labeled "Username"
    #And I type the "admin" into element "#edit-pass" element
    When I fill out fields with values
      | label    | text    |
      | Username  | admin   |
      | Password  | admin   |
    And I submit the form
    Given I am on "/node/add/bio"
    And I click "Contact Image"
    And I click the "Select media" button
    Given I should see the iframe "#entity_browser_iframe_media_entity_browser_modal"
    Then I should see the text "Image" in iframe
    When I fill in the field labeled "Image" with file "jpg.jpg" of type "image/jpg" in iframe
    Then I should see the text "Alternative text" in iframe
    When I fill out the field labeled "Alternative text" with value "alt text example" in iframe
    And I fill out the field labeled "Name" with value "picture name" in iframe
    And I fill out the field labeled "Credit" with value "picture credit" in iframe
    And I click "Remove" in iframe
    And I click "Save image" in iframe
    And I wait 200 seconds

  @steps
  Scenario: Filling fields
    Given I am on "/user/login"
    Then I should see the form "#user-login-form"
    #When I type the text "admin" into the field labeled "Username"
    #And I type the "admin" into element "#edit-pass" element
    When I fill out fields with values
      | label    | text    |
      | Username  | admin   |
      | Password  | admin   |
    And I submit the form
    Given I am on "/user/1/edit"
    When I fill in the field labeled "Picture" with file "jpg.jpg" of type "image/jpg"
    Then I should see "Remove"
    And I click "Remove"
    And I wait 200 seconds

  @steps
  Scenario: The major visibility steps are used
    Given I am on "/user/login"
    Then I should see the form "#user-login-form"
    Then I should see an element "label" with text "Username"
    Then I should see the element "label" with text "Username"
    Then I should see element "label" with text "Username"
    Then I should see an element "label" with "Username"
    Then I should see the element "label" with "Username"
    Then I should see element "label" with "Username"
    Then I should see elements with below text
      | selector  | text     |
      | label     | Username |
      | label     | Password |
    Then I should not see elements with below text
      | selector  | text     |
      | label     | fasdfdsf |
      | label     | asdfasfd |
    When I fill out fields with values
      | selector    | text    |
      | #edit-name  | admin   |
      | #edit-pass  | admin   |
    When I submit the form
    And I go to "/user/"
    And I navigate to "/user/1"
    Then I should see the text "Member"
    Then I should see text "Member"
    Then I should see "Member"
    Then I should not see the text "asadfasdfsadf"
    Then I should not see text "asadfasdfsadf"
    Then I should not see "asadfasdfsadf"

  @steps
  Scenario: The major scrolling steps are used
    Given I am on "/user/login"
    Then I should see the form "#user-login-form"
    When I fill out text fields with values
      | selector    | text    |
      | #edit-name  | admin   |
      | #edit-pass  | admin   |
    When I submit the form
    When I go to the top of the page
    And I go to the bottom of the page
    And I scroll to the top of the page
    And I scroll to the bottom of the page
    And I scroll "Member for" into view
    And I scroll to ".main-content"
    And I scroll the ".main-content" element into view
    And I scroll to the "#main-content" element
    And I scroll "Member for" into view
    And I scroll to the bottom of ".region-header"
    And I scroll to the top of ".region-header"
    And I scroll the bottom of ".region-header" into view
    And I scroll the top of ".region-header" into view
