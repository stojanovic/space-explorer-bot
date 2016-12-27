'use strict'

const fbTemplate = require('claudia-bot-builder').fbTemplate

function aboutBot() {
  return [
    `Space Explorer is simple Messenger chat bot that uses NASA's API to get the data and images about the space`,
    `It's created for fun and also as a showcase for Claudia Bot Builder, node.js library for creating chat bots for various platform and deploying them on AWS Lambda`,
    new fbTemplate.button('More actions:')
      .addButton('Claudia Bot Builder', 'https://github.com/claudiajs/claudia-bot-builder')
      .addButton('Source code', 'https://github.com/stojanovic/space-explorer-bot')
      .get()
  ]
}

module.exports = aboutBot
