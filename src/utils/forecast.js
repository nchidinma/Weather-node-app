const request = require('request')

const forecast = (latitude, longitude, callback) => {
    // use units to convert any value, f is converting temp to farenheit
    const url = 'http://api.weatherstack.com/current?access_key=0f2dc622a5392bfb10953cd567179487&query=' + latitude + ','+ longitude
    
    // setting json to true will help parse data and print only relevant weather info
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            // if theres no response at all after running due to maybe no internet service
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            // if there's response but response body has error- this could be due to no input vals for log and lat
            callback('Unable to find location', undefined)
        } else {
            // get the correct value to use (curret, temp etc) from weatherstack documentation
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees celsius out, the wind direction is " + response.body.current.wind_dir + " and the humidity is " + response.body.current.humidity + "%.")
        }
    })
}

module.exports = forecast