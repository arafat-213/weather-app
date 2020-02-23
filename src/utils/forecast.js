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
            callback(undefined, body.daily.data[0].summary+'<br/>It is currently ' + body.currently.temperature + ' degrees out there.<br/>The high today is '+body.daily.data[0].temperatureMax+' with a low of '+body.daily.data[0].temperatureMin+'.<br>There are ' + body.currently.precipProbability + ' % chances of rain')   
    })
}

module.exports = forecast