Feature: Body

  @login @e2e-test
  Scenario: Login form exists
    Given I am on the path "/user"
    Then I should see elements with below labels
      | element  | label_text |
      |    label |   Username |
      |    label |   Password |

  @login @e2e-test
  Scenario: Fill login form with wrong password
    Given I am on the path "/user"
    Then I should see the form "user-login-form"
    When I fill out text fields with values
      | id         | value     |
      | edit-name  | Username  |
    When I fill out "edit-pass" field with value "Password"
    When I submit the form
    Then I should see the text "Unrecognized username or password"
    Then I should see the form "user-login-form"

  @login @e2e-test
  Scenario: Fill login form with correct credentials
    Given I am on the path "/user"
    Then I should see the form "user-login-form"
    When I fill out text fields with values
      | id             | value                 |
      | edit-name      | admin                 |
      | edit-pass      |   |
    When I submit the form
    Then I should be on the user profile path

  @content @e2e-test
  Scenario: Fill login form with correct credentials
    Given I am on the path "/user"
    Then I should see the form "user-login-form"
    When I fill out text fields with values
      | id             | value                 |
      | edit-name      | admin                 |
      | edit-pass      |   |
    When I submit the form
    Then I should be on the user profile path

  @content @e2e-test
  Scenario: Fill login form with correct credentials
    Given I am on the path "/"
    Then I should see the text "admin"