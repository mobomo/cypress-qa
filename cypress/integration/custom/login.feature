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
    And I clear context
    Then I should see the text "Unrecognized username or password"
    Then I should see the form "#user-login-form"