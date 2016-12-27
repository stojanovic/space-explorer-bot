'use strict'

const apiAi = require('./helpers/api-ai')
const mainMenu = require('./main-menu')
const getRoverPhotos = require('./get-rover-photos')
const greeting = require('./flow/greeting')
const showApod = require('./flow/show-apod')
const issPosition = require('./flow/iss-position')
const peopleInSpace = require('./flow/people-in-space')
const aboutApod = require('./flow/about-apod')
const aboutBot = require('./flow/about-bot')
const credits = require('./flow/credits')

function botFlow(request, originalApiRequest) {
  console.log(JSON.stringify(request))
  originalApiRequest.lambdaContext.callbackWaitsForEmptyEventLoop = false

  if (!request.postback)
    return apiAi(request.text, request.sender, originalApiRequest.env.apiAiToken)
      .then(res => {
        console.log('api.ai', res)
        if (res.action === 'smalltalk.greetings' || res.action === 'input.unknown' || res.params.simplified === 'can you help')
          return greeting(request.sender, originalApiRequest.env.facebookAccessToken)

        return res.reply.speech || res.reply
      })

  if (request.text === 'HELLO')
    return greeting(request.sender, originalApiRequest.env.facebookAccessToken)

  if (request.text === 'MAIN_MENU')
    return mainMenu()

  if (request.text === 'SHOW_APOD')
    return showApod(originalApiRequest.env.nasaApiKey)

  if (request.text === 'ISS_POSITION')
    return issPosition()

  if (request.text === 'PEOPLE_IN_SPACE')
    return peopleInSpace()

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
    return aboutApod()

  if (request.text === 'ABOUT')
    return aboutBot()

  if (request.text === 'CREDITS')
    return credits()
}

module.exports = botFlow
