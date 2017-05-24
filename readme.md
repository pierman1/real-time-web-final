# Real-time-web


![Spotifylogo](readme_imgs/logo.png)

-------------

## Table of contents

- [1. Project](#1-project)
- [2. Process](#2-process)
- [3. How does it work?](#3-how-does-it-work)
- [4. Results](#4-results)
- [5. Tooling](#5-tooling)
- [6. Requests](#6-requests)
- [7. Socket events](#7-socket)
- [8. Instructions](#8-instructions)
- [9. Offline](#9-offline)
- [10. Feature list](#10-feature-list)
- [11. Wishlist](#11-wish-list)

------------------------------


**Deployed app:**

https://spotify-share-playlist.herokuapp.com/

### 1 Project

By using the Spotify API, I made it possible to share your playlists real-time with each other
same with your artists. This allows the user to stay up to date with their friends music the new playlists of his or her friends.

I also made it possible to gain additional information about the artists that you followed, their discription and genres.

**The purpose of the application.**

Stay constantly informed of each others music on Spotify. 

#### 2 Process

It was quite a process, as I wrote my first line server-side code 3 weeks ago.

I started setting up Oauth for Twitter, but because I only could find little documentation for this, I switched to
The Spotify API. Because I wannted to try to make of use Oauth, I spent a lot of time figuring this out. Maybe a little too much time.

**[OAuth](https://oauth.net/)**

An open protocol to allow secure authorization in a simple and standard method from web, mobile and desktop applications.

#### 3 How does it work?

- The user logs in with his/her spotify account (OAuth)
- The user sees a unique view of her account (username, spotify-URI)
- The user is welcomed by his username
- Then the user will see who the active users are at the moment (Real-time with socket.io).
- The user can choose from who to pick up the playlists.
- Then the user is routed to a corresponding person and the playlists.
- This playlist is updated real-time by polling every 3 seconds.


### 4 Results

#### 5 Tooling

Used packages:


*  [Session-storage]()
*  [Socket.io](https://socket.io/)
*  [Node.js](https://nodejs.org/)
*  [Express](https://expressjs.com/)
*  [EJS](https://socket.io/)


### 6 Requests

- [Get Current User’s Profile](https://developer.spotify.com/web-api/get-current-users-profile/)
- [Get a Playlist](https://developer.spotify.com/web-api/get-playlist/)
- [Get User's Folowed Artists](https://developer.spotify.com/web-api/get-followed-artists/)
- [Get an Artist](https://developer.spotify.com/web-api/get-artist/)

### 7 Socket Events (Socket.io)

[Socket.IO]()
makes it possible to make real-time bidirectional event-vased easy writable socket connections. Cross-browser and available on every
 platform, device or browser.

**New user**

At the moment when a new user logs in, it will be displayed real-time to all clients (active users).

*Example (Using Express 2.x):*

server-side:


```
io.on('connection', function (socket) {
  socket.emit('new user', { user: 'Pierre' });
});
```

So when a socket connects, socket.io will emit { user: 'Pierre' }. In this case
the user 


**User playlists**

For showing the user's playlists real-time. Every 3 seconds the playlists are polled, then by a socket.io connection it's sended to the specific user.

### 8 Instructions

**Clone this repo**

**To install this application you have to clone this repository:**

```
https://github.com/pierman1/real-time-web-final.git

cd real-time-web-final
```

**Install the dependencies:**

```
npm install
```

**.ENV file**

On spotify.developer.com you must create an application, which will give you the ** CLIENT_ID **, and the ** CLIENT_SECRET **. These should not be publicly available, store them in a .env file. ** SET THIS DATA IN THE .ENV **

**Then we can start the de server**

```
node server.js
```

or 

```
npm start
```

By using nodemon we can skip refreshing the webserver. 

```
npm nodemon -g
```

**Server.js**: Makes use of Express

#### 9 Offline

At the moment when the user can not connect to the Spotify API, another page is served that states that no connection can be made with the API.

### 10 Feature list

* [x] Oauth, self written
* [x] Real time updates of active users with socket.io
* [x] Real time updates of user playlists real time with socket.io
* [x] Real time socket connections (playlists & users)
* [x] Request users information
* [x] Get users playlists
* [x] Get playlists tracks (name, popularity etc.)
* [x] Get artist information (name, image, description, )
* [x] Store user and 'acces_token' in session (so user stays logged in untill logging out)
* [x] View each other playlists (on different routes)
* [x] User check (for doubles)

Deployed app on heroku: 
https://spotify-share-playlist.herokuapp.com/


### 11 Wishlist


* [x] Possibility to click on a specific playlist and request the songs in this playlist
* [ ] Instead of saving users in an array of objects, use a database (MongoDB).
* [ ] Show currently playing songs, so users can see what people are listening (realtime) 
* [ ] Saving playlists to your account
* [ ] Session storage > to avoid logging in alltime

**Resources:**

- https://developer.spotify.com/web-api/authorization-guide/
- https://developer.spotify.com
- https://socket.io/get-started/chat/
- https://nodejs.org/
- https://expressjs.com/
- https://www.heroku.com/