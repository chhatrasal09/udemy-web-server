const path = require("path")
const express = require("express")
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "../public")))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials/'))

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather',
        name: 'Chhatrasal'
    })
})
app.get("/about", (request, response) => {
    response.render('about', {
        title: 'About Me',
        name: 'Chhatrasal'
    })
})

app.get("/help", (request, response) => {
    response.render('help', {
        title: 'Help',
        helpText: 'This is help',
        name: 'Chhatrasal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    forecast(req.query.address, (err, data) => {
        if (err) {
            return res.send({
                error: err
            })
        }
        res.send(data)
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            title: '404 NOt Found',
            name: 'Chhatrasal',
            message: 'You must provide a search trem.'
        })
    }
    res.send({
        products: []
    })
})


app.get('/help/*', (request, response) => {
    response.render('404', {
        title: '404 Not Found',
        name: 'Chhatrasal',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (request, response) => {
    response.render('404', {
        title: '404 Not Found',
        name: 'Chhatrasal',
        errorMessage: 'Page not found'
    })
})

app.listen(port, "0.0.0.0", (error) => {
    if (error) {
        return console.error(error)
    }
    console.log("Success")
})