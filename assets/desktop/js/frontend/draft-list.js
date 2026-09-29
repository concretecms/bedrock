/* eslint-disable no-new, no-unused-vars, camelcase */

;(function(global, $) {
    'use strict'

    function ConcreteDraftList($element, options) {
        var my = this
        options = $.extend({}, options)

        my.$element = $element
        my.options = options

        var events = global.ConcreteEvent
        if (events && typeof events.subscribe === 'function') {
            if (typeof events.unsubscribe === 'function') {
                events.unsubscribe('SitemapDeleteRequestComplete.desktopDraftList')
            }
            events.subscribe('SitemapDeleteRequestComplete.desktopDraftList', function() {
                my.reload()
            })
        }

        my.$element.on('click', 'div.ccm-pagination-wrapper a', function(e) {
            e.preventDefault()
            window.scrollTo(0, 0)
            my.reload($(this).attr('href'))
        })

        my.$element.find('.dialog-launch').dialog()
    }

    ConcreteDraftList.prototype = {
        reload: function(url) {
            var my = this
            my.showLoader()
            $.concreteAjax({
                loader: false,
                dataType: 'html',
                url: url || my.options.reloadUrl,
                method: 'get',
                success: function(r) {
                    my.$element.replaceWith(r)
                },
                complete: function() {
                    my.hideLoader()
                }
            })
        },

        showLoader: function() {
            var my = this
            my.$element.find('.ccm-block-desktop-draft-list-for-me-loader').removeClass('invisible')
        },

        hideLoader: function() {
            var my = this
            my.$element.find('.ccm-block-desktop-draft-list-for-me-loader').addClass('invisible')
        }

    }

    // jQuery Plugin
    $.fn.concreteDraftList = function(options) {
        return $.each($(this), function(i, obj) {
            new ConcreteDraftList($(this), options)
        })
    }

    global.ConcreteDraftList = ConcreteDraftList
})(global, jQuery)
