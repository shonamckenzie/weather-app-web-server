const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs')
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

app.get('/weather', (req, res) => {
    res.send({
        location: "Edinburgh",
        forecast: "sunshine 30 degrees"
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    
})