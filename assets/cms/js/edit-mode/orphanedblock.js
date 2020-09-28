/* eslint-disable no-new, no-unused-vars, camelcase */
/* global _, Concrete, ConcreteEvent, ConcretePanelManager, CCM_SECURITY_TOKEN, CCM_DISPATCHER_FILENAME */

import _ from 'underscore'

(function (window, $) {
    'use strict'

    /**
     * Orphaned block used in panels
     * @type {Function}
     */
    var OrphanedBlock = Concrete.OrphanedBlock = function OrphanedBlock(elem, edit_mode, default_area) {
        this.init.apply(this, _.toArray(arguments))
    }

    OrphanedBlock.prototype = _.extend(Object.create(Concrete.BlockType.prototype), {

        init: function orphanedBlockInit(elem, edit_mode, default_area) {
            var my = this
            Concrete.BlockType.prototype.init.call(my, elem, edit_mode, elem.find('.block-content'), default_area)
        },

        handleDefaultArea: function () {
            var my = this
            $.pep.unbind(my.getPeper())
            my.getPeper().click(function (e) {
                my.handleClick()

                return false
            }).css({
                cursor: 'pointer'
            }).children('.block-name').css({
                cursor: 'pointer'
            })
        },

        removeElement: function () {
            this.getElem().remove()
        },

        addToDragArea: function OrphanedBlockAddToDragArea(drag_area) {
            var my = this
            var elem = my.getElem()
            var blockId = my.getId()
            var sourceAreaHandle = elem.data('sourceAreaHandle')
            var targetArea = drag_area.getArea()

            ConcretePanelManager.exitPanelMode()
            $.fn.dialog.closeAll()
            $.fn.dialog.showLoader()

            var send = {
                ccm_token: window.CCM_SECURITY_TOKEN,
                area: targetArea.getId(),
                sourceArea: sourceAreaHandle,
                block: blockId,
                blocks: []
            }

            var loaderDisplayed = false

            targetArea = targetArea.inEditMode(targetArea.getEditMode())

            send.blocks.push(my.getId())

            _(targetArea.getBlocks()).each(function (block, key) {
                send.blocks.push(block.getId())
            })
            my.bindMenu()
            var timeout = setTimeout(function () {
                loaderDisplayed = true
                $.fn.dialog.showLoader()
            }, 150)

            $.concreteAjax({
                url: CCM_DISPATCHER_FILENAME + '/ccm/system/page/arrange_blocks?cID=' + my.getCID(),
                dataType: 'json',
                data: send,
                skipResponseValidation: true,
                success: function (r) {
                    clearTimeout(timeout)
                    if (loaderDisplayed) {
                        $.fn.dialog.hideLoader()
                    }
                    ConcreteAjaxRequest.validateResponse(r, function (ok) {
                        if (ok) {
                            ConcreteToolbar.disableDirectExit()

                            // @todo: If there is a better way to force the destination area to reload the blocks replace the window.location.reload() statement.
                            window.location.reload()
                        }
                    })
                }
            })
        }
    })
})(window, jQuery); // eslint-disable-line semi
