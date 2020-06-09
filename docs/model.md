# Data Model

The data model is the heart and esence of the application. The data model is made of different entities y relations between them. Each entity has a set of properties or attributes.

## Ticket

The `Ticket` entity properties are:

- id: String - A unique id
- date: String - The creation date
- isChecked : Boolean - Whether the ticket has been checked out or not
- isGift: Boolean - Whether the ticket is a gift or not
- isVoucher: Boolean - Whether the ticket is a voucher or not
- balance: Enum - ticket balance (POSITIVE, NEGATIVE), it is merely presentational (i.e. use to identify by color)
- prevNode: String - An id pointing to the parent Ticket
- nextNode: String - An id pointing to the child Ticket
- payments: [Object] - Metadata for payment details 
    - amount: Number - The customer given amount
    - method: Enum - The payment method enum (cash, creditCard, mobile, wallet, voucher)
    - concept: String - The payment concept (voucher id, phone number, wallet id)
- operations: [Object] - The list of historical operations performed in the ticker
    - operation
    - brand
    - description
    - amount
    - price
    - discountValue: Number - The discount to apply to totalAmount
    - discountType: String - The discount type enum (fixed / percentage)

## Stock

The `Stock` entity properties are:

- id: String - A unique internal id
- date: String - The stock item creation date
- reference: String - The stock item unique reference
- brand: String - The stock item brand
- description: String - The stock item description
- price: Number - The stock item price
- amount: Number - The stock item units amount
- gender: Enum - The stock item gender (male, female)
- colors: [String] - The stock item colors
- hits: Number - The number of times this stock item has been sold out

## Settings

The `Settings` entity properties are:

- id: String - A unique internal id
- country: String - The country ISO code
- language: String - The language ISO code
- theme: String - The application theme
- timezone: String - The timezone
- companyName: String - The company's name
- companyAddress: String - The company's address
- companyEmail: String - The company's address
- companyPhone: String - The company's address
- ticketTemplate: [Object] - The ticket templates   
    - name: String - the ticket template name
    - content: String - the ticket template content
- backupFrecuency: Enum - The backup frequency (daily, weekly, monthly)
- backupLocation: String - The backup location (path, ip address)
- printerName: String - The printer name
- printerIP: String - The printer IP address


## Use Cases

total ticket amount is calculated from "add" operations.

Looping over operations we sum up (amount - discount) per each operation of type "add", then we apply global discount and taxes if provided.

A global discount is the same as applying that discount to every stock item in the ticket. If a stock item in the ticket already have a local discount, then global discount is not applied to it. Global discount is only applied to stock items in the ticket which has no discount at all applied. All discounts (global & local) are 0 by default

If the operation is of type "return" the total amount will be same as in "add" operation but with a negative value.

In total there will be 3 different screens for the ticket management:

- Base case screen (aka new ticket): 

Displayed when creating a new ticket. The condition to display this screen is to have a ticket where isChecked === false

- Read only case screen (aka read/print ticket):

