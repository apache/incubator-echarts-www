/**
 * @module zrender/graphic/Style
 */

define(function (require) {

    var STYLE_LIST_COMMON = [
        'lineCap', 'lineJoin', 'miterLimit', 'lineWidth',
        'shadowBlur', 'shadowOffsetX', 'shadowOffsetY', 'shadowColor'
    ];

    var Style = function (opts) {
        this.extendFrom(opts);
    };

    Style.prototype = {

        constructor: Style,

        /**
         * @type {string}
         */
        fill: '#000000',

        /**
         * @type {string}
         */
        stroke: null,

        /**
         * @type {number}
         */
        opacity: 1,

        /**
         * @type {Array.<number>}
         */
        lineDash: null,

        /**
         * @type {number}
         */
        lineDashOffset: 0,

        /**
         * @type {number}
         */
        shadowBlur: 0,

        /**
         * @type {number}
         */
        shadowOffsetX: 0,

        /**
         * @type {number}
         */
        shadowOffsetY: 0,

        /**
         * @type {number}
         */
        lineWidth: 1,

        // Bounding rect text configuration
        // Not affected by element transform
        /**
         * @type {string}
         */
        text: null,

        /**
         * @type {string}
         */
        textFill: '#000',

        /**
         * @type {string}
         */
        textStroke: null,

        /**
         * 'inside', 'left', 'right', 'top', 'bottom'
         * [x, y]
         * @type {string|Array.<number>}
         * @default 'inside'
         */
        textPosition: 'inside',

        /**
         * @type {string}
         */
        textBaseline: null,

        /**
         * @type {string}
         */
        textAlign: null,

        /**
         * @type {number}
         */
        textDistance: 5,

        /**
         * @type {number}
         */
        textShadowBlur: 0,

        /**
         * @type {number}
         */
        textShadowOffsetX: 0,

        /**
         * @type {number}
         */
        textShadowOffsetY: 0,

        /**
         * @param {CanvasRenderingContext2D} ctx
         */
        bind: function (ctx) {
            for (var i = 0; i < STYLE_LIST_COMMON.length; i++) {
                var styleName = STYLE_LIST_COMMON[i];

                if (this[styleName] != null) {
                    ctx[styleName] = this[styleName];
                }
            }

            var fill = this.fill;
            var stroke = this.stroke;
            if (fill != null) {
                 // Use canvas gradient if has
                ctx.fillStyle = fill.canvasGradient ? fill.canvasGradient : fill;
            }
            if (stroke != null) {
                 // Use canvas gradient if has
                ctx.strokeStyle = stroke.canvasGradient ? stroke.canvasGradient : stroke;
            }
            this.opacity != null && (ctx.globalAlpha = this.opacity);
        },

        /**
         * Extend from other style
         * @param {zrender/graphic/Style} otherStyle
         * @param {boolean} overwrite
         */
        extendFrom: function (otherStyle, overwrite) {
            if (otherStyle) {
                var target = this;
                for (var name in otherStyle) {
                    if (otherStyle.hasOwnProperty(name)
                        && (overwrite || ! target.hasOwnProperty(name))
                    ) {
                        target[name] = otherStyle[name];
                    }
                }
            }
        },

        /**
         * Batch setting style with a given object
         * @param {Object|string} obj
         * @param {*} [obj]
         */
        set: function (obj, value) {
            if (typeof obj === 'string') {
                this[obj] = value;
            }
            else {
                this.extendFrom(obj, true);
            }
        },

        /**
         * Clone
         * @return {zrender/graphic/Style} [description]
         */
        clone: function () {
            var newStyle = new this.constructor();
            newStyle.extendFrom(this, true);
            return newStyle;
        }
    };

    var styleProto = Style.prototype;
    var name;
    var i;
    for (i = 0; i < STYLE_LIST_COMMON.length; i++) {
        name = STYLE_LIST_COMMON[i];
        if (!(name in styleProto)) {
            styleProto[name] = null;
        }
    }

    return Style;
});