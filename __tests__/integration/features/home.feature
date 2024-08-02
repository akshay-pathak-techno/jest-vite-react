Feature: Home Page

  Scenario: Visiting the Home Page and verifying the title
    Given I am on the home page
    Then I should see the title "Dashboard"
