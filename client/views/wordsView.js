/**
 * Created by AWardwell on 4/28/15.
 */
define([
    'exe/views/BaseView',
    'exe/views/wordViewTrunc',
], function (BaseView, wordViewTrunc) {
    var wordsView = BaseView.extend({

        initialize : function(){
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function() {
            this.$el.html('');
            var data = {};
            this.preprocess(data);
            this.collection.each(function(item) {
                var view = new wordViewTrunc({
                    model: item
                });
                this.$el.append(view.render().el);
            }, this);
            this.postprocess();
            return this;
        }
    });

    return wordsView;
});
