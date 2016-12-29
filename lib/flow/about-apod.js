'use strict'

const fbTemplate = require('claudia-bot-builder').fbTemplate

function aboutApod() {
  return [
    `The Astronomy Picture of the Day is one of the most popular websites at NASA. In fact, this website is one of the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.`,
    `Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.`,
    new fbTemplate.Button('More actions:')
      .addButton('Show photo', 'SHOW_APOD')
      .addButton('Visit website', 'http://apod.nasa.gov/apod/')
      .addButton('Back to start', 'MAIN_MENU')
      .get()
  ]
}

module.exports = aboutApod
