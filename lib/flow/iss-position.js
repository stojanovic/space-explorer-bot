'use strict'

const rp = require('minimal-request-promise')
const fbTemplate = require('claudia-bot-builder').fbTemplate

function issPosition() {
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
}

module.exports = issPosition
