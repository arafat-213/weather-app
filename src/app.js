const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//Defines path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

const app = express()

// Getting port number from heroku, sets port = 3000 if not assigned by heroku
const port = process.env.PORT || 3000

//Setup handle bar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    })
})

// Weather end point reads weather from Query string and gives back weather data
app.get('/weather', (req, res) => {
    if(!req.query.city) {
        return res.send({
            error: 'Please enter city name to search for weather'
        })
    }
        
    geocode(req.query.city, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
            forecast(latitude, longitude, (error, forecastData = {}) => {
                if (error)
                {
                    res.send({error})
                }
                    res.send({
                        forecast: forecastData,
                        location,
                        city: req.query.city
                    }); 
                    console.log(forecastData); 
            })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Wubba Lubba Dubb Dubbbbb',
        title: 'Help!'
    })
})

//Reads all the undefined routes for help/....
app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'Error 404: Help page not found'
    })
})


// Reads all the undefined routes and sends the error.
app.get('*', (req, res) => {
    res.render('404', {
        msg: 'Error 404: Page not found'
    })
})
app.listen(port, () => {
    console.log("Server is up on port ", port);
})