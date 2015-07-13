(function(){
    'use strict';

    angular
        .module('webrtc', [
            'webrtc.transmitter', 'webrtc.templates'
        ])
        .config(config)
        .run(run);

        function config($logProvider, $locationProvider, $urlRouterProvider){
            $logProvider.debugEnabled(true);

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            $urlRouterProvider.otherwise('/');

        }

        function run($log) {
            $log.info('Application successfully initialized');
        }

})();
