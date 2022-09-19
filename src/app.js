const path = require('path')
const express = require('express')
// required only for partials dir. partials is a hbs file that can be accessed by everyother hbs file
const hbs = require('hbs')
// import geocode and forecast funcs
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// required when deploying to heroku
const port = process.env.PORT || 3000

const app = express()

// Define paths for Express config

// required to define ALL files in public. you can have html files there too but wont be dynamic
const publicDirectoryPath = path.join(__dirname, '../public')
// access views dir in template. not required of the views dir is directly in webserver dir
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
// hbs files MUST be in a views dir
app.set('view engine', 'hbs')
// set up path. not required if views is in the web server dir
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve. accesses ALL files in public dir
app.use(express.static(publicDirectoryPath))

// define all routes. route definition not required for html files in public dir. Used for hbs files
// hbs files have access to nodejs and partials unlike html files. they are therefore dynamic

// home page. render the name of the hbs file
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chidinma Nwoye '
    })
})

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chidinma Nwoye '
    })
})

// help page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Chidinma Nwoye '
    })
})

app.get('/weather', (req, res) => {
    // if no address is requested from browser's url
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
// geocode func has two parameters, address and callback. call back has two parameter, error and response/data
// instead of typing data and then getting log,lat and loc in planty lines of code (data.lat), use destructuring as seen below
// assign destrustured data to empty object incase of no address is input
// error is defined in the geocode func already
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
        // use return to stop code, using res-send twice will lead to error, always use return to stop code
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
// send response to browser
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// create error routes and link to error hbs file
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chidinma Nwoye ',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chidinma Nwoye ',
        errorMessage: 'Page not found.'
    })
})

// use this to make the server run without deployment. server won't run without this code
// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })
// after deployment
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})





