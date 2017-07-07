const faker = require('faker');
const { url, timeout } = require('../e2eSetup');

const newTitle = faker.lorem.words(2);

module.exports = {
  'Create document': (browser) => {
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('input[name=email]', 'user@dms.com')
      .setValue('input[name=password]', 'amaladudu')
      .click('button')
      .waitForElementVisible('div.page', timeout)
      .click('#createbtn')
      .setValue('input[name=title]', newTitle)
      .click('.DraftEditor-editorContainer')
      .click('select option[value="public"]')
      .click('div.public-DraftStyleDefault-block')
      .setValue('.public-DraftEditor-content', faker.lorem.paragraphs())
      .waitForElementVisible('#save-doc', timeout)
      .click('#save-doc')
      .waitForElementVisible('#doc_success', 5000)
      .assert.containsText('#doc_success', 'Document Created Successfully')
      .pause(2000)
      .click('button.modal-close')
      .waitForElementVisible('div.page', timeout)
      .end();
  },

  'Open document': (browser) => {
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('input[name=email]', 'user@dms.com')
      .setValue('input[name=password]', 'amaladudu')
      .click('button')
      .waitForElementVisible('div.page', 5000)
      .click('#view_more')
      .pause(2000)
      .waitForElementVisible('h5', timeout)
      .assert.containsText('p.meta-info', 'Created on')
      .end();
  },

  'Search for a document': browser =>
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('input[name=email]', 'user@dms.com')
      .setValue('input[name=password]', 'amaladudu')
      .click('button')
      .waitForElementVisible('div.page', 5000)
      .waitForElementVisible('input#search')
      .pause(2000)
      .setValue('input#search', 'The Wolf')
      .keys(browser.Keys.ENTER)
      .waitForElementVisible('.card')
      .pause(2000)
      .assert.containsText('.title', 'The Wolf')
      .end(),

  'Edit document': (browser) => {
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('input[name=email]', 'user@dms.com')
      .setValue('input[name=password]', 'amaladudu')
      .click('button')
      .waitForElementVisible('div.page', timeout)
      .click('.editbutton')
      .setValue('.edit-input', 'Editted by Test')
      .click('.DraftEditor-editorContainer')
      .click('select option[value="private"]')
      .click('div.public-DraftStyleDefault-block')
      .setValue('.public-DraftEditor-content', faker.lorem.paragraphs())
      .click('#edit-doc')
      .waitForElementVisible('#update-doc', 50000)
      .pause(2000)
      .assert.containsText('#update-doc', 'Document Updated Successfully');
    browser.end();
  },

  'Delete document': (browser) => {
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('input[name=email]', 'user@dms.com')
      .setValue('input[name=password]', 'amaladudu')
      .click('button')
      .waitForElementVisible('div.page', 5000)
      .waitForElementVisible('.card', timeout)
      .pause(1000)
      .waitForElementVisible('.card-content', timeout)
      .click('.deletebutton')
      .pause(1000)
      .waitForElementVisible('.sweet-alert', timeout)
      .pause(1000)
      .click('.confirm');
    browser.end();
  }
};
