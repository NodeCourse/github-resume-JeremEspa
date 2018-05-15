
const request = require('request');
const express = require('express');
const Request = request.defaults({
    json: true,
    headers: {
        'User-Agent':"JeremEspa"
    }
});
const bodyParser = require('body-parser');
const app = express();

// Use Pug to render views
app.set('view engine', 'pug');

// Serve assets from the public folder
app.use(express.static('public'));

// Decode form data
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON body
app.use(bodyParser.json());

// Render the home page
app.get('/', (req, res) => {
const username = req.query.username;


    if(username) {
        Request.get({
            url: 'https://api.github.com/users/' + username
        },(err,r,body)=>{
            res.render('resume', {user:body})
        })
    }
    else{
        res.render('homepage');
    }

});




app.listen(3000);