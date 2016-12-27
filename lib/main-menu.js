'use strict'

const fbTemplate = require('claudia-bot-builder').fbTemplate

function mainMenu() {
  return new fbTemplate.Generic()
    .addBubble(`NASA's Astronomy Picture of the Day`, 'Satellite icon by parkjisun from the Noun Project')
      .addImage('https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/apod.png')
      .addButton('Show', 'SHOW_APOD')
      .addButton('What is APOD?', 'ABOUT_APOD')
      .addButton('Website', 'http://apod.nasa.gov/apod/')
    .addBubble(`Photos from NASA's rovers on Mars`, 'Curiosity Rover icon by Oliviu Stoian from the Noun Project')
      .addImage('https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/rovers.png')
      .addButton('Curiosity', 'CURIOSITY_IMAGES')
      .addButton('Opportunity', 'OPPORTUNITY_IMAGES')
      .addButton('Spirit', 'SPIRIT_IMAGES')
    .addBubble('International Space Station', 'Space station icon by Lucid Formation from the Noun Project')
      .addImage('https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/iss.png')
      .addButton('Current position', 'ISS_POSITION')
      .addButton('Website', 'https://www.nasa.gov/mission_pages/station/')
    .addBubble('How many people are in Space right now?', 'Astronaut icon by Javier Cabezas from the Noun Project')
      .addImage('https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/astronaut.png')
      .addButton('Show', 'PEOPLE_IN_SPACE')
      .addButton('Website', 'http://www.howmanypeopleareinspacerightnow.com')
    .addBubble('Help & info', 'Monster icon by Paulo Sá Ferreira from the Noun Project')
      .addImage('https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/about.png')
      .addButton('About the bot', 'ABOUT')
      .addButton('Credits', 'CREDITS')
      .addButton('Report an issue', 'https://github.com/stojanovic/space-explorer-bot/issues')
    .get()
}

module.exports = mainMenu
