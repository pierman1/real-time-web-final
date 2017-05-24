(function () {

    console.log('hoerrrrrx');

    var socket = io.connect('/'+thisUser+'/'+thisUrl);

    socket.on('list_update', function(tracks) {

        console.log(tracks);

        for(i=0;i<tracks.length;i++) {

            console.log(tracks[i]);

        }


    });

})();
