Feature: Users Page

  Scenario: Displaying a list of users
    Given I am on the users page
    When the data is loaded
    Then I should see a table with users' names, emails, and phones

  Scenario: Handling API failure with 404 Not Found
    Given I am on the users page
    When the data fails to load
    Then I should see an error message indicating failure to load data
