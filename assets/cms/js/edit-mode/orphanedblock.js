/* eslint-disable no-new, no-unused-vars, camelcase */
/* global _, Concrete, ConcreteEvent, ConcretePanelManager, ConcreteToolbar, CCM_SECURITY_TOKEN, CCM_DISPATCHER_FILENAME */

import _ from 'underscore'

;(function(window, $) {
    'use strict'

    var OrphanedBlock = Concrete.OrphanedBlock = function OrphanedBlock(elem, edit_mode, dragger, default_area) {
        this.init.apply(this, _(arguments).toArray())
    }

    OrphanedBlock.prototype = _.extend(Object.create(Concrete.Block.prototype), {

        init: function(elem, edit_mode, dragger, default_area) {
            var my = this
            Concrete.Block.prototype.init.apply(my, _(arguments).toArray())
            my.setAttr('defaultArea', default_area || null)

            if (default_area) {
                if (default_area.acceptsOrphanedBlock(my.getHandle())) {
                    my.handleDefaultArea()
                } else {
                    my.removeElement()
                }
            }
        },

        handleDefaultArea: function() {
            var my = this
            $.pep.unbind(my.getPeper())
            my.getPeper().click(function (e) {
                my.handleClick()

                return false
            }).css({
                cursor: 'pointer'
            })
        },

        removeElement: function() {
            var panel = this.getPeper().closest('.ccm-panel-content-inner')
            this.getPeper().closest('li').remove()

            panel.children('.ccm-panel-add-block-set').each(function() {
                var ul = $(this).children('ul')
                if (!ul.children().length) {
                    $(this).remove()
                }
            })
        },

        handleClick: function() {
            var my = this; var default_area = my.getAttr('defaultArea')

            ConcretePanelManager.exitPanelMode(function() {
                _.defer(function() {
                    my.addToDragArea(_.last(default_area.getDragAreas()))
                })
            })
        },

        pepStart: function blockTypePepStart(context, event, pep) {
            var my = this; var panel
            Concrete.Block.prototype.pepStart.call(this, context, event, pep)

            my.setAttr('closedPanel', _(ConcretePanelManager.getPanels()).find(function (panel) {
                return panel.isOpen
            }))

            if ((panel = my.getAttr('closedPanel'))) {
                panel.hide()
            }
        },

        pepStop: function blockTypePepStop(context, event, pep) {
            var my = this; var drag_area; var panel

            if ((drag_area = my.getSelected())) {
                my.addToDragArea(drag_area)
            } else {
                if ((panel = my.getAttr('closedPanel'))) {
                    panel.show()
                }
            }

            _.defer(function () {
                Concrete.event.fire('EditModeBlockDragStop', { block: my, pep: pep, event: event })
            })

            my.getDragger().remove()
            my.setAttr('dragger', null)
        },

        addToDragArea: function blockTypeAddToDragArea(drag_area) {
            var my = this; var elem = my.getElem()
            var blockId = my.getId()
            var sourceAreaHandle = elem.data('sourceAreaHandle')
            var targetArea = drag_area.getArea()

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
                    ConcreteAjaxRequest.validateResponse(r, function(ok) {
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
