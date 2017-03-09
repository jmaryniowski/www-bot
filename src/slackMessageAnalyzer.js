'use strict';

class slackMessageAnalyzer {

  /**
   * Create a slack link format message
   *
   * @param {String} textMessage message to analyze
   * @param {String} textToSearch text to search in the message
   *
   * @return {String} slack format message link
   */
  static isTextContainedInMessage(textMessage, textToSearch) {
    return textMessage && textMessage.toLowerCase().indexOf(textToSearch) > -
      1;
  }

  /**
   * Create authorization prefix
   *
   * @param {String} uri https address
   * @param {String} credentials unsername and password
   *
   * @return {String} slack format message link
   */
  static createAuthenticationPrefix(uri, credentials) {
    return uri.replace('https://',
      'https://' + credentials.username + ':' + credentials.password + '@');
  }
}

module.exports = slackMessageAnalyzer;
