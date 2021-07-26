Feature: Body

  @front @report @e2e-test
  Scenario Outline: Report, Fraud, Waste & Abuse
    Given I am on the Report
    When I scroll lt"<link_text>" into view
    And I click the "<link_text>" link
    #And I wait 3 seconds
    Then I should see the text "<text_shown>"


    Examples:
      | link_text                           | text_shown                                    |
      | Definitions of Fraud, Waste & Abuse | the intentional or improper use               |
      | Types of Complaints to Report       | Mismanagement or fraud relating to healthcare |
      | Reporting Whistleblower Retaliation | Whistleblowers should never be subjected      |
      | Reporting Whistleblower Retaliation | Whistleblowers should never be subjected      |
