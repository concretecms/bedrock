/* eslint-disable no-new, no-unused-vars, camelcase */
/* global CCM_DISPATCHER_FILENAME */

;(function(global, $) {
    'use strict'

    function ConcreteHelpDialog(options) {
        var my = this
        my.options = $.extend({}, options || {})
    }

    ConcreteHelpDialog.prototype = {

		open: function() {
		}

    }

    global.ConcreteHelpDialog = ConcreteHelpDialog
})(window, jQuery); // eslint-disable-line semi
