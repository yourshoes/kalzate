Feature: Create item in store
  @critical
  Scenario: add new item to store
    Given I visit the tickets page
    And I create a new item
    Then a new line is added to the items list
    