Displayed when the ticket has been checked and when ticket has been modified meaning some ticket item was returned or added. The condition to display this screen is to have a ticket where (isCheked === true & (nextNode !== null || getAmountOperations('add') === getAmountOperations('return')), meaning if the ticket has nextNode or if it has no next node but everything has been returned from the ticket

- Updater ticket case screen (aka return ticket):

Displayed when the ticket has been checked and when ticket has not been modified yet. The condition to display this sreen is to have a ticket where isChecked === true & nextNode === null

Note: The taxes is a global setting which is applie automatically to prices when dumping the stock items into the stock store.

* E2E cases would at least contain:

 - Scenario 1:

 Employee creates a new ticket with 2 stock items A,B and amounts 1,2 and 10% discount 
 Then user return stock items A,B with amounts 1,2 as a voucher according to discount applied

 - Scenario 2:

 prices(A is 10, B is 10, C is 30)
 
    Column 1        Column 2
 Employee creates a new ticket with 2 stock items A,B and amounts 1,2
    A 1 10 10       A 1 10 10
    B 2 10 20       B 2 10 20
 Then user return stock item A with amounts 1 as a voucher
    A -1 10 -10     A -1 10 -10
 Then user return stock item B with amount 2 and buy stock item C with amount 1 (total amount is positive) and pay with voucher of stock item A
    B -2 10 -20     B -1 10 -10
    C  1 30  30     C  1 30  30
 Then user returns stock item C with amount 1 as a voucher 
    C -1 30 -30     B -1 10 -10
                    C -1 30 -30

 assert user has a voucher of 30 at the end (column 1) or 40 (column 2)

* Ticket menu items colors:

grey: its a draft ticket
orange: its a negative ticket, totalAmount < 0
green: its a positive ticket, totalAmount >= 0
blue: its a gift ticket (optional)

* Workflow 

1. Application read list of ticket ids and display them in menu
2. User creates a ticket, call db to create ticket, it returns ticket id (required) and optional metadata as the balance (optional)
    - 2.A. The write operation can be sync, it calls db, write it and return the ticket id as response
    - 2.B. The write operation cab be async, it calls db, write the operation into a queue or event store table and return the ticket id as response. At some point a process will read from the event store and will create the ticket, removing the event from the event store
3. Ticket id is added to menu state to display the new ticket and new ticket screen is displayed
4. User clicks on ticket id in menu, ticket screen display loader while it read ticket from db
5. Ticket is displayed

### A: Creating a new ticket 

- Base case: 

    {
        ...
        ticket: {
            isChecked : false,
            isDraft: false,
            isGift: false,
            isVoucher: false,
            prevNode: null,
            nextNode: null,
            payments: [] ,
            operations: [] 
        }
    }

- Adding a new stock item 

    {
        ...
        ticket: {
            isChecked : false,
            isDraft: false,
            isGift: false,
            isVoucher: false,
            prevNode: null,
            nextNode: null,
            payments: [] ,
            operations: [
                {
                    operation: "add", 
                    brand: "b", 
                    description: "d", 
                    amount: 2,
                    price: 20.00
                }
            ] 
        }
    }

- Adding a payment method

    {
        ...
        ticket: {
            isChecked : false,
            isDraft: false,
            isGift: false,
            isVoucher: false,
            prevNode: null,
            nextNode: null,
            payments: [
                {
                    amount: 40.00
                    method: "creditCard"
                    concept: null
                }
            ],
            operations: [
                {
                    operation: "add", 
                    brand: "b", 
                    description: "d", 
                    amount: 2,
                    price: 20.00
                }
            ] 
        }
    }

- Adding a second payment method

    {
        ...
        ticket: {
            isChecked : false,
            isDraft: false,
            isGift: false,
            isVoucher: false,
            prevNode: null,
            nextNode: null,
            payments: [
                {
                    amount: 20.00
                    method: "creditCard"
                    concept: null
                },
                {
                    amount: 20.00
                    method: "cash"
                    concept: null
                }
            ],
            operations: [
                {
                    operation: "add", 
                    brand: "b", 
                    description: "d", 
                    amount: 2,
                    price: 20.00
                }
            ] 
        }
    }


- Adding a global discount

total: 40
discount: 10%
total with discount: 36

    {
        ...
        ticket: {
            isChecked : false,
            isDraft: false,
            isGift: false,
            isVoucher: false,
            prevNode: null,
            nextNode: null,
            payments: [
                {
                    amount: 16.00
                    method: "creditCard"
                    concept: null
                },
                {
                    amount: 20.00
                    method: "cash"
                    concept: null
                }
            ],
            operations: [
                {
                    operation: "add", 
                    brand: "b", 
                    description: "d", 
                    amount: 2,
                    price: 20.00,
                    discountValue: 10,
                    discountType: "percentage",
                }
            ] 
        }
    }
