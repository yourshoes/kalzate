Feature: Tickets Management
Description: Selling, Returning and Saving Tickets

Background: 
  Given I visit the tickets page
  And I have stock

@critical
Scenario: Employee creates a ticket
  When I create a new ticket with some items from the stock
  Then I can return it as a ticket voucher
  And I can create a new ticket and pay with the ticket voucher
  And I can create a new ticket but cannot pay again with the same ticket voucher

@critical
Scenario: Employee creates a ticket and return everything (ticket total is 0)
  When I create a new ticket with some items from the stock
  Then I can return some items and buy new ones for the same amount without paying
  