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

  @elements @e2e-test
  Scenario: Checking presence of elements on a Homepage
    Given I am on the Homepage
    And I should see "Get Started"
#    Then I should see "See More"
    Then I should see "View all features"
    And I should see "Learn More"
    Then I should see "For the Public"
    And I should see "For Business"
    And I should see "For Fraud Awareness"

  @features @e2e-test
  Scenario: Check features
    Given I am on the Homepage
    And I should see "Read More"
    Then I should click through all Read More items
    Then I should get a "200" response code

  @footer @getstarted @learnmore @e2e-test
  Scenario Outline: Check Footer social media links
    Given I am on the Homepage
    And I click on "<link_text>"
    Then I should be taken to "<voltron_url>"
    Then the page title contains "<title>"
    Then I should get a "200" response code

    Examples:
      | link_text   | voltron_url      | title           |
      | Get Started | /track-the-money | Track the Money |
#      | See More    | /track-the-money/funding-overview | Funding Overview |
      | Learn More  | /oversight       | Oversight       |
