/*---------LOAD MODULES--------*/
const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const request = require('request');
const dotenv = require('dotenv').config();
/*-----------------------------*/

// express static folder
app.use(express.static('public')); // to add CSS

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res){

    // res.sendFile(__dirname + '/public/index.html');

    res.render('pages/index');

});

const clientId = process.env.CLIENT_ID;
const responseType = process.env.RESPONSE_TYPE;
const redirectUri = process.env.REDIRECT_URI;
const mysecret = process.env.MY_SECRET;

// users array
var users = [];

// console.log(authorizationUrl);
// var scopes = 'playlist-read-private playlist-read-collaborative';
var scopes = 'playlist-read-private playlist-read-collaborative user-read-playback-state user-read-currently-playing user-read-playback-state user-modify-playback-state';
// var scopes = 'user-read-email';
var authorizationUrl = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + clientId +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirectUri);

console.log(authorizationUrl);

app.get('/authorization', function(req, res){

    res.redirect(authorizationUrl);

});

// callback page
app.get('/callback', function (req, res) {

    var code = req.query.code;

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(clientId + ':' + mysecret).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {

        var access_token = body.access_token;
        var refresh_token = body.refresh_token;

        console.log('////////////////////');

        // user check function
        userCheck(access_token, refresh_token, res);

        // current song function
        // currentSong(access_token, refresh_token);


        // var options = {
        //     url: 'https://api.spotify.com/v1/me/player/currently-playing',
        //     headers: { 'Authorization': 'Bearer ' + access_token },
        //     json: true
        // }
        //
        // setInterval(function(){
        //
        //     request.get(options, function(error, response, body) {
        //
        //         console.log(body.item);
        //
        //         var playing = {
        //             song: body.item.name
        //         }
        //
        //         io.emit('current playing', playing);
        //
        //     });
        //
        // }, 3000);

    });

});

var userCheck = function (access_token, refresh_token, res) {

    var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    request.get(options, function(error, response, body) {

        var userName = body.id;

        console.log(userName);
        users.push(userName);

        res.locals.username = userName;
        // res.locals.users = users;

        res.render('pages/callback');

        // TODO: user check

        io.emit('show users', users);

    });

}

var currentSong = function (access_token, refresh_token) {

    var options = {
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }

    setInterval(function(){

        request.get(options, function(error, response, body) {

            // console.log(body.item);

            // var playing = {
                // name: body.item.name
            // }

            // io.emit('current playing', playing);

        });

    }, 3000);

};

app.get('/logout', function (req, res) {

    res.render('pages/logout');

});


http.listen(8888, function () {
    console.log('listening on *:8888');
});