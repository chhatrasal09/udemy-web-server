const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b9c8be3f2e9aac7a0ffbceab2b08f418&query=' + address

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.location.lat,
                longitude: body.location.lon,
                location: body.location.name
            })
        }
    })
}

module.exports = geocode