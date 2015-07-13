(function(){

    angular
        .module('webrtc.api')
        .service('PeerConnection', PeerConnection);

        function PeerConnection($q, $log) {

            this.connect = function(id){
                if(!id) {
                    return $q.resolve(new Peer({ key: 'evycxpu0zuissjor' }));
                }
                return $q.resolve(new Peer(id, { key: 'evycxpu0zuissjor' }));
            };
        }

})();
