const request = require('request');

const forecast = (lat,long,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=7a9429cce317426c7f66e90440902dfc&query=${long},${lat}&units=f`
    request({url, json: true},(err,{body}) => {
        if (err){
            callback("The weatherstack api cannot be reached.");
        } else if (body.error) {
            callback("Unable to find location");
        } else {

            const current = body.current;
            const info = `${body.location.name}: ${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. There is a ${current.precip} chance of rain.`
            callback(undefined,info);
        } 
    })
}

module.exports = forecast;