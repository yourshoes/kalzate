Feature: Return a ticket
  @critical
  Scenario: return a ticket with 1 item 
    Given the user is on the ticket section
    And there is a sold ticket in the ticket list
    When user clicks on the sold ticket from the ticket list
    And user clicks on the return icon of the ticket item 
    And user select payment method credit card
    And user click on checkout button
    Then a ticket of type sell is created in the ticket list
    