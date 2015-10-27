/**
 * Created by plastik on 23/10/15.
 */

'use strict';

var utils = {
    isMobile: function () {
        if (typeof window.orientation !== 'undefined') {
            return true;
        }
        return false;
    },
    cssTransitionSupported: function() {
        var support = false, elem = document.createElement('modernizr'),
            props = ['transition', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
        for (var i in props) {
            var prop = props[i];
            var result = elem.style[prop] !== undefined ? prop : false;
            if (result) {
                support = !support;
                break;
            }
        }
        return support;
    }
};
