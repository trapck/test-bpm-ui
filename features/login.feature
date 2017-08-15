@login
Feature: I can login and fail to login
  
  Scenario: Login to app with correct data
    Given I am on the Login page
    When I enter correct login
    And I enter correct password
    And I click login button
    Then I should see start page

  Scenario: Unable to login with incorrect data
    Given I am on the Login page1
    When I enter invalid login
    And I enter invalid password
    And I click login button1
    Then I should see warning message