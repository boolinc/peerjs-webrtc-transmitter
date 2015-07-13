(function(){
    'use strict';

    angular
        .module('webrtc', [
            'webrtc.templates', 'webrtc.transmitter'
        ])
        .config(config)
        .run(run);

        function config($logProvider, $locationProvider, $urlRouterProvider){
            $logProvider.debugEnabled(true);

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            $urlRouterProvider.otherwise('/transmitter');

        }

        function run($log) {
            $log.info('Application successfully initialized');
        }

})();
