Feature: Create/Remove item in stock
  @critical
  Scenario: add new item to stock and remove it
    Given I visit the tickets page
    And I have no items in the stock
    And I create a new item
    Then a new line is added to the items list
    And I remove the new item
    Then I have no items in the stock