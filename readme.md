# Real-time-web


![Spotifylogo](readme_imgs/logo.png)

-------------

**Deployed app:**

https://spotify-share-playlist.herokuapp.com/

### Project

Met gebruik van de Spotify-API, heb ik het mogelijk gemaakt om je afspeellijsten real-time met elkaar
te delen. Zo kan de gebruiker constant op de hoogte blijven van de nieuwe afspeellijsten van zijn of haar vrienden.

#### Process

Het was me een process, aangezien ik mijn eerste regel server-side 3 weken geleden had geschreven.

Ik was begonnen met het opzetten van Oauth voor Twitter, omdat ik hier weinig documentatie voor kon vinden ben ik vervolgens maar overgestapt naar 
de Spotify-API. Omdat het hier ook nodig was om Oauth te gebruiken heb ik hier veel tijd aan besteedt. Misschien wel iets te veel tijd.

Omdat het allemaal een beetje kortdag was ben ik gelijk van start gegaan zonder goed na te denken over mijn concept, hierdoor had ik niet een duidelijk 
beeld van wat het zou moeten zijn.


#### Resultaten

#### Tooling

*  [Socket.io](https://socket.io/)
*  [Node.js](https://nodejs.org/)
*  [Express](https://expressjs.com/)
*  [EJS](https://socket.io/)

#### Socket Events

**New user**

Op het moment als er een nieuwe user bijkomt moet deze getoond worden bij alle clients.

**User playlists**

Voor het tonen van de playlists van de gebruiker, waar die van opgevraagd word.

### Handleinding

**Clone this repo**

```
git clone https://github.com/pierman1/real-time-web.git
cd real-time-web-2
```

Install the dependencies:

```$xslt
npm install
```

Start the app

```
node index.js
```

or 

```
npm run
```


### Feature list

* [x] Oauth, zelf geschreven
* [x] Real time updates van de gebruikers door middel van Socket.io
* [x] 

### Wishlist

* [ ] Gebruiker check, voor dubbele gebruikers
* [ ] Mogelijkheid om door te klikken op een specifieke afspeellijst en hier bij de desbetreffende nummers op vragen.
* [ ] In plaats van de gebruikers op te slaan in een array met objecten, hiervoor een database gebruiken.
 

**Resources:**

- https://socket.io/get-started/chat/
