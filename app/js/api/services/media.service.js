(function(){
    'use strict';

    var getUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia
    );

    angular
        .module('webrtc.api')
        .service('Media', Media);

        function Media($q) {

            this.load = function () {
                var deferred = $q.defer();

                getUserMedia({ video: false, audio: true }, function(stream) {
                    deferred.resolve(stream);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };
        }

})();
