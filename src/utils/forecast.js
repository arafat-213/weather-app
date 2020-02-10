const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/9f22bcad3ee26793a306ad7c0b7df843/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else
            callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees out here. There are ' + body.currently.precipProbability + ' % chances of rain')   
    })
}

module.exports = forecast