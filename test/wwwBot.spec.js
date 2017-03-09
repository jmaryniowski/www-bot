/*global describe, it, beforeEach, afterEach */
'use strict';

var WwwBot = require('../src/wwwBot');
var expect = require('chai').expect;
var sinon = require('sinon');
var Bot = require('slackbots');

describe('Bot Initialization', function() {

  beforeEach(function() {
    this.textCheck = '';

    this.slackbotStub = sinon.stub(Bot.prototype, 'postMessage', (name,
      text, params) => {
      this.textCheck = params.attachments[0].text;
    });

    this.loginStub = sinon.stub(Bot.prototype, 'login', function() {});

    this.wwwBot = new WwwBot('Fake-token-slack', 'Fake-username',
      'Fake-password', 'Fake-uri');
    this.wwwBot.run();
  });

  afterEach(function() {
    this.slackbotStub.restore();
    this.loginStub.restore();
  });

  it('should the BOT token present', function() {
    expect(this.wwwBot.bot.token).to.be.equal('Fake-token-slack');
  });

  it('should the credentials present', function() {
    expect(this.wwwBot.credentials).to.be.eql({
      username: 'Fake-username',
      password: 'Fake-password'
    });
  });

  it('should the uri present', function() {
    expect(this.wwwBot.uri).to.be.equal('Fake-uri');
  });
});
