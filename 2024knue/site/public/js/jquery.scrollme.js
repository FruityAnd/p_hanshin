var scrollme = (function ($) {
    var _this = {};
    var $document = $(document);
    var $window = $(window);
    _this.body_height = 0;
    _this.viewport_height = 0;
    _this.viewport_top = 0;
    _this.viewport_bottom = 0;
    _this.viewport_top_previous = -1;
    _this.elements = [];
    _this.elements_in_view = [];
    _this.property_defaults =
        {
            'opacity': 1,
            'translatex': 0,
            'translatey': 0,
            'translatez': 0,
            'rotatex': 0,
            'rotatey': 0,
            'rotatez': 0,
            'scale': 1,
            'scalex': 1,
            'scaley': 1,
            'scalez': 1
        };
    _this.scrollme_selector = '.scrollme';
    _this.animateme_selector = '.animateme';
    _this.update_interval = 10;
    _this.easing_functions =
        {
            'linear': function (x) {
                return x;
            },
            'easeout': function (x) {
                return x * x * x;
            },
            'easein': function (x) {
                x = 1 - x;
                return 1 - (x * x * x);
            },
            'easeinout': function (x) {
                if (x < 0.5) {
                    return (4 * x * x * x);
                } else {
                    x = 1 - x;
                    return 1 - (4 * x * x * x);
                }
            }
        };
    _this.init_events =
        [
            'ready',
            'page:load', // Turbolinks
            'page:change' // Turbolinks
        ];
    _this.init_if = function () {
        return true;
    }
    _this.init = function () {
        if (!_this.init_if()) return false;
        _this.init_elements();
        _this.on_resize();
        $window.on('resize orientationchange', function () {
            _this.on_resize();
        });
        $window.load(function () {
            setTimeout(function () {
                _this.on_resize();
            }, 100)
        });
        setInterval(_this.update, _this.update_interval);
        return true;
    }
    _this.init_elements = function () {
        $(_this.scrollme_selector).each(function () {
            var element = {};
            element.element = $(this);
            var effects = [];
            $(this).find(_this.animateme_selector).addBack(_this.animateme_selector).each(function () {
                var effect = {};
                effect.element = $(this);
                effect.when = effect.element.data('when');
                effect.from = effect.element.data('from');
                effect.to = effect.element.data('to');
                if (effect.element.is('[data-crop]')) {
                    effect.crop = effect.element.data('crop');
                } else {
                    effect.crop = true;
                }
                if (effect.element.is('[data-easing]')) {
                    effect.easing = _this.easing_functions[effect.element.data('easing')]
                } else {
                    effect.easing = _this.easing_functions['easeout'];
                }
                var properties = {};
                if (effect.element.is('[data-opacity]')) properties.opacity = effect.element.data('opacity');
                if (effect.element.is('[data-translatex]')) properties.translatex = effect.element.data('translatex');
                if (effect.element.is('[data-translatey]')) properties.translatey = effect.element.data('translatey');
                if (effect.element.is('[data-translatez]')) properties.translatez = effect.element.data('translatez');
                if (effect.element.is('[data-rotatex]')) properties.rotatex = effect.element.data('rotatex');
                if (effect.element.is('[data-rotatey]')) properties.rotatey = effect.element.data('rotatey');
                if (effect.element.is('[data-rotatez]')) properties.rotatez = effect.element.data('rotatez');
                if (effect.element.is('[data-scale]')) properties.scale = effect.element.data('scale');
                if (effect.element.is('[data-scalex]')) properties.scalex = effect.element.data('scalex');
                if (effect.element.is('[data-scaley]')) properties.scaley = effect.element.data('scaley');
                if (effect.element.is('[data-scalez]')) properties.scalez = effect.element.data('scalez');
                effect.properties = properties;
                effects.push(effect);
            });
            element.effects = effects;
            _this.elements.push(element);
        });
    }
    _this.update = function () {
        window.requestAnimationFrame(function () {
            _this.update_viewport_position();
            if (_this.viewport_top_previous != _this.viewport_top) {
                _this.update_elements_in_view();
                _this.animate();
            }
            _this.viewport_top_previous = _this.viewport_top;
        });
    }
    _this.animate = function () {
        var elements_in_view_length = _this.elements_in_view.length;
        for (var i = 0; i < elements_in_view_length; i++) {
            var element = _this.elements_in_view[i];
            var effects_length = element.effects.length;
            for (var e = 0; e < effects_length; e++) {
                var effect = element.effects[e];
                switch (effect.when) {
                    case 'view' : // Maintained for backwards compatibility
                    case 'span' :
                        var start = element.top - _this.viewport_height;
                        var end = element.bottom;
                        break;

                    case 'exit' :
                        var start = element.bottom - _this.viewport_height;
                        var end = element.bottom;
                        break;

                    default :
                        var start = element.top - _this.viewport_height;
                        var end = element.top;
                        break;
                }
                if (effect.crop) {
                    if (start < 0) start = 0;
                    if (end > (_this.body_height - _this.viewport_height)) end = _this.body_height - _this.viewport_height;
                }
                var scroll = (_this.viewport_top - start) / (end - start);
                var from = effect['from'];
                var to = effect['to'];
                var length = to - from;
                var scroll_relative = (scroll - from) / length;
                var scroll_eased = effect.easing(scroll_relative);
                var opacity = _this.animate_value(scroll, scroll_eased, from, to, effect, 'opacity');
                var translatey = _this.animate_value(scroll, scroll_eased, from, to, effect, 'translatey');
                var translatex = _this.animate_value(scroll, scroll_eased, from, to, effect, 'translatex');
                var translatez = _this.animate_value(scroll, scroll_eased, from, to, effect, 'translatez');
                var rotatex = _this.animate_value(scroll, scroll_eased, from, to, effect, 'rotatex');
                var rotatey = _this.animate_value(scroll, scroll_eased, from, to, effect, 'rotatey');
                var rotatez = _this.animate_value(scroll, scroll_eased, from, to, effect, 'rotatez');
                var scale = _this.animate_value(scroll, scroll_eased, from, to, effect, 'scale');
                var scalex = _this.animate_value(scroll, scroll_eased, from, to, effect, 'scalex');
                var scaley = _this.animate_value(scroll, scroll_eased, from, to, effect, 'scaley');
                var scalez = _this.animate_value(scroll, scroll_eased, from, to, effect, 'scalez');
                if ('scale' in effect.properties) {
                    scalex = scale;
                    scaley = scale;
                    scalez = scale;
                }
                effect.element.css(
                    {
                        'opacity': opacity,
                        'transform': 'translate3d( ' + translatex + 'px , ' + translatey + 'px , ' + translatez + 'px ) rotateX( ' + rotatex + 'deg ) rotateY( ' + rotatey + 'deg ) rotateZ( ' + rotatez + 'deg ) scale3d( ' + scalex + ' , ' + scaley + ' , ' + scalez + ' )'
                    });
            }
        }
    }
    _this.animate_value = function (scroll, scroll_eased, from, to, effect, property) {
        var value_default = _this.property_defaults[property];
        if (!(property in effect.properties)) return value_default;
        var value_target = effect.properties[property];
        var forwards = (to > from) ? true : false;
        if (scroll < from && forwards) {
            return value_default;
        }
        if (scroll > to && forwards) {
            return value_target;
        }

        if (scroll > from && !forwards) {
            return value_default;
        }
        if (scroll < to && !forwards) {
            return value_target;
        }
        var new_value = value_default + (scroll_eased * (value_target - value_default));
        switch (property) {
            case 'opacity'    :
                new_value = new_value.toFixed(2);
                break;
            case 'translatex' :
                new_value = new_value.toFixed(0);
                break;
            case 'translatey' :
                new_value = new_value.toFixed(0);
                break;
            case 'translatez' :
                new_value = new_value.toFixed(0);
                break;
            case 'rotatex'    :
                new_value = new_value.toFixed(1);
                break;
            case 'rotatey'    :
                new_value = new_value.toFixed(1);
                break;
            case 'rotatez'    :
                new_value = new_value.toFixed(1);
                break;
            case 'scale'      :
                new_value = new_value.toFixed(3);
                break;
            default :
                break;
        }
        return new_value;
    }
    _this.update_viewport_position = function () {
        _this.viewport_top = $window.scrollTop();
        _this.viewport_bottom = _this.viewport_top + _this.viewport_height;
    }
    _this.update_elements_in_view = function () {
        _this.elements_in_view = [];

        var elements_length = _this.elements.length;

        for (var i = 0; i < elements_length; i++) {
            if ((_this.elements[i].top < _this.viewport_bottom) && (_this.elements[i].bottom > _this.viewport_top)) {
                _this.elements_in_view.push(_this.elements[i]);
            }
        }
    }
    _this.on_resize = function () {
        _this.update_viewport();
        _this.update_element_heights();
        _this.update_viewport_position();
        _this.update_elements_in_view();
        _this.animate();
    }
    _this.update_viewport = function () {
        _this.body_height = $document.height();
        _this.viewport_height = $window.height();
    }
    _this.update_element_heights = function () {
        var elements_length = _this.elements.length;

        for (var i = 0; i < elements_length; i++) {
            var element_height = _this.elements[i].element.outerHeight();
            var position = _this.elements[i].element.offset();

            _this.elements[i].height = element_height;
            _this.elements[i].top = position.top;
            _this.elements[i].bottom = position.top + element_height;
        }
    }
    $document.on(_this.init_events.join(' '), function () {
        _this.init();
    });
    return _this;
})(jQuery);
