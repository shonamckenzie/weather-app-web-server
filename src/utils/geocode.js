const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hvbmFtYWMiLCJhIjoiY2sweThqemN0MDFzNjNjcGV5N2UxYnBheCJ9.ZN_nFaar_DLqj0mAjWBliQ&limit=1'

    request({ url: url, json: true}, (error, res) => {
        if (error){
            callback('Unable to connect to location services', undefined)
        } else if (res.body.features.length === 0 || !res.body.features){
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode