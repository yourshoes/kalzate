Feature: Create item in store
  @critical
  Scenario: add new item to store
    Given the user is on the ticket section
    And the user creates a new item
    Then a new line is added to the items list
    