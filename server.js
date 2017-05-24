/*--------- Load modules --------*/
const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const request = require('request');
const dotenv = require('dotenv').config();
const session = require('express-session');
const store = require('store');
/*------------------------------*/

/*--------- Spotify acces --------*/
const clientId = process.env.CLIENT_ID;
const responseType = process.env.RESPONSE_TYPE;
const redirectUri = process.env.REDIRECT_URI;
const mysecret = process.env.MY_SECRET;
/*-------------------------------*/

// Use the session middleware
app.use(session({secret:'a08873ljadfasf', resave:false, saveUninitialized: true}));
// Todo: hide secret in env.

// express static folder
app.use(express.static('public')); // to add CSS/JS

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res){

    // if there is a session
    if(req.session.user) {

        res.redirect('/authorization');

    } else {

        res.render('pages/index');

    }

});

// users array
var users = [];

// console.log(authorizationUrl);
// var scopes = 'playlist-read-private playlist-read-collaborative';
var scopes = 'user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative user-read-playback-state user-read-currently-playing user-read-playback-state';
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
        if (!error && response.statusCode === 200) {

            // variables with user-accestoken
            var access_token = body.access_token;
            var refresh_token = body.refresh_token;


            io.on('connection', function (socket) {

                var socketId = socket.id;

                console.log(socketId);

                io.to(socketId).emit('store local', access_token);


            });

            // show user info
            showUserInfo(access_token, refresh_token, res, req);


        } else {

            res.render('pages/offline');

        }

    });

});

var showUserInfo = function (access_token, refresh_token, res, req) {

        var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
        }

        request.get(options, function (error, response, body) {

            // save user to session
            req.session.user = {
                username: body.id,
                acces_token: access_token
            };

            // show user
            res.locals.username     = body.id;
            res.locals.type         = body.type;
            res.locals.uri          = body.uri;
            res.locals.externalurl  = body.external_urls.spotify;

            res.render('pages/profile');

        });

};

app.get('/following', function (req, res) {

    var access_token = req.session.user.acces_token;

    var options = {
        url: 'https://api.spotify.com/v1/me/following?type=artist&limit=45',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }

    request.get(options, function (error, response, body) {

        console.log(body.artists.items[1]);

        // // show user
        res.locals.artists     = body.artists.items;
        res.locals.popularity  = body.artists.items.popularity;
        res.locals.followers   = body.artists.items.followers;
        res.locals.id          = body.artists.items.id;

        res.render('pages/following-artists');

    });

});

app.get('/home', function (req, res) {

    var access_token = req.session.user.acces_token;

    // user check function
    console.log('getting here');

    var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    request.get(options, function(error, response, body) {

        var userName = body.id;

        // new user constructor
        function user(username, accestoken) {

            this.user_name = username;
            this.acces_token = accestoken;

        };

        // loop true all values of users to check for doubles
        if (typeof userName !== "undefined") {

            var foundUser = false
            users.forEach(function (el, index) {
                if (el.user_name == userName) {
                    foundUser = true
                }
            })

            if (!foundUser) {
                users.push(
                    user = new user(userName, access_token)
                );
            }

        }

        console.log(userName);
        console.log(users);

        // send username and users when rendering
        res.locals.username = userName;
        res.locals.users    = users;

        console.log(users.length);

        res.render('pages/home');

        io.sockets.emit('new user', users);

    });

});

app.get('/playlist/:id', function(req, res) {

    var access_token = req.session.user.acces_token;

    var options = {
        url: 'https://api.spotify.com/v1/users/spotify/playlists/' + req.params.id,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    request.get(options, function(error, response, body) {

            res.locals.name          = body.name;
            // res.locals.description   = body.description;
            res.locals.tracks        = body.tracks.items;
            res.locals.thisUser          = 'Spotify';

            res.render('pages/song-list');


    });


});

app.get('/user/:id', function (req, res) {

    var user = req.params.id;

    var access_token = req.session.user.acces_token;

    var options = {
        url: 'https://api.spotify.com/v1/users/' + user + '/playlists',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }



    setInterval(function(){

        request.get(options, function(error, response, body) {

            var albums = body.items;
            /*
            emits 'event_1' to client where user is logged in:
            -req.params.id = user_ID
            -event_1 = socket key name that refers to function on the client JS/IO
            */
            io.of('/' + req.params.id).emit('event_1', albums);

            res.locals.user = user;

        });

    }, 3000);

    res.locals.user = user;

    request.get(options, function(error, response, body) {

        console.log(body.items);
        io.of('/' + req.params.id).emit('event_1', body.items);

        res.locals.user = user;
        res.render('pages/user', {
            albums : body.items
         });
    });

});

app.get('/user/:id/:list', function (req, res) {

    var access_token = req.session.user.acces_token;

    var options = {
        url: 'https://api.spotify.com/v1/users/' + req.params.id + '/playlists/' + req.params.list,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    setInterval(function(){

        request.get(options, function(error, response, body) {

            console.log('woeha');

            //used for magic.  Unicorns are loading data to client!
            /*
             emits 'event_1' to client where user is logged in:
             -req.params.id = user_ID
             -event_1 = socket key name that refers to function on the client JS/IO
             */
            io.of('/' + req.params.id + '/' + req.params.list).emit('list_update', body);

        });

    }, 3000);


    // console.log(options.url);

    request.get(options, function(error, response, body) {

        res.locals.name          = body.name;
        // res.locals.description   = body.description;
        res.locals.tracks        = body.tracks.items;
        res.locals.thisUser      = req.params.id;

        res.render('pages/song-list');

    });

    // Todo: update list with socket


});

app.get('/404', function (req, res) {

    res.render('pages/404');

});

app.get('/artist/:artist', function (req, res) {

    console.log('/////////////////////////////')

    console.log(req.params.artist);

    var id = req.params.artist;

    var access_token = req.session.user.acces_token;

    var options = {
        url: 'https://api.spotify.com/v1/artists/' + id,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }

    request.get(options, function(error, response, body) {

        console.log(body.genres);

        // show artist profile
        res.locals.name     = body.name;
        res.locals.image    = body.images[1].url;
        res.locals.genres    = body.genres;

        res.render('pages/artist');

    });

});

app.get('/logout', function (req, res) {

    res.render('pages/user');

});

// http.listen(8888, function () {
http.listen(process.env.PORT || 5000, function () {

        console.log('listening on *:8888');

});