'use strict'

const rp = require('minimal-request-promise')
const fbTemplate = require('claudia-bot-builder').fbTemplate

function getRoverPhotos(rover, sol, nasaApiKey) {
  if (!sol)
    sol = (parseInt(Math.random() * 9) + 1) * 100

  return rp.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${nasaApiKey}`)
    .then(response => {
      let rawBody = response.body

      let roverInfo = JSON.parse(rawBody)
      let photos = roverInfo.photos.slice(0, 10)
      let roverImages = new fbTemplate.generic()

      photos.forEach(photo => {
        return roverImages.addBubble(photo.rover.name, `At ${photo.earth_date} (sol ${photo.sol}), using ${photo.camera.full_name}`)
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

module.exports = getRoverPhotos
