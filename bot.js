'use strict'

const rp = require('minimal-request-promise')
const botBuilder = require('claudia-bot-builder')
const fbTemplate = botBuilder.fbTemplate

module.exports = botBuilder(request => {
  console.log(JSON.stringify(request))

  if (!request.postback)
    return rp({
      method: 'GET',
      hostname: 'graph.facebook.com',
      path: `/v2.6/${request.sender}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${request.env.facebookAccessToken}`,
      port: 443
    })
      .then(response => {
        const user = JSON.parse(response.body)
        return [
          `Hello ${user.first_name}, welcome to Space Explorer! Ready to start a new journey through the space?`,
          'What can I do for you today?',
          new fbTemplate.generic()
            .addBubble(`NASA's Astronomy Picture of the Day`, 'Satellite icon by parkjisun from the Noun Project')
              .addImage('https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/apod.png')
              .addButton('Show', 'SHOW_APOD')
              .addButton('What is APOD?', 'ABOUT_APOD')
              .addButton('Website', 'http://apod.nasa.gov/apod/')
            .addBubble('Help & info', 'Monster icon by Paulo Sá Ferreira from the Noun Project')
              .addImage('https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/about.png')
              .addButton('About the bot', 'ABOUT')
              .addButton('Credits', 'CREDITS')
              .addButton('Report an issue', 'https://github.com/stojanovic/space-explorer-bot/issues')
            .get()
        ]
      })

  if (request.text === 'SHOW_APOD')
    return rp({
      method: 'GET',
      hostname: 'api.nasa.gov',
      path: `/planetary/apod?api_key=${request.env.nasaApiKey}`,
      port: 443
    })
      .then(response => {
        const APOD = JSON.parse(response.body)
        console.log(response.body)
        return [
          `NASA's Astronomy Picture of the Day for ${APOD.date}`,
          `"${APOD.title}", © ${APOD.copyright}`,
          new fbTemplate.image(APOD.url).get(),
          APOD.explanation,
          new fbTemplate.button('Additional actions:')
            .addButton('Download HD', APOD.hdurl)
            .addButton('Visit website', 'http://apod.nasa.gov/apod/')
            .get()
        ]
      })

  if (request.text === 'ABOUT_APOD')
    return [
      `The Astronomy Picture of the Day is one of the most popular websites at NASA. In fact, this website is one of the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.`,
      `Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.`
    ]

  if (request.text === 'ABOUT')
    return `TODO: Add short about text`

  if (request.text === 'CREDITS')
    return `TODO: Add short credits text (icons, claudia, etc.)`
})
