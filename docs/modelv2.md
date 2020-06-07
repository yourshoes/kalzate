# Data Model

The data model is the heart and esence of the application. The data model is made of different entities y relations between them. Each entity has a set of properties or attributes.

This version v2 includes logic & auth 

## Ticket

The `Ticket` entity properties are:

- id: String - A unique id
- date: String - The creation date
- employeeId: String - The employee's id who created this ticket
- isChecked : Boolean - Whether the ticket has been checked out or not
- isDraft: Boolean - Whether the ticket is a draft or not
- isGift: Boolean - Whether the ticket is a gift or not
- isVoucher: Boolean - Whether the ticket is a voucher or not
- prevNode: String - An id pointing to the parent Ticket
- nextNode: String - An id pointing to the child Ticket
- payments: [Object] - Metadata for payment details 
    - totalAmount: Number - The ticket total amount
    - providedAmount: Number - The customer given amount
    - exchangeAmount: Number - The amount to return to the customer
    - discountValue: Number - The discount to apply to totalAmount
    - discountType: String - The discount type enum (fixed / percentage)
    - taxValue: Number - The tax to apply to totalAmount
    - taxType: String - The tax type enum (fixed / percentage)
    - method: Enum - The payment method enum (cash, creditCard, mobile, wallet, voucher)
    - concept: String - The payment concept (voucher id, phone number, wallet id)
- operations: [Object] - The list of historical operations performed in the ticker
    - operation
    - brand
    - description
    - amount
    - price

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

## Employee

The `Employee` entity properties are:

- id: String - A unique internal id. The settings config belongs to this user/employee
- date: String - The settings item creation date
- country: String - The country ISO code
- language: String - The language ISO code
- theme: String - The application theme
- timezone: String - The timezone
- firstname: String - The employee's name
- lastname: String - The employee's last name
- username: String - The employee's username
- email: String - The employee's email
- phone: String - The employee's phone
- roles: [String] - The employee's roles
- password: String - The employee's password 



## Settings

The `Settings` entity properties are:

- id: String - A unique internal id
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



