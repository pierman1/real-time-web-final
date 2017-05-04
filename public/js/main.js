(function () {

    console.log('skript');

    var socket = io();

    var usersList = document.querySelector('#users-list');
    console.log(usersList);

    socket.on('new user', function (users) {


        // console.log(typeof usersList.innerHTML)

        // console.log(typeof userList)
        if(usersList !== null){
            console.log(typeof usersList.innerHTML)
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
        }
    });


    var userPlaylist = document.querySelector('#play-lists');
    console.log(userPlaylist);

    var oldAlbum = [];
    var newAlbum = [];

    if(typeof thisUser === 'undefined'){
        return;
    }
    var socket = io.connect('/'+thisUser);
    socket.on('event_1', function(albums) {

        var newAlbum = albums;

        console.log('albums -----------------------')
        console.log(albums)

    // socket.on('user playlists', function (albums) {
    //
    //     // console.log(thisUser)
    //
    //     // console.log(albums);
    //
    //     // console.log(albums[0].owner.id == thisUser)
    //

        console.log(newAlbum.length)
    console.log(oldAlbum.length)
        if(newAlbum.length > oldAlbum.length || newAlbum.length < oldAlbum.length){
            console.log('in the if')

            userPlaylist.innerHTML = "";

            for(i=0;i<albums.length;i++) {
                console.log(i)
                console.log('in the for')

                // if(albums[i].owner.id == thisUser){

                    console.log(albums[i].name);

                    var album = document.createElement('li');
                    var albumLink = document.createElement('a');


                    // console.log(users[i].name);
                    if(albums[i].owner.id == thisUser) {
                        albumLink.innerHTML = albums[i].name;
                    }else{
                        albumLink.innerHTML = '<strong>Volgend:</strong> '+ albums[i].name;
                    }
                    albumLink.href = '/user/' + albums[i].name;
                    album.appendChild(albumLink);

                    console.log(album);

                    userPlaylist.appendChild(album);
                // }
                //
                //
            }
        }

        oldAlbum = newAlbum
    })
    //
    // });

})();