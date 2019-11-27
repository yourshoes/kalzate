Feature: Tickets Management
Description: Selling, Returning and Saving Tickets

Background: 
  Given I visit the tickets page
  And I have stock
  When I create a new ticket with some items from the stock

Scenario: Sell a ticket and return it with a voucher
  And I pay the ticket with a payment method
  And I can sell the ticket
  Then I can return a voucher ticket

Scenario: Save a ticket and restore it
  And I can save the ticket
  And I create a new ticket with some items from the stock
  Then I can open back the saved ticket


