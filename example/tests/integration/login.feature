Feature: Login
  @e2e-test
  Scenario: Can login as admin

    Given I am on "/user"
    Then I should see the form "#user-login-form"
    When I enter test credentials
    When I submit the form
    Then I should be on the user profile path