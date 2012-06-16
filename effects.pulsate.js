/*
 * Alternate implementation of the core jQuery UI "pulsate" effect
 * (http://docs.jquery.com/UI/Effects/Pulsate) that accepts "min_opacity"
 * and "max_opacity" options (current core implementation simply fades 
 * the target element from 0 to 1.0 opacity and back).
 *
 * To use simply include this script in your document after inclusion of 
 * jQuery UI (it will override the core "pulsate" effect implementation).
 *
 * Author: Nicholas Zaillian (+ jQuery UI core contribs: http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */

(function($) {

$.effects.pulsate = function(o) {

        return this.queue(function() {

                // Create element
                var el = $(this);

                // Set options
                var mode = $.effects.setMode(el, o.options.mode || 'show'); // Set Mode
                var times = o.options.times || 5; // Default # of times
                var min_opacity = o.options.min_opacity || 0;
                var max_opacity = o.options.max_opacity || 1;
                var duration = o.duration ? o.duration / 2 : $.fx.speeds._default / 2;

                // Adjust
                if (mode == 'hide') times--;
                if (el.is(':hidden')) { // Show fadeIn
                        el.css('opacity', min_opacity);
                        el.show(); // Show
                        el.animate({opacity: max_opacity}, duration, o.options.easing);
                        times = times-2;
                }

                // Animate
                for (var i = 0; i < times; i++) { // Pulsate
                        el.animate({opacity: min_opacity}, duration, o.options.easing).animate({opacity: max_opacity}, duration, o.options.easing);
                };
                if (mode == 'hide') { // Last Pulse
                        el.animate({opacity: min_opacity}, duration, o.options.easing, function(){
                                el.hide(); // Hide
                                if(o.callback) o.callback.apply(this, arguments); // Callback
                        });
                } else {
                        el.animate({opacity: min_opacity}, duration, o.options.easing).animate({opacity: max_opacity}, duration, o.options.easing, function(){
                                if(o.callback) o.callback.apply(this, arguments); // Callback
                        });
                };
                el.queue('fx', function() { el.dequeue(); });
                el.dequeue();
        });

};

})(jQuery);
