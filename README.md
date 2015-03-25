# Auth-app

Authentication can be a bit of a minefield, there's lots of different methods and libraries. This repo intends to demonstrate how a number of those techniques can be used.

Each method of authenticating is contained within it's own branch:

- Manual
  - Provides an example of 'hand-rolling' authentication 
- Simple Auth
- Torii
- Firebase
- End-to-end
  - An in-depth example that shows how you would use Simple Auth for implementing custom email / password based auth that adheres to the Resource Owner Password Credential OAuth 2.0 flow. Torii for providing 3rd party login via Facebook. On the backend everything is linked together (i.e. social accounts are linked to a user account). A custom Simple Auth authenticator is also used to wrap logic for swapping the Facebook authorisation token for an access token, and then using that access token to acquire a profile, which is then linked to a user account. There is a server side repo for this branch: [ember-auth-server](https://github.com/Kerry350/ember-auth-server). When using this branch the ember app should be started with the `proxy` option, like so: `ember server --proxy http://127.0.0.1:3200`. 

A detailed writeup will be coming to accompany all of this. It goes in to detail on some of the issues found when implementing authentication in client side apps, as well as breaking down the implementations on the various branches. 

The `end-to-end` branch when paired with the server side repo should provide a **very** realistic example of how authentication could be implemented. A lot of tutorials only go so far when demonstrating auth, but apart from a few minor points, like the seeded users password being stored in plaintext (things like this are pointed out in comments), this is a 'real-world' example. 

## Considerations

One thing that has been missed out for the sake of simplicity is HTTPS. If you were to implement these methods in a production application **you must use HTTPS**. 

The server mocks also intend to be functional, not secure or 'right'. The credentials aren't validated, nor are the tokens, the mocks are just there to provide a suitable API response. The `end-to-end` branch is the exception, this is paired with a proper server repo where lookups are carried out.

## Configuration 

Some branches require certain configuration options. 

- Torii
  - Set your `apiKey` in `config/environment.js`
  - Set your `client_id` and `client_secret` in `server/mocks/auth.js`

- Firebase
  - Set the `firebase` property in `config/environment.js`
  - Use the email and password credentials that you've setup in your Firebase Dashboard (under 'login & auth')

- End-to-end
  - Set your `apiKey` in `config/environment.js`
  - Set your `clientId` in `config/environment.js`, this is the `clientId` that represents the Ember.js app as a consumer. A Client is automatically seeded by the server the first time it is run. Use the `_id` of the Client document as the value for this property.  
  - You'll also need to provide your `client_id` and `client_secret` but this is documented in the server repo README 
  - Start the ember.js app with the `proxy` option, `ember server --proxy http://127.0.0.1:3200` 
  - User credentials are:
    - Email: `test@test.com`
    - Password: `password` 

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Building

* `ember build` (development)
* `ember build --environment production` (production)
