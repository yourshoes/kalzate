Feature: Create item in store with only required fields
  @critical
  Scenario: add new item to store
    Given I visit the tickets page
    And I have no items in the stock
    And I create a new item with only required fields
    Then a new line is added to the items list