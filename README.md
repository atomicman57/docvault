# Docvault - Document Vault
[![Build Status](https://travis-ci.org/andela-bphilips/docvault.svg?branch=staging)](https://travis-ci.org/andela-bphilips/docvault)
[![Coverage Status](https://coveralls.io/repos/github/andela-bphilips/docvault/badge.svg?branch=staging)](https://coveralls.io/github/andela-bphilips/docvault?branch=staging)
[![Code Climate](https://codeclimate.com/github/andela-bphilips/docvault/badges/gpa.svg)](https://codeclimate.com/github/andela-bphilips/docvault)

## Introduction
 Document Management System provides a restful API for users to create and manage documents giving different privileges based on user roles and managing authentication using JWT.

## Key Features of this Application
* User Authentication
Users are authenticated and validated using JWT web token. Generating tokens on signup and login ensures documents and API endpoints are protected.

* Documents
    * Create documents
    * Edit documents
    * Delete documents
    * View documents
    * Search for documents (Private, Public and Role)
    * View All Documents (All Documents)

* Admin
    * View all Public and Role documents
    * Edit documents
    * Delete documents
    * Search for documents (Private, Public and Role)
    * Delete Users

## Usage

You can access the app on heroku at [DocVault](http://docvault.herokuapp.com)

Alternatively, You may clone the repository and run the app locally to use.

## Local Installation Guide

* Clone the repository 
    * git clone https://github.com/andela-bphilips/docvault.git
* Navigate to the project directory **cd docvault**
* Install the dependencies using **npm install**
* Run **npm start** to start the application.
* The app will start on your local server.
* Run tests with: **npm test**


## Technologies

- [React](https://facebook.github.io/react/) and [ReactDOM](https://facebook.github.io/react/docs/react-dom.html): 
These were developed by Facebook and are used for building web pages that are structured as a collection of 
components. These components are kept as independent as possible. See [this link](https://facebook.github.io/react/).

- ECMAScript 6: Also known as ES2015, this is the newest version of Javascript with 
next-generation features like arrow functions, generators, enhanced object literals, 
spread operators and more. Click [this link](https://en.wikipedia.org/wiki/ECMAScript) for details.

- [NodeJS](https://nodejs.org): NodeJS is a server-side JavaScript runtime engine built 
on Chrome's V8 JavaScript engine. It is lightweight, efficient and greatly used in building 
web apps. Please visit [this link](https://nodejs.org) for more details.


- [Redux framework](https://http://redux.js.org/): Redux is a predictable state container for JavaScript apps
It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

- [Postgres](https://postgresql.org/): It is an object-relational database management system (ORDBMS) with an emphasis on extensibility and standards compliance. As a database server, its primary functions are to store data securely and return that data in response to requests from other software applications

- [Webpack](https://webpack.js.org/): A bundler for javascript and friends. Packs many modules into a few bundled assets. Code Splitting allows to load parts for the application on demand. Through "loaders," modules can be CommonJs, AMD, ES6 modules, CSS, Images, JSON, Coffeescript, LESS, ... and your custom stuff

- [Babel](https://babeljs.io/): Babel is a community-driven tool that helps you write the latest version of JavaScript.
When your supported environments don't support certain features natively, it will help you compile it down to a supported version.

- [Sass/Scss](http://sass-lang.com/): Sass makes CSS fun again. Sass is an extension of CSS, adding nested rules, variables, mixins, selector inheritance, and more. It's translated to well-formatted, standard CSS using the command line tool or a web-framework plugin.

- [Sequelize](http://docs.sequelizejs.com/): Sequelize is a promise-based ORM for Node.js which supports the dialects of PostgreSQL and features solid transaction support, relations, read replication and more.

## Test Dependencies

- [Mocha](https://mochajs.org/): Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun

- [Chai](chaijs.com/): Chai is a BDD / TDD assertion library for [node](http://nodejs.org) and the browser that can be delightfully paired with any javascript testing framework.

- [Enzyme](airbnb.io/enzyme/docs/api/): Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' out

## API Documentation
View API documentation [here](https://docvault.herokuapp.com/api-docs/)

## End to end tests

Start the app with npm start,
Open terminal, navigate to the project directory and setup the test with npm run e2e-setup,
then run npm run e2e-test


## Limitation
* Users cannot comment on document
* Users cannot share document

## Contributing

* Fork this repositry to your account.
* Clone your repositry: git clone git@github.com:your-username/docvault.git
* Create your feature branch: git checkout -b feature/feature-id/<3-4 word feature description>
* Commit your changes: git commit -m "feature(scope): (subject) <BLANK LINE> (body) <BLANK LINE> (footer)"
* Push to the remote branch: git push origin new-feature
* Open a pull request.

* Note this project uses javascript ES6 and [Airbnb style guide](https://github.com/airbnb/javascript)
- Commit Message Convention
    - scope should be something specific to the commit change e.g logo
    - subject text should:
        - use present tense: "save" not "saved" or "saving"
        - not capitalize first letter i.e no "Carry to safety"
        - not end with a dot (.)
    - Message body (optional) If a body is to be written, it should:
      - written in present tense.
      - include reason for change and difference in the previous behaviour

    - Message Footer This should be used for referencing the issues using the following keywords: Start, Delivers, Fixes and Finishes. It should be written as:
      - [Start #345]
    
## License

This project is authored by Philips Blessing and is licensed 
for your use, modification and distribution under [the MIT license](https://en.wikipedia.org/wiki/MIT_License). 