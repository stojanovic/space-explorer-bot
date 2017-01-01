/* global describe, it, expect */
'use strict'

const mainMenu = require('../lib/main-menu')
const expected = {
  attachment: {
    type: 'template',
    payload: {
      template_type:'generic',
      elements: [{
        title: 'NASA\'s Astronomy Picture of the Day',
        subtitle: 'Satellite icon by parkjisun from the Noun Project',
        image_url: 'https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/apod.png',
        buttons: [{
          title: 'Show',
          type: 'postback',
          payload: 'SHOW_APOD'
        }, {
          title: 'What is APOD?',
          type: 'postback',
          payload: 'ABOUT_APOD'
        }, {
          title: 'Website',
          type: 'web_url',
          url: 'http://apod.nasa.gov/apod/'
        }]
      }, {
        title: 'Photos from NASA\'s rovers on Mars',
        subtitle: 'Curiosity Rover icon by Oliviu Stoian from the Noun Project',
        image_url: 'https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/rovers.png',
        buttons: [{
          title: 'Curiosity',
          type: 'postback',
          payload: 'CURIOSITY_IMAGES'
        }, {
          title: 'Opportunity',
          type: 'postback',
          payload: 'OPPORTUNITY_IMAGES'
        }, {
          title: 'Spirit',
          type: 'postback',
          payload: 'SPIRIT_IMAGES'
        }]
      }, {
        title: 'International Space Station',
        subtitle: 'Space station icon by Lucid Formation from the Noun Project',
        image_url: 'https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/iss.png',
        buttons: [{
          title: 'Current position',
          type: 'postback',
          payload: 'ISS_POSITION'
        }, {
          title: 'Website',
          type: 'web_url',
          url: 'https://www.nasa.gov/mission_pages/station/'
        }]
      }, {
        title: 'How many people are in Space right now?',
        subtitle: 'Astronaut icon by Javier Cabezas from the Noun Project',
        image_url: 'https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/astronaut.png',
        buttons: [{
          title: 'Show',
          type: 'postback',
          payload: 'PEOPLE_IN_SPACE'
        }, {
          title: 'Website',
          type: 'web_url',
          url: 'http://www.howmanypeopleareinspacerightnow.com'
        }]
      }, {
        title: 'Help & info',
        subtitle: 'Monster icon by Paulo Sá Ferreira from the Noun Project',
        image_url: 'https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/about.png',
        buttons: [{
          title: 'About the bot',
          type: 'postback',
          payload: 'ABOUT'
        }, {
          title: 'Credits',
          type: 'postback',
          payload: 'CREDITS'
        }, {
          title: 'Report an issue',
          type: 'web_url',
          url: 'https://github.com/stojanovic/space-explorer-bot/issues'
        }]
      }]
    }
  }
}

describe('Main menu', () => {
  it('should be a function', () => {
    expect(typeof mainMenu).toBe('function')
  })

  it('should transform the template to the expected json', () => {
    expect(mainMenu()).toEqual(expected)
  })
})
