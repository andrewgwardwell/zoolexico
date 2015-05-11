/**
 * Created by AWardwell on 4/28/15.
 */
define([
        'jquery',
        'backbone',
        'io'
    ],
    function($, Backbone, io){
        var wordModel = Backbone.Model.extend({
                urlRoot: '/words',

                idAttribute : 'name',
                defaults: {
                    name : 'somename',
                    _id : '',
                    definitions: [],
                    examples: []
                },

                fetchSuccess:function(model, response, options){
                    if(model){
                        model.trigger('from_server');
                    }
                },
                fetchError:function(model, response, options){
                    console.log('Error: '+ response);
                }
            }
        );

        return wordModel;

    });
