var WwwBot = require('./WwwBot');
var nconf = require('nconf');
var minimist = require('minimist');
var chalk = require('chalk');

nconf.add('config', {
  type: 'file',
  file: './configBot.json'
});

try {
  var tokenSlack = process.env.TOKEN_SLACK || nconf.get('tokenslack'),
    args = minimist(process.argv),
    username = args.username || nconf.get('username'),
    password = args.password || nconf.get('password'),
    uri = args.uri || nconf.get('uri');

  this.wwwBot = new WwwBot(tokenSlack, username, password, uri);
  this.wwwBot.run();
} catch (error) {
  console.log(' * * * * * * ' + chalk.red('Bot failed ' + error) +
    ' * * * * * * ');
}
