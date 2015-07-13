(function(){

    angular
        .module('webrtc.api', [])
        .config(config)
        .run(run);

        function config() { }

        function run($log) {
            $log.debug('API module successfully loaded');
        }

})();
