const request = require('postman-request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b9c8be3f2e9aac7a0ffbceab2b08f418&query=' + address

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                location: body.location.name +', ' + body.location.region + ', ' + body.location.country,
                temperature: body.current.temperature,
                summary: "It is currently " + body.current.temperature + " degress out. It feels like " + body.current.feelslike + " degress out."
            })
        }
    })
}

module.exports = forecast