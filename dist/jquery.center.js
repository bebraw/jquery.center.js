/*! jquery.center - v0.1.2 - Juho Vepsalainen - MIT
https://github.com/bebraw/jquery.center.js - 2013-03-10 */
(function ($) {
    if(window.Zepto) {
        // TODO: might want to move these bits into a separate Zepto build
        // https://gist.github.com/pamelafox/1379704
        ["Left", "Top"].forEach(function(name, i) {
            var method = "scroll" + name;

            function isWindow( obj ) {
                return obj && typeof obj === "object" && "setInterval" in obj;
            }

            function getWindow( elem ) {
                return isWindow( elem ) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
            }

            $.fn[ method ] = function( val ) {
                var elem, win;

                if ( val === undefined ) {
                    elem = this[ 0 ];

                    if ( !elem ) {
                        return null;
                    }

                    win = getWindow( elem );

                    // Return the scroll offset
                    return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
                        win.document.documentElement[method] ||
                        win.document.body[method] :
                        elem[method];
                }

                // Set the scroll offset
                this.each(function() {
                    win = getWindow(this);

                    if (win) {
                        var xCoord = !i ? val : $(win).scrollLeft();
                        var yCoord = i ? val : $(win).scrollTop();
                        win.scrollTo(xCoord, yCoord);
                    } else {
                        this[method] = val;
                    }
                });
            };
        });

        ['width', 'height'].forEach(function(dimension) {
            var offset, Dimension = dimension.replace(/./, function(m) { return m[0].toUpperCase(); });
            $.fn['outer' + Dimension] = function(margin) {
                var elem = this;
                if (elem) {
                    var size = elem[dimension]();
                    var sides = {'width': ['left', 'right'], 'height': ['top', 'bottom']};
                    sides[dimension].forEach(function(side) {
                        if (margin) size += parseInt(elem.css('margin-' + side), 10);
                    });
                    return size;
                } else {
                    return null;
                }
            };
        });
    }

    // http://stackoverflow.com/a/210733/228885
    $.fn.center = function ($parent) {
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
})(window.jQuery || window.Zepto);
