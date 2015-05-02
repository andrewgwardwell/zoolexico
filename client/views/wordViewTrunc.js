/**
 * Created by AWardwell on 4/28/15.
 */
define([
        'jquery',
        'exe/views/BaseView',
        'io',
        'text!exe/templates/wordTruncTemp.html'
    ],
    function($, BaseView, io, template){
        var wordViewTrunc = BaseView.extend({
                template: template,
                preprocess: function(data){
                    data.definition = _.max(data.definitions, function(item){ return item.votes; });
                }
            }
        );

        return wordViewTrunc;

    });
