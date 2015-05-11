define([
    'jquery',
    'backbone',
    'exe/stream',
    'exe/router/router',
    'exe/models/wordModel',
    'exe/collections/wordsCollection',
    'exe/views/wordView',
    'exe/views/wordsView',
    'exe/views/headerView'
],
    function($, Backbone, socket, router, wordModel, wordsCollection, wordView, wordsView, headerView){


        var wordMod = new wordModel,
            wordsColl = new wordsCollection,
            words = new wordsView({collection: wordsColl, el: '.content'}),
            word = new wordView({model: wordMod, el: '.content'}),
            header = new headerView(),
            r = new router();
        words.listenTo(r, 'allWords' , function(data){
            this.collection.fetch({reset: true, success: this.collection.fetchSuccess, error: this.collection.fetchError});
        });

        word.listenTo(r, 'singleWord' , function(data){
            this.model.set({name: data}, {silent:true});
            this.model.fetch({success: this.model.fetchSuccess, error: this.model.fetchError});
        });
        header.render();
        // This allows the binding to the word model to occur and therefore react to the event that is fired from the route.
        Backbone.history.start({});

    });


