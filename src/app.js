const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
//setting up path for partials
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'GutSavvi',
        name: 'Team 6'
    })
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        helptxt: 'Need a form and some design',
        title: 'Contact Us!',
        name: 'Team 6'

    })
})

app.get('/resources', (req, res) => {
    res.render('help', {
        helptxt: 'This is some helpful text.',
        title: 'Help',
        name: 'Team 6'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        helptxt: 'This is about us and our mission',
        title: 'About Us',
        name: 'Team 6'

    })
})

app.get('/nutrition', (req, res) => {
    res.render('nutrition', {
        helptxt: 'This is where we will add the nutrition api functionaity (reference the weather app for help)',
        title: 'Nutrition',
        name: 'Team 6'

    })
})


app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    })
})

app.listen(3000, () => console.log('Server Listeing on 3000')
)