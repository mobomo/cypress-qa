Feature: Common

  @steps
  Scenario: The major scrolling steps are used
    Given I am on "/user/login"
    Then I should not see the form "#user-register-form"
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
    When I fill out text fields with values
      | id             | value                 |
      | edit-name      | admin                 |
      | edit-pass      | admin                 |
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
    And I go to "/user/"
    And I navigate to "/user/1"
    Then I should see the text "Member"
    Then I should see text "Member"
    Then I should see "Member"
    Then I should not see the text "asadfasdfsadf"
    Then I should not see text "asadfasdfsadf"
    Then I should not see "asadfasdfsadf"
