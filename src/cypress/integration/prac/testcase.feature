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
    Then I should see the form "#user-login-form"
    When I fill out text fields with values
      | id         | value     |
      | edit-name  | Username  |
    When I fill out the field element "#edit-pass" with value "Password"
    When I submit the form
    Then I should see the text "Unrecognized username or password"
    Then I should see the form "#user-login-form"

  @login @e2e-test
  Scenario: Fill login form with correct credentials
    Given I am on the path "/user"
    Then I should see the form "#user-login-form"
    When I fill out text fields with values
      | id             | value                 |
      | edit-name      | admin                 |
      | edit-pass      | admin                 |
    When I submit the form
    Then I should be on the user profile path

  @content @e2e-test
  Scenario: Can login as admin
    Given I am on the path "/user"
    Then I should see the form "#user-login-form"
    When I fill out text fields with values
      | id             | value                 |
      | edit-name      | admin                 |
      | edit-pass      | admin                 |
    When I submit the form
    Then I should be on the user profile path
    Then I preserve cookies

  @content @e2e-test
  Scenario: Admin pages loads
    Given I am on the path "/admin"
    Then I should see the element "#toolbar-bar"
    Then I click the "Content" link
    Then I click the "Add content" link
    Then I click the "Bio" link
    Then I should see the form "#node-bio-form"
    When I fill out text fields with values
      | id                                   | value                          |
      | edit-title-0-value                   | Integration test bio           |
      | edit-field-page-title-0-value        | -Nav                           |
      | edit-field-short-description-0-value | Short desciption test          |
      | edit-field-job-title-0-value         | My job title                   |
      | edit-field-division-0-target-id      | My division                    |
    And I click the "summary[aria-controls='edit-field-contact-image']" element
    And I click the "Select media" button
    Given I should see the iframe "#entity_browser_iframe_media_entity_browser_modal"
    Then I wait 3 seconds
    Then I should see the element "#edit-inline-entity-form-field-media-image-0-upload" in iframe
    When I fill in the "#edit-inline-entity-form-field-media-image-0-upload" field with file "jpg.jpg" of type "image/jpg" in iframe
    Then I should see the text "Alternative text" in iframe
    When I fill out the field labeled "Alternative text" with value "alt text example" in iframe
    And I fill out the field labeled "Name" with value "picture name" in iframe
    And I fill out the field labeled "Credit" with value "picture credit" in iframe
    And I click the ".is-entity-browser-submit:contains('Save image')" element in iframe
    Then I should see the element "input.remove-button"
    Then I click the "#node-about-office-form #edit-actions #edit-submit" element

#  @content @e2e-test
#  Scenario: Admin pages loads
#    Given I am on the path "/admin"
#    Then I should see the element "#toolbar-bar"
#    Then I click the "Content" link
#    Then I click the "Add content" link
#    Then I click the "About Office" link
#    Then I should see the form "#node-about-office-form"
#    When I fill out text fields with values
#      | id                                   | value                          |
#      | edit-title-0-value                   | Integration test About Office  |
#      | edit-field-page-title-0-value        | -Nav                           |
#      | edit-field-short-description-0-value | Short desciption test          |
#    And I click the "Add media" button
#    Then I should see the element "input[name='files[upload]']"
#    When I fill in the "input[name='files[upload]']" field with file "jpg.jpg" of type "image/jpg"
#    Then I should see the text "Alternative text"
#    When I fill out the field labeled "Alternative text" with value "alt text example"
#    And I click the ".js-form-submit:contains('Save')" element
#    And I click the ".js-form-submit:contains('Insert selected')" element
#    Then I should see the element ".media-library-item__remove"
#    Then I click the "#node-about-office-form #edit-actions #edit-submit" element