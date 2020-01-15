const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// remove route handler as using static assets in the form of files in public folder
// app.get('', (req, res) => {
//     res.send('Hello express!')
// })

// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shona'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shona'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        helptext: 'For help with this app please contact blah@blah.com',
        title: 'Help',
        name: 'Shona'
    })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
      if (error){
        return res.send({ error: error })
      }
        
      forecast(latitude, longitude, (error, forecastData) => {
          if (error){
            return res.send({ error: error })
        }
        res.send({
          location,
          forecast: forecastData,
          address: req.query.address
        })
      })
    })
})

app.get('/products', (req, res) => {
  // console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    errortext: 'Help article not found',
    name: 'Shona'
  })
})

app.get('*', (req, res) => {
res.render('error', {
  title: '404',
  errortext: 'Page not found',
  name: 'Shona'
})
})

app.listen(port, () => {
 console.log('Server is up on port ' + port)
})