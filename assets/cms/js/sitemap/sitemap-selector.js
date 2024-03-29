/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* global CCM_DISPATCHER_FILENAME */

;(function(global, $) {
    'use strict'

    function ConcretePageSitemapSelector($element, options) {
        var my = this
        options = $.extend({
            mode: 'single',
            inputName: 'cID',
            selected: 0,
            startingPoint: 1,
            siteTreeID: 0,
            token: '',
            filters: {}
        }, options)

        my.$element = $('<div />', { class: 'ccm-page-sitemap-selector-inner' })
        my.$element.appendTo($element)
        my.options = options

        my.$element.concreteSitemap({
            selectMode: my.options.mode,
            minExpandLevel: 0,
            siteTreeID: my.options.siteTreeID,
            dataSource: CCM_DISPATCHER_FILENAME + '/ccm/system/page/sitemap_data',
            ajaxData: {
                startingPoint: my.options.startingPoint,
                ccm_token: my.options.token,
                selected: my.options.selected,
                filters: my.options.filters
            },
            init: function() {
                if (options.selected) {
                    if (options.mode == 'multiple') {
                        $.each(options.selected, function(i, cID) {
                            var node = $.ui.fancytree.getTree(my.$element.find('.ccm-sitemap-tree')).getNodeByKey(String(cID))
                            if (node) {
                                node.setSelected(true)
                            }
                        })
                    } else {
                        var tree = $.ui.fancytree.getTree(my.$element.find('.ccm-sitemap-tree'))
                        var node = tree.getNodeByKey(String(options.selected))
                        if (node) {
                            node.setSelected(true)
                        }
                    }
                }
            },
            onSelectNode: function(node, flag) {
                if (flag) {
                    if (my.options.mode == 'single') {
                        my.deselectAll()
                    }
                    my.select(node)
                } else {
                    my.deselect(node)
                }
            }
        })
    }

    ConcretePageSitemapSelector.prototype = {

        deselectAll: function() {
            var my = this
            var $inputs = my.$element.find('input[data-sitemap-selector-page-id]')
            $inputs.remove()
        },

        deselect: function(node) {
            var my = this
            var $input = my.$element.find('input[data-sitemap-selector-page-id=' + node.data.cID + ']')
            $input.remove()
        },

        select: function(node) {
            var my = this
            var name = my.options.inputName

            if (my.options.mode == 'multiple') {
                name += '[]'
            }

            var $input = $('<input />', {
                'data-sitemap-selector-page-id': node.data.cID,
                type: 'hidden',
                name: name
            })
            $input.val(node.data.cID)
            $input.appendTo(my.$element)
        }
    }

    // jQuery Plugin
    $.fn.concretePageSitemapSelector = function(options) {
        return $.each($(this), function(i, obj) {
            new ConcretePageSitemapSelector($(this), options)
        })
    }

    global.ConcretePageSitemapSelector = ConcretePageSitemapSelector
})(global, jQuery)
