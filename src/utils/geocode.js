const request = require('request');
const geocode = (address, callback) => {
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9zc3ludyIsImEiOiJja2dzMHRwc3QxYmxhMnJtdDNyeDh3am91In0.WBEkHVGhwzYYqIY5fYdBLg&limit=1`;
    request({url, json: true}, (err, {body}) =>{
        console.log("geocode data: ", body);
        if (err) {
            callback("Unable to connect to location api.");
        } else if (!body.features.length) {
            callback("Unable to find location.");
        } else {
            const location = body.features[0].place_name;
            const longitude = body.features[0].center[1];
            const latitude = body.features[0].center[0];
            const data = location + ' Latitude:' + latitude + ' Longitude:' + longitude; 
            callback(undefined,{location:location,longitude:longitude,latitude:latitude});
        }
    })
}

module.exports = geocode;