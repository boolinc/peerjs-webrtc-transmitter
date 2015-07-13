(function(){

    angular
        .module('webrtc.api')
        .service('PeerConnection', PeerConnection);

        function PeerConnection($q) {

            this.connect = function(id){
                var peer = new Peer(id, { key: 'evycxpu0zuissjor' });
                return $.resolve(peer);
            };
        }

})();
