/**
 * Created by plastik on 20/10/15.
 */
(function() {
    'use strict';

    function Carousel(element) {

        this.time = null;
        this.delay = null;
        this.currentIndex = null;
        this.element = element;

        this.default = {
            time: 500,
            delay: 3000,
            currentIndex: 0
        };

    }

    Carousel.prototype.init = function() {
        console.log('init');
    };

    var carousel = new Carousel('#carousel');
    carousel.init();

}());