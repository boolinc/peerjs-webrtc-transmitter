(function(){

    angular
        .module('webrtc.api')
        .service('PeerConnection', PeerConnection);

        function PeerConnection($q, $log) {

            this.connect = function(id){
                var connectionOptions = {
                    host: 'api.tandembox.co',
                    port: 80,
                    path: '/peer'
                };
                if(!id) {
                    return $q.resolve(new Peer(connectionOptions));
                }
                return $q.resolve(new Peer(id, connectionOptions));
            };
        }

})();
