/* I know this is an insane library name. This is a simple plugin meant to bring our vue contexts to different
/* places */
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* global _, ccmi18n, ccmi18n_filemanager, ConcreteProgressiveOperation, ConcreteAlert, ConcreteAssetLoader, ConcreteEvent, ConcreteMenu */
;(function(global, $) {
    'use strict'
    // jQuery Plugin
    $.fn.concreteVue = function(options) {
        this.each(function () {
            var $element = $(this)
            if (!$element.data('jquery-vue-attached')) {
                Concrete.Vue.activateContext(options.context, function (Vue, config) {
                    new Vue({
                        el: $element.get(0),
                        components: config.components
                    })
                })
                $element.data('jquery-vue-attached', true)
            }
        })
    }
})(global, jQuery)
