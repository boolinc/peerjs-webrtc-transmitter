(function(){
    'use strict';

    angular
    .module('webrtc.transmitter')
    .controller('TransmitterController', TransmitterController);

    function TransmitterController($scope, $log, Media, PeerConnection) {

        var vm = this;
        vm.connectedClients = [];
        vm.transmitterData = {};

        vm.load = function () {

            Media.load().then(function (stream) {
                vm.stream = stream;
                return PeerConnection.connect('whoopsie');
            }).then(function (peer) {
                vm.bindEvents(peer);
            }).catch(function (err) {
                $log.error(err);
            });
        };

        vm.bindEvents = function (peer) {

            peer.on('connect', function (connection) {
                vm.connectedClients.push({
                    id: connection.id,
                    connDate: new Date()
                });
                peer.call(connection.id, vm.stream);
            });

        };

        vm.load();
    }

})();
