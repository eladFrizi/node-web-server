const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

var app = express();

// resister compenent for hbs
hbs.registerPartials(__dirname + '/views/partials');
// let express know that we use hbs
app.set('view engine', 'hbs')


//middleware to register all the actions in file;
app.use((req, res, next) => {
    let now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    //create new file or add to exist file
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err)  console.log('Unable to append to server.log.')
    })
    // the next function invoke the next function in the chain.
    next();
});

// exmaple for middaleware without next
// app.use((req, res, next)=>{
//     res.render('maintenace.hbs')
// })

// tell express what is the path of the files,
// __dirname is the current location
app.use(express.static(__dirname + '/public'));

// function in hbs
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        'welcomeMassage': 'Welcome to my site'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMassage: 'Unable to handle request'
    });
});
app.listen(3000, () => {
    console.log('Server is up on port 3000')
});