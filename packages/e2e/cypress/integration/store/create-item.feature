Feature: Create item in store
  @critical
  Scenario: add new item to store
    Given the user is on the ticket section
    When user text a valid value on 'Reference' input 
    And user text a valid value on 'Brand' input 
    And user text a valid value on 'Description' input 
    And user text a valid value on 'Price' input 
    And user text a valid value on 'Amount' input 
    And user click on add button
    Then a new line is added items list
    