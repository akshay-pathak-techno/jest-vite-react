Feature: Login Page

  Scenario: Visiting the Login Page and verifying the form elements
    Given I am on the login page
    Then I should see the login form with email and password fields
    And I should see a submit button with the text "Login"

  Scenario: Submitting the login form with an invalid email
    Given I am on the login page
    When I enter an invalid email in the email field
    And I enter a valid password in the password field
    And I click the submit button
    Then I should see an error message for the email field

  Scenario: Submitting the login form with a password less than 6 characters
    Given I am on the login page
    When I enter a valid email in the email field
    And I enter a password less than 6 characters in the password field
    And I click the submit button
    Then I should see an error message for the password field

  Scenario: Submitting the login form with a valid email and password
    Given I am on the login page
    When I enter a valid email in the email field
    And I enter a valid password in the password field
    And I click the submit button
    Then I should be redirected to the dashboard
