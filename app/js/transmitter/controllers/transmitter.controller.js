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
                return PeerConnection.connect('defaultId');
            }).then(function (peer) {
                vm.bindEvents(peer);
            }).catch(function (err) {
                $log.error(err);
            });
        };

        vm.bindEvents = function (peer) {

            peer.on('open', function (id) {
                $log.debug('Hello, this is %s', id);
            });

            peer.on('connection', function (connection) {
                $log.debug('Client connected: %s', connection.peer);
                vm.connectedClients.push({
                    id: connection.peer,
                    connDate: new Date()
                });
                peer.call(connection.peer, vm.stream);
            });

            peer.on('error', function (err) {
                $log.error(err);
            });

        };

        vm.load();
    }

})();
