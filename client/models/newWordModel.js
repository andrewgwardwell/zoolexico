/**
 * Created by AWardwell on 4/28/15.
 */
define([
        'jquery',
        'backbone',
        'io'
    ],
    function($, Backbone, io){
        var newWordModel = Backbone.Model.extend({
                url: '/words/add',

                idAttribute : 'name',
                defaults: {
                    name : 'sample_name',
                    definitions: [],
                    examples: []
                }
            }
        );

        return newWordModel;

    });
