const faker = require('faker');
const { url, timeout } = require('../e2eSetup');

module.exports = {
  'View Users': (browser) => {
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('input[name=email]', 'admin@dms.com')
      .setValue('input[name=password]', 'adminuser')
      .click('button')
      .waitForElementVisible('div.page', 5000)
      .click('#users-list')
      .waitForElementVisible('.userscard', 6000)
      .pause(2000)
      .assert.urlEquals('http://localhost:8000/userslist')
      .end();
  },
  'Search for a user': browser =>
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('input[name=email]', 'admin@dms.com')
      .setValue('input[name=password]', 'adminuser')
      .click('button')
      .waitForElementVisible('div.page', 5000)
      .click('#users-list')
      .waitForElementVisible('.userscard', 6000)
      .pause(2000)
      .assert.urlEquals('http://localhost:8000/userslist')
      .waitForElementVisible('input#search')
      .setValue('input#search', 'Ade')
      .keys(browser.Keys.ENTER)
      .waitForElementVisible('.card')
      .pause(2000)
      .assert.containsText('.title', 'Ade')
      .end(),

  'Delete user': (browser) => {
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('input[name=email]', 'admin@dms.com')
      .setValue('input[name=password]', 'adminuser')
      .click('button')
      .waitForElementVisible('div.page', 5000)
      .click('#users-list')
      .waitForElementVisible('.userscard', 6000)
      .pause(2000)
      .assert.urlEquals('http://localhost:8000/userslist')
      .waitForElementVisible('.card', timeout)
      .waitForElementVisible('.card-content', timeout)
      .click('.deletebutton')
      .pause(2000)
      .waitForElementVisible('.sweet-alert', timeout)
      .click('.confirm')
      .pause(2000);
    browser.end();
  }
};
