Feature: Create item in store
  @critical
  Scenario: add new item to store
    Given I visit the tickets page
    And I have not an item with reference n
    And I create a new item with reference n
    Then a new line is added to the items list with reference n
    