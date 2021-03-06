/**
 * Created by plastik on 20/10/15.
 */
(function () {
    'use strict';

    function Carousel(element) {

        this.$currentItem = null;
        this.currentIndex = 0;
        this.totalItems = null;
        this.timer = null;
        this.duration = 3000;
        this.direction = null;
        this.$el = $(element);
        this.$indicators = $('.carousel-indicators');
        this.csstransitions = null;

        this.changeItem = $.proxy(this.changeItem, this);
    }

    Carousel.prototype.init = function () {
        this.detectMobile();
        this.build();
        this.events();
        this.initTimer();
    };

    Carousel.prototype.build = function () {
        this.transitionDetection();
        this.totalItems = this.$el.find('.item').length;
        this.$currentItem = this.$el.find('.item').first();
        this.$currentItem.addClass('active');
    };

    /// Detection
    Carousel.prototype.detectMobile = function () {
        if (utils.isMobile()) {
            this.swipeEvents();
            this.$indicators.addClass('bigger');
            $('.arrow').addClass('center-vertically ');
        }
    };

    Carousel.prototype.transitionDetection = function () {
        this.csstransitions = utils.cssTransitionSupported();
    };


    /// Events
    Carousel.prototype.events = function () {
        var self = this;
        this.$el
            .on('mouseenter', '.carousel-list', function (e) {
                self.clearTimer();
            })
            .on('mouseleave', '.carousel-list', function (e) {
                self.initTimer();
            })
            .on('click', '.right', {
                direction: 'right'
            }, this.changeItem)
            .on('click', '.left', {
                direction: 'left'
            }, this.changeItem)
            .on('click', '.carousel-indicators > li', this.changeItem);
    };

    Carousel.prototype.unevents = function () {
        this.$el
            .off('click');
    };

    Carousel.prototype.swipeEvents = function () {
        this.$el
            .on('swipeleft', '.carousel-list', {
                direction: 'right'
            }, this.changeItem)
            .on('swiperight', '.carousel-list', {
                direction: 'left'
            }, this.changeItem);
    };


    /// Timer
    Carousel.prototype.initTimer = function () {
        this.clearTimer();
        this.timer = setInterval(this.changeItem, this.duration);
    };

    Carousel.prototype.clearTimer = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    };


    /// Slides behavior
    Carousel.prototype.changeItem = function (e) {

        this.clearTimer();

        var index = typeof e !== 'undefined' ? $(e.currentTarget).data('index') : undefined;
        var direction = typeof e !== 'undefined' && typeof e.data !== 'undefined' && typeof e.data.direction !== 'undefined' ? e.data.direction : undefined;
        this.direction = direction || 'right';
        //arrows
        if (direction !== undefined) {
            if (direction === 'left') {
                if (this.currentIndex === 0) {
                    this.currentIndex = this.totalItems - 1;
                } else {
                    this.currentIndex--;
                }
            } else if (direction === 'right') {
                if (this.currentIndex < this.totalItems - 1) {
                    this.currentIndex++;
                } else {
                    this.currentIndex = 0;
                }
            }

            //indicators
        } else if (index !== undefined) {
            this.currentIndex = index;

            //automatic
        } else if (this.currentIndex < this.totalItems - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }

        var next = this.$el.find('.item').eq(this.currentIndex).addClass(this.direction + ' active');
        this.$currentItem.addClass('shift-' + this.direction);

        this.unevents();

        if (!this.csstransitions) {
            this.animateJs(next);
        } else {
            this.animateCss(next);
        }

    };


    /// Animation
    Carousel.prototype.animateCss = function (next) {
        setTimeout(function () {
            this.$el.addClass('transition');
        }.bind(this), 100);

        setTimeout(function () {
            this.$el.removeClass('transition');
            this.$currentItem.removeClass('active shift-' + this.direction);
            this.$currentItem = next.removeClass(this.direction);
            this.initTimer();
            this.updateIndicators();
            this.events();
        }.bind(this), 500);
    };

    Carousel.prototype.animateJs = function (next) {
        var self = this,
            animation = {};

        if (this.direction === 'right') {
            animation = {
                current: '-100%',
                next: '0%'
            };
        } else {
            animation = {
                current: '100%',
                next: '0%'
            };
        }
        this.$currentItem.animate({'left': animation.current}, 500);
        next.animate({'left': animation.next}, 500, 'linear', function () {
            self.$currentItem.removeClass('active shift-' + self.direction).attr('style', '');
            self.$currentItem = next.removeClass(self.direction).attr('style', '');
            self.initTimer();
            self.updateIndicators();
            self.events();
        });

    };


    /// Indicators
    Carousel.prototype.updateIndicators = function () {
        this.$indicators.find('li').removeClass('active').eq(this.currentIndex).addClass('active');
    };


    //init carousel
    var carousel = new Carousel('.carousel');
    carousel.init();

}());
