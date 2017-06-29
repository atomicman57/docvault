const config = require('../../../nightwatch.conf');
const faker = require('faker');
const { url, timeout } = require('../e2eSetup');

module.exports = {
  Signup: browser =>
    browser
      .url(url)
      .waitForElementVisible('body')
      .assert.urlEquals('http://localhost:8000/')
      .assert.title('Document Vault')
      .click('#signup')
      .assert.urlEquals('http://localhost:8000/signup')
      .setValue('input[name=firstname]', 'Integration')
      .setValue('input[name=lastname]', 'Test')
      .setValue('input[name=username]', faker.name.findName())
      .setValue('input[name=password]', 'e2etesting')
      .setValue('input[name=confirm_password]', 'e2etesting')
      .setValue('input[name=email]', faker.internet.email())
      .click('button')
      .waitForElementVisible('div.page', timeout)
      .saveScreenshot('docvault-signup.png')
      .end(),

  'Logout': function (browser) { //eslint-disable-line
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('input[name=email]', 'user@dms.com')
      .setValue('input[name=password]', 'amaladudu')
      .click('button')
      .waitForElementVisible('div.page', timeout)
      .click('#logout')
      .waitForElementVisible('#index-banner', timeout)
      .end();
  }
};
