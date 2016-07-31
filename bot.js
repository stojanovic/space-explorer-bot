'use strict'

const rp = require('minimal-request-promise')
const botBuilder = require('claudia-bot-builder')
const fbTemplate = botBuilder.fbTemplate

function getRoverPhotos(rover, sol, nasaApiKey) {
  if (!sol)
    sol = (parseInt(Math.random() * 9) + 1) * 100

  return rp.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${nasaApiKey}`)
    .then(response => {
      let rawBody = response.body

      let roverInfo = JSON.parse('' + rawBody)
      let photos = roverInfo.photos.slice(0, 10)
      let roverImages = new fbTemplate.generic()

      photos.forEach(photo => {
        return roverImages.addBubble(photo.rover.name, 'At ' + photo.earth_date + ' (sol ' + photo.sol + '), using ' + photo.camera.full_name)
          .addImage(photo.img_src)
          .addButton('Download', photo.img_src)
      })

      return [
        `${roverInfo.photos[0].rover.name} rover`,
        `Landing Date: ${roverInfo.photos[0].rover.landing_date} \nTotal photos: ${roverInfo.photos[0].rover.total_photos}`,
        roverImages.get(),
        new fbTemplate.button('More actions:')
          .addButton('Show newest photos', `PHOTOS_${rover}_${roverInfo.photos[0].rover.max_sol}`)
          .addButton('Visit Wikipedia', `https://en.wikipedia.org/wiki/${rover}_(rover)`)
          .addButton('Back to start', 'MAIN_MENU')
          .get()
      ]
    })
    .catch(err => {
      console.log(err)
      return getRoverPhotos(rover, 1000, nasaApiKey)
    })
}

function mainMenu() {
  return new fbTemplate.generic()
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
    .addBubble('Help & info', 'Monster icon by Paulo Sá Ferreira from the Noun Project')
      .addImage('https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/about.png')
      .addButton('About the bot', 'ABOUT')
      .addButton('Credits', 'CREDITS')
      .addButton('Report an issue', 'https://github.com/stojanovic/space-explorer-bot/issues')
    .get()
}

module.exports = botBuilder((request, originalApiRequest) => {
  console.log(JSON.stringify(request))
  originalApiRequest.lambdaContext.callbackWaitsForEmptyEventLoop = false

  if (!request.postback)
    return rp(`https://graph.facebook.com/v2.6/${request.sender}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${originalApiRequest.env.facebookAccessToken}`)
      .then(response => {
        const user = JSON.parse(response.body)
        return [
          `Hello ${user.first_name}, welcome to Space Explorer! Ready to start a new journey through the space?`,
          'What can I do for you today?',
          mainMenu()
        ]
      })

  if (request.text === 'SHOW_APOD')
    return rp(`https://api.nasa.gov/planetary/apod?api_key=${originalApiRequest.env.nasaApiKey}`)
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
})
