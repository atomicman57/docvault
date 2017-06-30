const faker = require('faker');
const { url, timeout } = require('../e2eSetup');

const newTitle = faker.lorem.words(2);

module.exports = {
//   'Create document': (browser) => {
//     browser
//       .url(url)
//       .waitForElementVisible('body', timeout)
//       .click('#login')
//       .assert.urlEquals('http://localhost:8000/login')
//       .setValue('input[name=email]', 'user@dms.com')
//       .setValue('input[name=password]', 'amaladudu')
//       .click('button')
//       .waitForElementVisible('div.page', timeout)
//       .click('.btn-floating')
//     //   .waitForElementVisible('.modal-content', timeout)
//     //   .waitForElementVisible('.rdw-editor-wrapper', timeout)
//       .setValue('input[name=title]', newTitle)
//       .click('.DraftEditor-editorContainer')
//       .click('select option[value="public"]')
//       .click('.rdw-editor-wrapper')
//       .setValue('.home-editor', "faker.lorem.paragraphs()")
//     //   .click('.mce-floatpanel .mce-container-body button')
//     //   .waitForElementVisible('button.pink', timeout)
//       .click('#save-doc')
//     //   .waitForElementVisible('.doc_success', timeout)
//     //    .assert.containsText('.doc_success', 'Document Created Succesfully')
//     //   .click('button.modal-close')
//     //   .waitForElementVisible('div.page', timeout)
//     //   .assert.containsText('.email-title', '')
//       .end();
//   },

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
      .setValue('input#search', 'The Wolf')
      .keys(browser.Keys.ENTER)
      .waitForElementVisible('.card')
    //   .click('.email-title')
    //   .waitForElementVisible('.email-content')
      .assert.containsText('.title', 'The Wolf')
      .end(),

//   'Edit document': (browser) => {
//     browser
//         .url(url)
//         .waitForElementVisible('body', timeout)
//         .click('#login')
//         .waitForElementVisible('.modal')
//         .setValue('input[id=username-login]', 'maximuf')
//         .setValue('input[id=password-login]', 'maximuf123')
//         .click('#login-btn')
//         .click('button.waves-effect')
//         .waitForElementVisible('#dashboard', timeout)
//         .click('.email-title')
//         .waitForElementVisible('#email-details', timeout)
//         .click('.edit')
//         .waitForElementVisible('.email-content', timeout)
//         .clearValue('input#title')
//         .setValue('input#title', 'editedTitle')
//         .click('button.waves-effect')
//         .waitForElementVisible('#email-list', timeout)
//         .assert.containsText('.email-subject', 'editedTitle');
//     browser.end();
//   },

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
    //   .click('select option[value="private"]')
      .waitForElementVisible('.card', timeout)
    //   .click('.email-title')
      .waitForElementVisible('.card-content', timeout)
      .click('.deletebutton')
      .waitForElementVisible('.sweet-alert', timeout)
      .click('.confirm');
    browser.end();
  }
};

