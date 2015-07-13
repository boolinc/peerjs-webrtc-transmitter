(function(){
    'use strict';

    angular
        .module('webrtc.transmitter')
        .controller('TransmitterController', TransmitterController);

        function TransmitterController($log) {
            var vm = this;

            $log.info('Hello world');
        }

})();
