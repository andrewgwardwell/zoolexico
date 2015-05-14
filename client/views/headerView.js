/**
 * Created by AWardwell on 4/28/15.
 */
define([
    'exe/views/BaseView',
    'exe/models/newWordModel',
    'text!exe/templates/headerGlob.html'
], function (BaseView, newWordModel, template) {
    var headerView = BaseView.extend({
        template: template,
        el: '.header',
        events: {
            'click .word_add__field--submit': 'saveWord'
        },
        saveWord: function(e){
            e.preventDefault();
            var values = {
                'name': this.$el.find('.word_add__field--name').val(),
                'definitions': [ {'votes': 1, 'definition' : this.$el.find('.word_add__field--description').val()}]
            };

            var word = new newWordModel();
            var is_new = word.isNew();
            word.save(values, {wait: true});
        }


    });

    return headerView;
});
