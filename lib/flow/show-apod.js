'use strict'

const rp = require('minimal-request-promise')
const fbTemplate = require('claudia-bot-builder').fbTemplate

function showApod(nasaApiKey) {
  return rp.get(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`)
    .then(response => {
      const APOD = JSON.parse(response.body)
      return [
        `NASA's Astronomy Picture of the Day for ${APOD.date}`,
        `"${APOD.title}"` + (APOD.copyright ? `, © ${APOD.copyright}` : ''),
        APOD.media_type === 'image' ? new fbTemplate.image(APOD.url).get() : APOD.url,
        APOD.explanation,
        new fbTemplate.button('More actions:')
          .addButton('Download HD', APOD.hdurl || APOD.url)
          .addButton('Visit website', 'http://apod.nasa.gov/apod/')
          .addButton('Back to start', 'MAIN_MENU')
          .get()
      ]
    })
}

module.exports = showApod
