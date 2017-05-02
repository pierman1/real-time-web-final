(function () {

    var socket = io();

    socket.on('current playing', function (song) {

        console.log(song);

    });

    socket.on('show users', function (users) {

        console.log(users);

    });

    var logoutButton = document.querySelector('#logout');

    logoutButton.addEventListener('click', function () {

        AuthenticationClient.clearCookies(getApplication());

    });


})();