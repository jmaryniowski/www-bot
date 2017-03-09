<h1 align="center">www-bot</h1>
<p align="center">
    <a title='Build Status' href="https://travis-ci.org/jmaryniowski/www-bot">
        <img src='https://travis-ci.org/jmaryniowski/www-bot.svg?branch=master' alt='travis Status' />
    </a>
    <a title='coveralls Status' href='https://coveralls.io/r/jmaryniowski/www-bot'>
        <img src='https://img.shields.io/coveralls/jmaryniowski/www-bot.svg' alt='Coverage Status' />
    </a>
</p>
<p align="center">
    <a title='closed issue' href='http://issuestats.com/github/jmaryniowski/www-bot'>
        <img src='http://issuestats.com/github/jmaryniowski/www-bot/badge/issue' alt='issue stats' />
    </a>
    <a title='blog' href=''>
       <img src='https://img.shields.io/badge/style-blog-blue.svg?label=my' alt='blog' />
    </a>
</p>

## About www-bot
>www-bot is a  node.js slack bot.
Returns simple info about webpage

## Bot Command list

* Just to start type site address in the general chat after invited the bot in it

    ``` https://your-site-address  ```


## Install Getting Started
1. Create a new [bot integration](https://my.slack.com/services/new/bot)
1. Choose between **One-Click Heroku** or **Manual Heroku**

 - **One-Click Heroku**
       Click this button:

       [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

 - **Manual Heroku**
    *  Install [Heroku toolbelt](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
    * Create a new bot integration (as above)
    *  `heroku create`
    *  `heroku config:set TOKEN_SLACK=[Your Slack bot integration token (obtainable at https://my.slack.com/services/new/bot)]`
    *  `git push heroku master`


## Development

* To test www-bot

    ```$ npm run-script test```

* To debug www-bot

    ```$ npm run-script debug```

* To see the test coverage www-bot

    ```$ npm run-script coverage```

* To run www-bot on your machine

    ```$ npm run-script start```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b www-bot`
3. Commit your changes: `git commit -a `
4. Push to the branch: `git push origin www-bot`
5. Submit a pull request

## History

For detailed changelog, check [Releases](https://github.com/jmaryniowski/www-bot/releases).

### Contributors

Contributor | GitHub profile |
--- | --- | ---
Jacek Maryniowski  (Creator) | [jmaryniowski](https://github.com/jmaryniowski) |
