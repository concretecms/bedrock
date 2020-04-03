/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ConcreteHelpLauncher, Tour, CCM_REL */

;(function(global, $) {
    'use strict';

    var KEY_GUIDETOLAUNCHONREFRESH = 'ConcreteHelpActiveGuide';
    var guides = {};

    var ConcreteHelpGuideManager = {
        register: function (key, guide) {
            guides[key] = guide;
        },

        getGuide: function (key) {
            var guide = guides[key];
            if (!guide) {
                return guide;
            }
            if (!(guide instanceof Tour)) {
                guides[key] = guide = guide();
            }
            return guide;
        },

        enterToolbarGuideMode: function() {
            // if help notification is active, hide it
            ConcreteHelpLauncher.close();

            // if the help dialog is active, hide it
            $('.ccm-dialog-help-wrapper').hide();

            this.showOverlay();
            this.raiseToolbar();
        },

        showOverlay: function() {
            // if the widget overlay doesn't exist, show it
            if ($('.ui-widget-overlay').length < 1) {
                $('<div class="ui-widget-overlay"></div>').hide().appendTo('body');
            }
            $('.ui-widget-overlay').addClass('animated fadeIn').show();

        },

        raiseToolbar: function() {
            // move the toolbar to above the widget overlay
            $('#ccm-toolbar').addClass('ccm-toolbar-tour-guide');
        },

        lowerToolbar: function() {
            // move the toolbar back
            $('#ccm-toolbar').removeClass('ccm-toolbar-tour-guide');
        },

        hideOverlay: function() {
            $('.ui-widget-overlay').addClass('animated fadeOut');
            $('.ui-widget-overlay').delay(250).queue(function() {
                $(this).remove();
                $(this).dequeue();
            });

        },

        exitToolbarGuideMode: function() {

            // if the help dialog is active, show it
            if ($('.ccm-dialog-help-wrapper').length) {
                $('.ccm-dialog-help-wrapper').show();
            } else {
                this.hideOverlay();
            }
            this.lowerToolbar();
        },

        launchGuideOnRefresh: function(guide) {
            window.localStorage.setItem(KEY_GUIDETOLAUNCHONREFRESH, guide);
        },

        clearGuideToLaunchOnRefresh: function() {
            window.localStorage.removeItem(KEY_GUIDETOLAUNCHONREFRESH);
        },

        getGuideToLaunchOnRefresh: function() {
            return window.localStorage.getItem(KEY_GUIDETOLAUNCHONREFRESH);
        },

        get: function() {
            return ConcreteHelpGuideManager;
        }


    };


    global.ConcreteHelpGuideManager = ConcreteHelpGuideManager;

})(window, jQuery);
