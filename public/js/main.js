(function () {

    console.log('works');

    var searchForm = document.querySelector('#user-search');

    var app = {
        init: function () {

            if(window.location == '/')

            search.userSearch();

        }
    };

    var search = {

        userSearch: function () {
            var searchFormInput = document.querySelector('#user-search-input');
            var searchFormSubmit = document.querySelector('#user-search-submit');

            searchFormSubmit.addEventListener("click", function(event){
                event.preventDefault();
                console.log(searchFormInput.value);

                var input = searchFormInput.value;
                var url = 'https://api.spotify.com/v1/users/' + input;

                // get user info function (XML request)
                aja()
                    .url(url)
                    .type('json')
                    .jsonPaddingName('callbackParameter')
                    .jsonPadding('someGlobalFunction')
                    .on('success', function(data){
                        //fuk cross origin policy

                        search.showUser(data);

                    })
                    .go();

            });
        },

        showUser: function (data) {

            var showShowUser = document.querySelector('#show-user');
            showShowUser.innerHTML = '';

            var link = document.createElement('a');

            var li_name     = document.createElement('li');
            var li_type     = document.createElement('li');
            var li_URI      = document.createElement('li');

            li_name.innerHTML   = 'Username: ' + data.id;
            li_type.innerHTML   = 'Type: ' + data.type;
            li_URI.innerHTML    =  'URI: ' + data.uri;

            link.href = data.external_urls.spotify;
            link.appendChild(li_name);
            link.appendChild(li_type);
            link.appendChild(li_URI);

            showShowUser.appendChild(link);

        }

    };

    app.init();

    var socket = io();

    // socket.on('store local', function (token) {
    //
    //     window.localStorage.clear();
    //
    //     localStorage.setItem(
    //         'access_token', token
    //     );
    //
    //     var token = localStorage.getItem('access_token');
    //     console.log(token);
    //
    // });

    var usersList = document.querySelector('#users-list');
    console.log(usersList);

    socket.on('new user', function (users) {

        console.log(users);

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

                // console.log(user);

                usersList.appendChild(user);

            }
        }
    });

    // console.log('stil works');

})();

(function () {

    console.log('joeehoe');

    var userPlaylist = document.querySelector('#play-lists');
    // console.log(userPlaylist);

    // console.log('getting here');

    var oldAlbum = [];
    var newAlbum = [];

    if(typeof thisUser === 'undefined'){
        console.log('no usertttt')
        return;
    }
    var socket = io.connect('/'+thisUser);
    socket.on('event_1', function(albums) {

        // console.log('woeeehoeeeahahh');

        var newAlbum = albums;

        // console.log('albums -----------------------')
        console.log(albums)

        // console.log(newAlbum.length)

        // console.log(oldAlbum.length)
        if(newAlbum.length > oldAlbum.length || newAlbum.length < oldAlbum.length){
            // console.log('in the if')

            userPlaylist.innerHTML = "";

            for(i=0;i<albums.length;i++) {
                // console.log(i)
                // console.log('in the for')

                // if(albums[i].owner.id == thisUser){

                // console.log(albums[i].images);

                var album = document.createElement('li');
                var albumLink = document.createElement('a');

                // if image avaidable add it & hide it
                if(albums[i].images.length > 0) {

                    var albumImage = document.createElement('img');
                    albumImage.src = albums[i].images[0].url;
                    albumImage.classList.add('playlist-img');
                    albumImage.classList.add('hidden');
                    album.appendChild(albumImage);

                }

                // console.log(users[i].name);
                if(albums[i].owner.id == thisUser) {
                    albumLink.href = window.location.pathname + '/' + albums[i].id;
                    albumLink.innerHTML = albums[i].name;
                }else{
                    albumLink.href = '/playlist/' + albums[i].id;
                    albumLink.innerHTML = '<strong>Volgend:</strong> '+ albums[i].name;
                }

                // albumLink.href = '/user/' + albums[i].name;
                album.appendChild(albumLink);

                album.addEventListener('click', function () {
                   // console.log(this.childNodes);
                    this.childNodes[0].classList.toggle('hidden');
                });


                // console.log(album);

                userPlaylist.appendChild(album);
            }
        }

        oldAlbum = newAlbum;
    });

})();


// playlist onclick fold
(function () {

    // var list_items = document.getElementById('play-lists').getElementsByTagName('li');
    // console.log(document.getElementById('play-lists').children.length);
    // console.log(list_items.length);
    //
    // for (i = 0; i < list_items.length; i++) {
    //
    // }

    function fold() {
        console.log('workworkworkwork')
        console.log('workworkworkwork')
        console.log('workworkworkwork')
        console.log('workworkworkwork')
    }

})();
