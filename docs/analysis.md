# Printer Model

The printer can be local or remote. If no printer IP is provided in the application settings, then local printer is used.

## Local Printing Workflow

- In the case of web, the default print web API is used (as an alternative it can be used custom web url protocol or web RTC) but it always prompts user with a confirmation modal. To avoid that, you can open the browser in kiosk mode, in chrome --kiosk-printing --kiosk

- In the case of desktop, a native solution is used wich directly uses hosting operative system drivers to connect with the printer which is transparent for the user. A fallback to web API is also provided in case the native solution fails or does not cover certain scenarios

## Remote Printing Workflow

if an IP for the printer is provided in the kalzate application settings, then we use both in web and desktop an http client to make a POST request with the content to print and the options to that IP in order to delegate the printing to the HTTP server at the IP provided.

It's responsability of the HTTP server at the IP provided to manage the printer communication. In order to make it possible, we provide an external kalzate-printer-server application for major operative systems that creates that server and waits for HTTP requests from the client to print. It is basically the same solution as in local printing in desktop mode but with an HTTP server wrapper on top of it.

# Summary

As we can depict, we have many solutions involved and maintaining all of them are expensive. This sections has the purpose to list the advantages and disadvantages of each one in order to deprecate and focus on the smaller number of solutions possible.

If we opt for the local printing only, the web based option can be a bit difficult for non technical users as they need to run chrome with special parameters and maybe only works in chrome, making rest of browsers out of scene.

The desktop option would be the easier for the customers, as they contain all is needed but requires the customer to install an application on its computer whereas the web based solution does not.

If we opt for the remote printing only, the web based option would become easier for customer, just to set the IP in the settings but would need to run a separate program on its computer to start the printing server. For the desktop option, it would be same, having to install two applications on its computer, kalzate and kalzate-printer-server.

Taking all of this into account, we list below the possible options:

- Local printing for web and desktop
    * No need to create/mantain kalzate-printer-server
    * web requires kiosk mode
    * web and desktop builds (more complexity)
    * best fit for desktop, but also usable in web
- Remote printing for web and desktop
    * Requires to create/mantain kalzate-printer-server
    * User has to run a server on its own computer
    * web and desktop builds (more complexity)
    * best fit for web, but also usable in desktop
- Remote printing for web and local printing for desktop
    * Requires to create/mantain kalzate-printer-server for web case
    * User has to run a server on its own computer for web case
    * web and desktop builds (more complexity)
    * best fit for both web and desktop
- Local printing for desktop, no web support
    * No need to create/mantain kalzate-printer-server
    * only desktop build (less complexity)
    * no web support, user always has to install app on its own computer
- Remote priting for web, no desktop support
    * Requires to create/mantain kalzate-printer-server for web case
    * User has to run a server on its own computer for web case
    * only web build (less complexity)
    * user does not need to install an app on its computer (but it has to install the kalzate-printer-server)
    * limited API (less flexibility than in desktop to access database for example)

# Desktop vs Web

Desktop advantages:
  - Focus on single browser vendor (chrome)
  - Node context available (more flexibility and capabilities, database access for example)

Desktop disadvantages:
  - Require signing apps
  - Require local setup
  - Requires a complex development setup (node-gyp and python are required)

Web advantages:
  - No need to install application on customer computer
  - Can be deployed as a service in the cloud

Web disadvantages:
  - Different browsers to take into account
  - Limited APIs 
