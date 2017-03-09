'use strict';

var Bot = require('slackbots');
var assert = require('assert');
var slackMessageAnalyzer = require('./slackMessageAnalyzer');
var request = require('request');
var cheerio = require('cheerio');
var chalk = require('chalk');
var urlPattern =
  /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
var regex = new RegExp(urlPattern);

class WwwBot {

  /**
   * @param {String} slackToken Your Slack bot integration token (obtainable at https://my.slack.com/services/new/bot)
   */
  constructor(slackToken, username, password, uri) {
    assert(slackToken,
      'Slack Token is necessary obtain it at https://my.slack.com/services/new/bot and copy in configBot.json'
    );

    assert(username,
      'Username is necessary. Provide username in configBot.json'
    );

    assert(password,
      'Username is necessary. Provide username in configBot.json'
    );

    var settingsBot = {
      token: slackToken,
      name: 'www-bot'
    };

    this.credentials = {
      username: username,
      password: password
    };

    this.uri = uri;

    this.bot = new Bot(settingsBot);
  }

  run() {
    console.log(chalk.bgGreen(' * * * * * * www-bot started! * * * * * * '));
    this._listenerHelloMessage();
  }

  /**
   * Post a message on slack chat in answer to hello
   */
  _listenerHelloMessage() {
    this._listenerMessage(this.isJiraLinkInMessage, (function(message) {
      var uri = regex.exec(message.text)[0],
        authUri = slackMessageAnalyzer.createAuthenticationPrefix(uri,
          this.credentials);

      //need to disable SSL certificates
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      //request given uri
      console.log(chalk.green('requesting uri: ' + uri));
      request(authUri, function(error, response, body) {
        if (error) {
          console.log(chalk.red('error requesting: ' + uri));
          return;
        }
        console.log(chalk.green('requesting uri: ' + uri +
          ':success'));

        var $ = cheerio.load(body),
          msg = $('title').text();

        this.postSlackMessage(msg, uri, null, null, uri, uri,
          message.channel);
      }.bind(this));
    }).bind(this));
  }

  /**
   * Post a message in the slack general chat
   *
   * @param {String} message
   * @param {String} fallback
   * @param {successColor|failColor|infoColor} color of the vertical line before the message default infoColor yellow
   * @param {Array} fields is an Array of messages  { 'title': 'Project', 'value': 'Awesome Project','short': true},
   * @param {String} title title message,
   * @param {String} titleLink link message
   * @param {String} nameChannelOrUser where posts a message  channel | group | user by name,
   */
  postSlackMessage(message, fallback, color, fields, title, titleLink,
    nameChannelOrUser) {
    var params = {
      as_user: true,
      attachments: [{
        'fallback': fallback,
        'color': color || this.infoColor,
        'title': title ? title : 'jira-bot',
        'title_link': titleLink,
        'text': message,
        'fields': fields,
        'mrkdwn_in': ['text', 'pretext']
      }]
    };

    this.bot.postMessage(nameChannelOrUser, '', params);
  }

  /**
   * Call a callback in the case a message from slack meets the condition
   *
   * @param {Boolean}  condition to meet to call the callback
   * @param {Function} callback to call if the condition is satisfied
   */
  _listenerMessage(condition, callback) {
    this.bot.on('message', (function(message) {
      if (condition.call(this, message.text)) {
        callback.call(this, message);
      }
    }).bind(this));
  }

  /**
   * recognize if in the message is present the jira address
   *
   * @param {String} textMessage to analyze
   */
  isJiraLinkInMessage(textMessage) {
    return slackMessageAnalyzer.isTextContainedInMessage(textMessage,
      this.uri);
  }
}

module.exports = WwwBot;
