/* eslint-disable no-new, no-unused-vars, camelcase */
/* global ConcreteHelpGuideManager */

;(function(global, $) {
    'use strict'

    function ConcreteHelpLauncher($element, options) {
        var my = this
        my.$element = $element
        my.options = $.extend(options || {}, options);
    }

    ConcreteHelpLauncher.close = function($notification) {
    }
    // jQuery Plugin
    $.fn.concreteHelpLauncher = function (options) {
        return $.each($(this), function (i, obj) {
            new ConcreteHelpLauncher($(this), options)
        })
    }

    global.ConcreteHelpLauncher = ConcreteHelpLauncher
})(window, jQuery); // eslint-disable-line semi
