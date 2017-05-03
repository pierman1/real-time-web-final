(function () {

    console.log('skript');

    var socket = io();

    var usersList = document.querySelector('#users-list');
    console.log(usersList);

    socket.on('new user', function (users) {

        usersList.innerHTML = "";

        for(i=0;i<users.length;i++) {

            var user = document.createElement('li');
            var userLink = document.createElement('a');


            console.log(users[i].user_name);
            userLink.innerHTML = users[i].user_name;
            userLink.href = '/user/' + users[i].user_name;

            user.appendChild(userLink);

            console.log(user);

            usersList.appendChild(user);

        }

    });


    var userPlaylist = document.querySelector('#play-lists');
    console.log(userPlaylist);

    socket.on('user playlists', function (albums) {

        console.log(albums);

        userPlaylist.innerHTML = "";

        for(i=0;i<albums.length;i++) {

            console.log(albums[i].name);

            var album = document.createElement('li');
            var albumLink = document.createElement('a');


            // console.log(users[i].name);
            albumLink.innerHTML = albums[i].name;
            albumLink.href = '/user/' + albums[i].name;
            album.appendChild(albumLink);

            console.log(album);

            userPlaylist.appendChild(album);

        }

    });

})();