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
      .waitForElementVisible('body', 20000)
      .waitForElementVisible('input[name=firstname]', 1000)
      .setValue('input[name=firstname]', '')
      .waitForElementVisible('input[name=lastname]', 1000)
      .setValue('input[name=lastname]', '')
      .waitForElementVisible('input[name=username]', 1000)
      .setValue('input[name=username]', '')
      .waitForElementVisible('input[name=password]', 1000)
      .setValue('input[name=password]', '')
      .waitForElementVisible('input[name=confirm_password]', 1000)
      .setValue('input[name=confirm_password]', '')
      .waitForElementVisible('button', 1000)
      .click('button')
      .waitForElementVisible('form', 1000)
      .pause(2000)
      .setValue('input[name=firstname]', 'Ade Integrate')
      .setValue('input[name=lastname]', 'Integrate')
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
      .setValue('input[name=password]', 'amaladu')
      .click('button')
      .pause(6000)
      .setValue('input[name=password]', 'du')
      .click('button')
      .waitForElementVisible('div.page', timeout)
      .click('#logout')
      .waitForElementVisible('.homepage', 20000)
      .end();
  }
};
