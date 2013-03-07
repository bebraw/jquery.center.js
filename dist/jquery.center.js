/*! jquery.center - v0.1.0 - Juho Vepsalainen - MIT
https://github.com/bebraw/jquery.center.js - 2013-03-07 */
(function ($) {
    // http://stackoverflow.com/a/210733/228885
    jQuery.fn.center = function ($parent) {
        $parent = $parent || $(window);

        var $e = this;

        this.css("position","absolute");
        this.css("top", Math.max(0, (($parent.height() - this.outerHeight()) / 2) +
            $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($parent.width() - this.outerWidth()) / 2) +
            $(window).scrollLeft()) + "px");

        if(!this.data('centered')) {
            $(window).on('resize', center).on('scroll', center);
        }

        function center() {
            $e.center($parent);
            $e.data('centered', true);
        }

        return this;
    };
})(jQuery);
