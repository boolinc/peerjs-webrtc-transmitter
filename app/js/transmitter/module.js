(function(){
    'use strict';

    angular
        .module('webrtc.transmitter', [ 'ui.router' ])
        .config(config)
        .run(run);

        function config($stateProvider) {

            $stateProvider
                .state('transmitter', {
                    url: '/transmitter',
                    abstract: true
                })
                .state('transmitter.home', {
                    url: '/',
                    templateUrl: 'views/transmitter/transmitter.tpl.html',
                    controller: 'TransmitterController',
                    controllerAs: 'vm'
                });
        }

        function run($log) {
            $log.debug('Transmitter module was successfully loaded');
        }

})();
