/* eslint-disable no-new, no-unused-vars, camelcase */
/* global _, Concrete */

import _ from 'underscore'

;(function(window, $) {
    'use strict'

    var Layout = Concrete.Layout = function Layout(elem, edit_mode) {
        this.init.apply(this, _(arguments).toArray())
    }

    Layout.prototype = _.extend(Object.create(Concrete.Block.prototype), {

        init: function(elem, edit_mode) {
            var my = this
            my.bindEvent('EditModeInlineEditLoaded.editmode', function (e, data) {
                if (data.block === my) {
                    my.bindDrag()
                }
            })
            Concrete.Block.prototype.init.call(my, elem, edit_mode, $())

            my.setAttr('notch', elem.siblings('.ccm-edit-mode-title-notch-wrapper').find('.ccm-edit-mode-title-notch'))

            elem.children('.ccm-block-cover').remove()
            my.bindNotchMenu()
        },

        bindNotchMenu: function() {
            var my = this
            var $menuElem = $('[data-layout-menu=' + my.getId() + ']')
            var menu_config = {
                highlightClassName: 'ccm-edit-mode-title-notch-highlight',
                menuActiveClass: 'ccm-edit-mode-title-notch-highlight',
                menu: $menuElem,
                onShow: function(menu) {
                    my.getElem().addClass('ccm-block-edit-layout-highlight')
                },
                onHide: function(menu) {
                    my.getElem().removeClass('ccm-block-edit-layout-highlight')
                }
            }
            new ConcreteMenu(my.getNotch(), menu_config)

            $menuElem.find('a[data-menu-action=edit-container-layout]')
                .off('click.edit-mode')
                .on('click.edit-mode', function (e) {
                    // we are going to place this at the END of the list.
                    var $link = $(this)
                    var bID = parseInt($link.attr('data-container-layout-block-id'))
                    var editor = Concrete.getEditMode()
                    var block = _.findWhere(editor.getBlocks(), { id: bID })
                    Concrete.event.fire('EditModeBlockEditInline', {
                        block: block,
                        arGridMaximumColumns: $link.attr('data-area-grid-maximum-columns'),
                        event: e
                    })
                    return false
                })

            $menuElem.find('a[data-menu-action=edit-container-layout-style]')
                .off('click.edit-mode')
                .on('click.edit-mode', function (e) {
                    e.preventDefault()
                    // we are going to place this at the END of the list.
                    var $link = $(this)
                    var bID = parseInt($link.attr('data-container-layout-block-id'))
                    var editor = Concrete.getEditMode()
                    var block = _.findWhere(editor.getBlocks(), { id: bID })
                    Concrete.event.fire('EditModeBlockEditInline', {
                        block: block, event: e, action: CCM_DISPATCHER_FILENAME + '/ccm/system/dialogs/block/design'
                    })
                })
        },

        bindDrag: function layoutBindDrag() {
            var my = this
            var peper = $('[data-layout-command="move-block"]')
            $.pep.unbind(peper)
            peper.pep(my.getPepSettings())
        },

        setupAreaDragPayloads: function setupAreaDragPayloads(areas) {
            var my = this
            my.getArea().getElem().addClass('ccm-area-accepts-block-drag-payload')
        },

        addToDragArea: function layoutAddToDragArea() {
            Concrete.Block.prototype.addToDragArea.apply(this, _.toArray(arguments))

            var container = $('#ccm-inline-toolbar-container')
            container.css({
                top: this.getElem().offset().top - container.outerHeight() - 5
            })
        }

    })
})(window, jQuery); // eslint-disable-line semi
