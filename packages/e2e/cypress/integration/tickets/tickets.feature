Feature: Tickets Management
Description: Selling, Returning and Saving Tickets

Background: 
  Given I visit the tickets page
  And I have stock

@critical
# @todo remove this scenario once the scenarios commented below are enabled
Scenario: Employee creates a ticket and return it as a voucher
  When I create a new ticket with some items from the stock
  And I pay the ticket with a payment method
  Then I can sell the ticket
  And I can return the ticket items
  Then I can get a ticket voucher
  
#@critical
#@see scenario 1 in docs/model.md for further information
#Scenario: Employee creates a ticket and return it as a voucher with a discount applied
  #When I create a new ticket with several items from the stock
  #A 1 10 10
  #B 2 10 20 10%
  #And I applied a discount to the ticket
  # discount: 10%
  #A 1 10 9
  #B 2 10 18
  #And I pay the ticket with a payment method
  #Then I can create the ticket
  #Then I can return all ticket items as a voucher accordingly to the discount applied
  # discount: 10%
  #A -1 10 -9
  #B -2 10 -18
  
#@critical
#@see scenario 2 in docs/model.md for further information
#Scenario: Employee creates a ticket and return it as a voucher
  #When I create a new ticket with several items from the stock
  #A 1 10 10
  #B 2 10 20
  #And I pay the ticket with a payment method
  #Then I can create the ticket
  #Then I can return a ticket item as a voucher
  #A -1 10 -10
  #Then I can return another ticket item and buy a new one
  #B -1 10 -10
  #C  1 30  30
  #And I pay it partially with the previous voucher
  #Then I can return the rest of the ticket items as a voucher
  #C -1 30 -30
  #B -1 10 -10

@critical
Scenario: Save a ticket and restore it
  When I create a new ticket with some items from the stock
  And I can save the ticket
  And I create a new ticket with one item from the stock
  Then I can open back the saved ticket