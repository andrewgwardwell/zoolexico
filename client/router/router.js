define([
        'jquery',
        'backbone',
        'io'
    ],
    function($, Backbone, io){
        var AppRouter = Backbone.Router.extend({
                routes : {
                    '' : 'allWords',
                    'word/:name': 'singleWord'
                    //'word/add' : 'addWord'
                },
                singleWord : function(name){
                    this.navigate('word/'+name, {trigger: true});
                    this.trigger('singleWord', name);
                },
                allWords : function(name){
                    console.log('all words route function');
                    this.trigger('allWords', name);
                },
                addWord : function(){
                    console.log('add words route function');
                    this.trigger('addWord');
                }
        }
        );

        return AppRouter;

    });


