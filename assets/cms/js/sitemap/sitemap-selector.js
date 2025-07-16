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
                    var tree = $.ui.fancytree.getTree(my.$element.find('.ccm-sitemap-tree'));

                    var paths;
                    if (options.mode === 'multiple') {
                        paths = options.selectedPath.map(pathGroup => pathGroup.map(String));
                    } else {
                        paths = [];
                        paths.push(options.selectedPath.map(String));
                    }

                    var promise = Promise.resolve();

                    paths.forEach(function(pathGroup) {
                        pathGroup.forEach(function(nodeKey) {
                            promise = promise.then(function() {
                                var node = tree.getNodeByKey(nodeKey);
                                if (node) {
                                    return node.setExpanded(true);
                                }
                            });
                        });

                        promise = promise.then(function() {
                            return Promise.resolve();
                        });
                    });

                    promise.then(function() {
                        if (options.mode === 'multiple') {
                            options.selected.forEach(function(cID) {
                                var node = tree.getNodeByKey(String(cID));
                                if (node) {
                                    node.setSelected(true);
                                }
                            });
                        } else {
                            var node = tree.getNodeByKey(String(options.selected))
                            if (node) {
                                node.setSelected(true);
                            }
                        }
                    });
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
