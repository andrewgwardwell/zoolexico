/**
 * Created by AWardwell on 4/28/15.
 */
define([
    'exe/views/BaseView',
    'text!exe/templates/wordTemp.html'
], function (BaseView, template) {
    var wordView = BaseView.extend({
        template: template,
        preprocess: function(data){
            data.definitions =  _.sortBy(data.definitions, 'votes').reverse();

        },
        initialize : function(){
           this.listenTo(this.model, 'from_server', this.render);
        }
    });

    return wordView;
});
