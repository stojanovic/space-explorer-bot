/* global describe, it, expect */
'use strict'

const aboutApod = require('../../lib/flow/about-apod')
const expected = [
  'The Astronomy Picture of the Day is one of the most popular websites at NASA. In fact, this website is one of the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.',
  'Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.',
  {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'More actions:',
        buttons: [{
          title: 'Show photo',
          type: 'postback',
          payload: 'SHOW_APOD'
        }, {
          title: 'Visit website',
          type: 'web_url',
          url: 'http://apod.nasa.gov/apod/'
        }, {
          title: 'Back to start',
          type: 'postback',
          payload: 'MAIN_MENU'
        }]
      }
    }
  }
]

describe('About APOD', () => {
  it('should be a function', () => {
    expect(typeof aboutApod).toBe('function')
  })

  it('should transform the template to the expected json', () => {
    expect(aboutApod()).toEqual(expected)
  })
})
