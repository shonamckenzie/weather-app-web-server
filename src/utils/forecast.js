const request = require('request');

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/65304c9040d4f6057433eeffbfc7f495/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?units=si'

    request({ url: url, json: true}, (error, res) => {
        if (error){
            callback('Unable to connect to weather service', undefined);
        } else if (res.body.error){
            callback('Unable to find location', undefined);       
        } else {
            callback(undefined, `${res.body.daily.data[0].summary} It is currently ${res.body.currently.temperature}°C. Todays high is ${res.body.daily.data[0].temperatureHigh}°C and low is ${res.body.daily.data[0].temperatureLow}°C. There is a ${res.body.currently.precipProbability}% chance of rain. The windspeed is currently ${(res.body.currently.windSpeed*2.237).toFixed(2)} miles per hour`);
       }
    })
}

  module.exports = forecast