# Real-time-web


![Spotifylogo](readme_imgs/logo.png)

-------------

**Deployed app:**

https://spotify-share-playlist.herokuapp.com/

### Project

Met gebruik van de Spotify-API, heb ik het mogelijk gemaakt om je afspeellijsten real-time met elkaar
te delen. Zo kan de gebruiker constant op de hoogte blijven van de nieuwe afspeellijsten van zijn of haar vrienden.

**Het doel**

Constant op de hoogte blijven van elkaars muziek op Spotify. En zo muziek met elkaar kunnen delen.

#### Process

Het was me een process, aangezien ik mijn eerste regel server-side 3 weken geleden had geschreven.

Ik was begonnen met het opzetten van Oauth voor Twitter, omdat ik hier weinig documentatie voor kon vinden ben ik vervolgens maar overgestapt naar 
de Spotify-API. Omdat het hier ook nodig was om Oauth te gebruiken heb ik hier veel tijd aan besteedt. Misschien wel iets te veel tijd.

Omdat het allemaal een beetje kortdag was ben ik gelijk van start gegaan zonder goed na te denken over mijn concept, hierdoor had ik niet een duidelijk 
beeld van wat het zou moeten zijn.

#### Hoe werkt het

- De gebruiker logt-in via zijn/haar spotify account (OAuth)
- De gebruiker wordt verwelkomt met zijn gebruikersnaam. 
- Vervolgens krijgt de gebruiker te zien wie de actieve gebruikers zijn op dit moment.
- De gebruiker kan hierna kiezen van wie hij de afspeellijsten wil opschrijven
- Dan wordt de gebruiker door geroute naar een desbetreffend persoon en de afspeellijsten.
- Door middel van het pollen (om de 3 seconden), word er op het moment van het toevoegen van een afspeellijst, deze gelijk geserveerd naar de gebruiker.


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

### Handleiding

**Clone this repo**

**Om de applicatie te installeren, moet je deze repository clonen**

```
https://github.com/pierman1/real-time-web-final.git

cd real-time-web-final
```

**Installeer de dependencies:**

```
npm install
```

**.ENV file**

Op spotify.developer.com moet je een applicatie aanmaken, hiermee krijg je vervolgens de **CLIENT_ID**, en de **CLIENT_SECRET**. Deze dienen niet openbaar beschikbaar te zijn, vandaar maak ik gebruik van een .env file. **ZET DEZE GEGEVENS IN DE .ENV**

**Start the de server**

```
node server.js
```

or 

```
npm start
```

**Server.js**: Bevat de Express server.

#### Offline

Op het moment als de gebruiker geen connectie kan maken met de API van Spotify, word er een andere pagina geserveerd waarop staat dat er geen connectie gemaakt kan worden met de API.

### Feature list

* [x] Oauth, zelf geschreven
* [x] Real time updates van de gebruikers door middel van Socket.io
* [x] Real time socket verbinding
* [x] Elkaars afspeellijsten kunnen zien, per gebruiker (verschillende routes)

Verder heb ik de applicatie live staan en deze is te bezoeken op:

https://spotify-share-playlist.herokuapp.com/


### Wishlist

* [ ] Gebruiker check, voor dubbele gebruikers
* [ ] Mogelijkheid om door te klikken op een specifieke afspeellijst en hier bij de desbetreffende nummers op vragen.
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