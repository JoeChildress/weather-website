const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//getting hbs (handlebars for express) set up with express
app.set('view engine','hbs'); 

//alternate dir for hbs files instead of default 'views'
app.set('views', viewPath);

//setup static dir to serve
app.use(express.static(publicDirPath));

hbs.registerPartials(partialsPath);

 

app.get('', (req, res) => {
    //express is set up with hbs to render .hbs files from the views folder
    //pass values into render to add to the rendered page
    res.render('index',{
        title: "Weather App",
        name: "Joe Childress"
    })  
});

app.get('/about', (req, res) => {
    res.render('about',{title:'About Me', name: 'Joe Childress'});
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({error: "An address must be provided."})
    }
    geocode(req.query.address, (error,{latitude, longitude,location} ={}) => {
        if (error) {
           return res.send({error})
        }
        
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({error})
            }
            res.send({forecast: data, location, address: req.query.address});
        })
    })
        
    
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Joe Childress",
        message:'Welcome to the weather app. To get the forecast, please enter a city or geographical name and the app will render the data for you.'
    })
})

//404 for speicifc route
app.get('/help/*',(req,res)=>{
    res.render('error', {
        error: '404',
        message: 'Help article not found :(',
        name: 'Joe Childress'
    })
})

app.get('/products',(req, res) => {

    if (!req.query.search) {

        //using return stops the get from sending twice (one more time below)
        return res.send({error: 'You must provide a search query'})
    }
    res.send({products: []})
});

//404 for everything else - needs to be last
app.get('*', (req, res) => {
    res.render('error', {
        error: '404',
        message: 'Page not found :(',
        name: 'Joe Childress'
    })
})

app.listen(3000, () => { //port
    console.log("Server is running on port 3000")
}); 