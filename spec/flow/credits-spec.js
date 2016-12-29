/* global describe, it, expect */
'use strict'

const credits = require('../../lib/flow/credits')
const expected = [
  'Claudia Bot Builder was created by Gojko Adžić, Aleksandar Simović and Slobodan Stojanović',
  'Icons used for the bot are from the Noun Project',
  '- Rocket icon by misirlou, \n- Satellite icon by parkjisun, \n- Curiosity Rover icon by Oliviu Stoian, \n- Monster icon by Paulo Sá Ferreira',
  'This bot was created by Claudia Bot Builder team',
  {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'More actions:',
        buttons: [{
          title: 'Claudia Bot Builder',
          type: 'web_url',
          url: 'https://github.com/claudiajs/claudia-bot-builder'
        }, {
          title: 'The Noun Project',
          type: 'web_url',
          url: 'https://thenounproject.com'
        }, {
          title: 'Source code',
          type: 'web_url',
          url: 'https://github.com/stojanovic/space-explorer-bot'
        }]
      }
    }
  }
]

describe('Credits', () => {
  it('should be a function', () => {
    expect(typeof credits).toBe('function')
  })

  it('should transform the template to the expected json', () => {
    expect(credits()).toEqual(expected)
  })
})
