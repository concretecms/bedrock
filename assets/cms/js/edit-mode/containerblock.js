/* eslint-disable no-new, no-unused-vars, camelcase */
/* global _, Concrete */

import _ from 'underscore'

;(function(window, $) {
    'use strict'

    var ContainerBlock = Concrete.ContainerBlock = function ContainerBlock(elem, edit_mode) {
        this.init.apply(this, _(arguments).toArray())
    }

    ContainerBlock.prototype = _.extend(Object.create(Concrete.Block.prototype), {

        init: function(elem, edit_mode) {
            var my = this
            Concrete.Block.prototype.init.call(my, elem, edit_mode, $())

            var notch = elem.siblings('.ccm-edit-mode-title-notch-wrapper').find('.ccm-edit-mode-title-notch')
            my.setAttr('notch', notch)

            elem.children('.ccm-block-cover').remove()
            my.bindDrag()
            my.bindDelete()
            my.bindEditDesign()
            my.bindNotchMenu()
        },

        getMenu: function() {
            var my = this
            return $('[data-container-menu=' + my.getId() + ']')
        },

        bindNotchMenu: function() {
            var my = this
            var menu_config = {
                highlightClassName: 'ccm-edit-mode-title-notch-highlight',
                menuActiveClass: 'ccm-edit-mode-title-notch-highlight',
                menu: my.getMenu(),
                onShow: function(menu) {
                    my.getElem().addClass('ccm-block-edit-container-highlight')
                },
                onHide: function(menu) {
                    my.getElem().removeClass('ccm-block-edit-container-highlight')
                }
            }
            new ConcreteMenu(my.getNotch(), menu_config)
        },

        bindDelete: function ContainerBlockDelete() {
            var my = this
            var deleter = my.getMenu().find('a[data-inline-command=delete-block]')
            deleter.unbind('click.containerDelete').on('click.containerDelete', function(e) {
                e.preventDefault()
                my.delete()
            })
        },

        setupAreaDragPayloads: function setupAreaDragPayloads(areas) {
            var my = this
            my.getArea().getElem().addClass('ccm-area-accepts-block-drag-payload')
        },

        bindEditDesign: function ContainerBlockEditDesign() {
            var my = this
            var menuElem = my.getMenu().find('a[data-inline-command=edit-container-design]')
            menuElem.off('click.edit-mode')
                .on('click.edit-mode', function (e) {
                    e.preventDefault()
                    // we are going to place this at the END of the list.
                    var $link = $(this)
                    var bID = parseInt($link.attr('data-container-block-id'))
                    var editor = Concrete.getEditMode()
                    var block = _.findWhere(editor.getBlocks(), { id: bID })
                    Concrete.event.fire('EditModeBlockEditInline', {
                        block: block, event: e, action: CCM_DISPATCHER_FILENAME + '/ccm/system/dialogs/block/design'
                    })
                    return false
                })
        },

        bindDrag: function ContainerBlockBindDrag() {
            var my = this
            var mover = my.getNotch().find('a[data-inline-command=move-block]').parent()

            $.pep.unbind(mover)
            mover.pep(my.getPepSettings())
        }

    })
})(window, jQuery); // eslint-disable-line semi
