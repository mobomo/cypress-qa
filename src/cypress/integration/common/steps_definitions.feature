Feature: Common

  @steps
  Scenario: The major scrolling steps are used
    Given I am on "/user/login"
    Then I should see the form "#user-login-form"
    When I fill out text fields with values
      | id             | value                 |
      | edit-name      | admin                 |
      | edit-pass      | admin                 |
    When I submit the form
    When I go to the top of the page
    And I go to the bottom of the page
    And I scroll to the top of the page
    And I scroll to the bottom of the page
    And I scroll to "#main-content"
    And I scroll the "#main-content" element into view
    And I scroll to the "#main-content" element
    And I scroll "Member for" into view
    And I scroll to the bottom of ".region-header"
    And I scroll to the top of ".region-header"
    And I scroll the bottom of ".region-header" into view
    And I scroll the top of ".region-header" into view
    And I go to "/user/"
    And I navigate to "/user/1"
    Then I should see the text "Member"
