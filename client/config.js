/**
 * Created by AWardwell on 4/26/15.
 */

require.config({
    baseUrl: 'client/lib',
    paths: {
        'exe': '/client',
        'underscore': 'underscore-min',
        'backbone': 'backbone-min',
        'jquery': ['http://code.jquery.com/jquery-1.11.1.js', 'jquery-2.1.3.min'],
        'io': 'socket.io',
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'io' : {
            exports: 'io'
        }
    },
    //urlArgs: "v=" + Math.random(),
    //urlArgs: "v=2",
    waitSeconds: 0
});

