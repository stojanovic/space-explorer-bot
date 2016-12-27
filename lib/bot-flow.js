'use strict'

const fbTemplate = require('claudia-bot-builder').fbTemplate
const rp = require('minimal-request-promise')
const apiAi = require('./helpers/api-ai')
const mainMenu = require('./main-menu')
const getRoverPhotos = require('./get-rover-photos')

function botFlow(request, originalApiRequest) {
  console.log(JSON.stringify(request))
  originalApiRequest.lambdaContext.callbackWaitsForEmptyEventLoop = false

  if (!request.postback)
    return apiAi(request.text, request.sender, originalApiRequest.env.apiAiToken)
      .then(res => {
        console.log('api.ai', res)
        if (res.action === 'smalltalk.greetings' || res.action === 'input.unknown' || res.params.simplified === 'can you help')
          return rp.get(`https://graph.facebook.com/v2.6/${request.sender}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${originalApiRequest.env.facebookAccessToken}`)
            .then(response => {
              const user = JSON.parse(response.body)
              return [
                `Hello ${user.first_name}. Welcome to Space Explorer! Ready to start a journey through space?`,
                'What can I do for you today?',
                mainMenu()
              ]
            })

        return res.reply.speech || res.reply
      })

  if (request.text === 'HELLO')
    return rp.get(`https://graph.facebook.com/v2.6/${request.sender}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${originalApiRequest.env.facebookAccessToken}`)
      .then(response => {
        const user = JSON.parse(response.body)
        return [
          `Hello ${user.first_name}. Welcome to Space Explorer! Ready to start a journey through space?`,
          'What can I do for you today?',
          mainMenu()
        ]
      })

  if (request.text === 'MAIN_MENU')
    return mainMenu()

  if (request.text === 'SHOW_APOD')
    return rp.get(`https://api.nasa.gov/planetary/apod?api_key=${originalApiRequest.env.nasaApiKey}`)
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

  if (request.text === 'ISS_POSITION')
    return rp.get('https://api.wheretheiss.at/v1/satellites/25544')
      .then(response => {
        const ISS = JSON.parse(response.body)
        return [
          new fbTemplate.generic()
            .addBubble(`International Space Station`, 'Current position')
              .addImage(`https://maps.googleapis.com/maps/api/staticmap?center=${ISS.latitude},${ISS.longitude}&zoom=2&size=640x335&markers=color:red%7C${ISS.latitude},${ISS.longitude}`)
              .addButton('Show website', 'http://iss.astroviewer.net')
            .get(),
          `International Space Station:`,
          `- Latitude: ${ISS.latitude};\n- Longitude: ${ISS.longitude};\n- Velocity: ${ISS.velocity}kmh;\n- Altitude: ${ISS.altitude};\n- Visibility: ${ISS.visibility}`
        ]
      })

  if (request.text === 'PEOPLE_IN_SPACE')
    return rp.get('http://api.open-notify.org/astros.json')
      .then(response => {
        const inSpace = JSON.parse(response.body)
        return [
          `There are ${inSpace.number} people in Space right now.`,
          inSpace.people.reduce((response, person) => {
            return response + `- ${person.name}` + ((person.craft) ? ` is on ${person.craft}` : '') + ';\n'
          }, '')
        ]
      })

  if (request.text === 'MAIN_MENU')
    return mainMenu()

  if (request.text === 'CURIOSITY_IMAGES')
    return getRoverPhotos('curiosity', null, originalApiRequest.env.nasaApiKey)

  if (request.text === 'OPPORTUNITY_IMAGES')
    return getRoverPhotos('opportunity', null, originalApiRequest.env.nasaApiKey)

  if (request.text === 'SPIRIT_IMAGES')
    return getRoverPhotos('spirit', null, originalApiRequest.env.nasaApiKey)

  if (request.text.indexOf('PHOTOS_') === 0) {
    const args = request.text.split('_')
    return getRoverPhotos(args[1], args[2], originalApiRequest.env.nasaApiKey)
  }

  if (request.text === 'ABOUT_APOD')
    return [
      `The Astronomy Picture of the Day is one of the most popular websites at NASA. In fact, this website is one of the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.`,
      `Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.`,
      new fbTemplate.button('More actions:')
        .addButton('Show photo', 'SHOW_APOD')
        .addButton('Visit website', 'http://apod.nasa.gov/apod/')
        .addButton('Back to start', 'MAIN_MENU')
        .get()
    ]

  if (request.text === 'ABOUT')
    return [
      `Space Explorer is simple Messenger chat bot that uses NASA's API to get the data and images about the space`,
      `It's created for fun and also as a showcase for Claudia Bot Builder, node.js library for creating chat bots for various platform and deploying them on AWS Lambda`,
      new fbTemplate.button('More actions:')
        .addButton('Claudia Bot Builder', 'https://github.com/claudiajs/claudia-bot-builder')
        .addButton('Source code', 'https://github.com/stojanovic/space-explorer-bot')
        .get()
    ]

  if (request.text === 'CREDITS')
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

module.exports = botFlow
