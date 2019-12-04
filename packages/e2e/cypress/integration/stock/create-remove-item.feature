Feature: Create/Remove item in store
  @critical
  Scenario: add new item to store
    Given I visit the tickets page
    And I have no items in the stock
    And I create a new item
    Then a new line is added to the items list
    And I remove the new item
    Then I have no items in the stock