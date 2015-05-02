/**
 * Created by AWardwell on 4/28/15.
 */
define([
        'jquery',
        'backbone',
        'exe/models/wordModel',
        'io'
    ],
    function($, Backbone, wordModel, io){
        var wordsCollection = Backbone.Collection.extend({
            model: wordModel,
            url: '/words',
            fetchSuccess: function (coll, response, options) {
                console.log('from_server');
            },
            fetchError: function (coll, response, options) {
                console.log('Error From Server');
            }
        });

        return wordsCollection;

    });
