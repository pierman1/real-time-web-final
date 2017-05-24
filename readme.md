# Real-time-web


![Spotifylogo](readme_imgs/logo.png)

-------------

## Table of contents

- [1. Project](#1-project)
- [2. Process](#process)
- [3. How does it work?](#how)
- [4. Results](#results)
- [5. Tooling](#tooling)
- [6. Requests](#requests)
- [7. Socket events](#socket)
- [8. Instructions](#instructions)
- [9. Offline](#offline)
- [10. Feature list](#features)
- [11. Wishlist](#wish)

------------------------------


**Deployed app:**

https://spotify-share-playlist.herokuapp.com/

### 1 Project

By using the Spotify API, I made it possible to share your playlists real-time with each other
same with your artists. This allows the user to stay up to date with their friends music the new playlists of his or her friends.

I also made it possible to gain additional information about the artists that you followed, their discription and genres.

**The purpose of the application.**

Stay constantly informed of each others music on Spotify. 

#### Process

Het was me een process, aangezien ik mijn eerste regel server-side 3 weken geleden had geschreven.

Ik was begonnen met het opzetten van Oauth voor Twitter, omdat ik hier weinig documentatie voor kon vinden ben ik vervolgens maar overgestapt naar 
de Spotify-API. Omdat het hier ook nodig was om Oauth te gebruiken heb ik hier veel tijd aan besteedt. Misschien wel iets te veel tijd.

Omdat het allemaal een beetje kortdag was ben ik gelijk van start gegaan zonder goed na te denken over mijn concept, hierdoor had ik niet een duidelijk 
beeld van wat het zou moeten zijn.

#### How does it work?

- The user logs in with his/her spotify account (OAuth)
- The user sees a unique view of her account (username, spotify-URI)
- The user is welcomed by his username
- Then the user will see who the active users are at the moment (Real-time with socket.io).
- The user can choose from who to pick up the playlists.
- Then the user is routed to a corresponding person and the playlists.
- This playlist is updated real-time by polling every 3 seconds.


### Results

#### Tooling

Used packages:


*  [Session-storage]()
*  [Socket.io](https://socket.io/)
*  [Node.js](https://nodejs.org/)
*  [Express](https://expressjs.com/)
*  [EJS](https://socket.io/)


### Requests

- [Get Current User’s Profile](https://developer.spotify.com/web-api/get-current-users-profile/)
- [Get a Playlist](https://developer.spotify.com/web-api/get-playlist/)
- [Get User's Folowed Artists](https://developer.spotify.com/web-api/get-followed-artists/)
- [Get an Artist](https://developer.spotify.com/web-api/get-artist/)

#### Socket Events (Socket.io)

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

### Instructions

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

#### Offline

At the moment when the user can not connect to the Spotify API, another page is served that states that no connection can be made with the API.

### Feature list

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

Verder heb ik de applicatie live staan en deze is te bezoeken op:

https://spotify-share-playlist.herokuapp.com/


### Wishlist


* [x] Mogelijkheid om door te klikken op een specifieke afspeellijst en hier bij de desbetreffende nummers op vragen.
* [ ] In plaats van de gebruikers op te slaan in een array met objecten, hiervoor een database gebruiken.
* [ ] De currently playing muziek per gebruiker tonen, zodat de gebruikers op de hoogte kunnen blijven van wie wat aan het luisteren is. 
* [ ] Het kunnen liken van afspeellijsten. En vervolgens deze kunnen afspelen.
* [ ] Het kunnen zien wie er daadwerkelijk online is.
* [ ] Opslaan op de server/of lokaal wie er in gelogt is. Zodat je als je terug gaat nog ziet wie er ingelogt is.

**Resources:**

- https://developer.spotify.com/web-api/authorization-guide/
- https://developer.spotify.com
- https://socket.io/get-started/chat/
- https://nodejs.org/
- https://expressjs.com/
- https://www.heroku.com/