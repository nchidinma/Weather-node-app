const request = require('request')

// create a function that you can callback and use as many times as possible for diff addresses
const geocode = (address, callback) => {
    // use limit to limit search for los angeles as there are different los angeles
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address+ '.json?access_token=pk.eyJ1IjoiY2hpZGlubWFuIiwiYSI6ImNsODMzM2VibDAyM3EzdnBmM3BhbzA0a2wifQ.AXiXEzi_611YlC_MmeVa4g&limit=1'
    // setting json to true will help parse data and print only relevant info
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            // in app file, callback has 2 parameters, so define for error and data when using callback
            // if theres no response at all after running due to maybe no internet service
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            //features is empty when an invalid location is inpu
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                // get the correct value to use (features, 1, 0) from mapbox webservices
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}
// export function
module.exports = geocode