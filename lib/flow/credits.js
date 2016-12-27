'use strict'

const fbTemplate = require('claudia-bot-builder').fbTemplate

function credits() {
  return [
    'Claudia Bot Builder was created by Gojko Adžić, Aleksandar Simović and Slobodan Stojanović',
    'Icons used for the bot are from the Noun Project',
    '- Rocket icon by misirlou, \n- Satellite icon by parkjisun, \n- Curiosity Rover icon by Oliviu Stoian, \n- Monster icon by Paulo Sá Ferreira',
    'This bot was created by Claudia Bot Builder team',
    new fbTemplate.button('More actions:')
      .addButton('Claudia Bot Builder', 'https://github.com/claudiajs/claudia-bot-builder')
      .addButton('The Noun Project', 'https://thenounproject.com')
      .addButton('Source code', 'https://github.com/stojanovic/space-explorer-bot')
      .get()
  ]
}

module.exports = credits
