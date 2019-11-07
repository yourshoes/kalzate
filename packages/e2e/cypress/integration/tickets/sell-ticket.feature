Feature: Sell a ticket
  @critical
  Scenario: sell a ticket with 1 item 
    Given the user is on the ticket section
    And the stock has items
    When user adds an item from the stock
    And user select payment method credit card
    And user click on checkout button
    Then a ticket of type sell is created in the ticket list
