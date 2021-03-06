/*! jquery.center - v0.3.0 - Juho Vepsalainen - MIT
https://github.com/bebraw/jquery.center.js - 2014-04-17 */
(function ($) {
    'use strict';

    // http://stackoverflow.com/a/210733/228885
    $.fn.center = function ($parent) {
        $parent = $parent || $(window);

        var $e = this;

        this.css('position', 'absolute');
        this.css('top', Math.max(0, (($parent.height() - this.outerHeight()) / 2) +
                                 $(window).scrollTop()) + 'px');
        this.css('left', Math.max(0, (($parent.width() - this.outerWidth()) / 2) +
                                  $(window).scrollLeft()) + 'px');

        if(!this.data('centered')) {
            $(window).on('resize', center).on('scroll', center);
        }

        function center() {
            $e.center($parent);
            $e.data('centered', true);
        }

        return this;
    };
})(window.jQuery || window.Zepto);
