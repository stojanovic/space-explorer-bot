'use strict'

const rp = require('minimal-request-promise')

function peopleInSpace() {
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
}

module.exports = peopleInSpace
