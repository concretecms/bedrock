<template>
    <div class="ccm-block-edit">
        <i class="slot-pinned fas fa-thumbtack" v-if="isPinned"></i>
        <div :class="'ccm-board-slot-' + slotData.slot + '-content'"><slot></slot></div>
    </div>
</template>

<script>
/* globals ConcreteMenu */
/* eslint-disable no-new */
import '../js/in-context-menu'
import Vue from 'vue'

export default {
    props: {
        slotData: Object
    },
    data: () => ({
        menu: null,
        isPinned: Boolean
    }),
    methods: {},
    watch: {
        isPinned: {
            immediate: true,
            handler: function (value) {
                if (this.menu) {
                    if (value) {
                        this.menu.$menu.find('a[data-menu-action=pin-item]').hide()
                        this.menu.$menu.find('a[data-menu-action=unpin-item]').show()
                    } else {
                        this.menu.$menu.find('a[data-menu-action=pin-item]').show()
                        this.menu.$menu.find('a[data-menu-action=unpin-item]').hide()
                    }
                }
            }
        }
    },
    mounted() {
        this.isPinned = this.slotData.isPinned
        var my = this
        /* eslint-disable-next-line no-unused-vars */
        const menu = new ConcreteMenu($(this.$el), {
            highlightClassName: 'ccm-block-highlight',
            menuActiveClass: 'ccm-block-highlight',
            menu: 'div[data-menu-board-instance-slot-id=' + my.slotData.slot + ']'
        })

        menu.$menu.find('a[data-menu-action=pin-item]').on('click', function () {
            new ConcreteAjaxRequest({
                url: CCM_DISPATCHER_FILENAME + '/ccm/system/board/instance/pin_slot',
                data: {
                    slot: my.slotData.slot,
                    boardInstanceID: my.slotData.boardInstanceID,
                    bID: my.slotData.bID,
                    action: 'pin'
                },
                success: function (r) {
                    my.isPinned = r.isPinned
                }
            })
        })

        menu.$menu.find('a[data-menu-action=unpin-item]').on('click', function () {
            new ConcreteAjaxRequest({
                url: CCM_DISPATCHER_FILENAME + '/ccm/system/board/instance/pin_slot',
                data: {
                    slot: my.slotData.slot,
                    boardInstanceID: my.slotData.boardInstanceID,
                    action: 'unpin'
                },
                success: function (r) {
                    my.isPinned = r.isPinned
                }
            })
        })

        menu.$menu.find('a[data-menu-action=replace-slot]').on('click', function () {
            $.fn.dialog.open({
                href: CCM_DISPATCHER_FILENAME + '/ccm/system/dialogs/boards/custom_slot/replace?boardInstanceID=' +
                        my.slotData.boardInstanceID + '&slot=' + my.slotData.slot,
                width: '90%',
                height: '80%',
                title: 'Replace Slot'
            })
        })

        my.menu = menu

        ConcreteEvent.subscribe('SaveCustomSlot', function(e, data) {
            // This is hideous. Horrendous. Refactor this to include the BoardSlot component and the chooser
            // of slot data within the same component, using the bootstrap-vue modal component
            if (data.slot === my.slotData.slot) {
                const res = Vue.compile('<div>' + data.content + '</div>')
                const element = my.$el.querySelector('.ccm-board-slot-' + data.slot + '-content')
                new Vue({
                    el: element,
                    render: res.render,
                    staticRenderFns: res.staticRenderFns,
                    state: my.$state
                })
            }
        })
    }
}
</script>

<style lang="scss" scoped>
  i.slot-pinned {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 600; // $index-level-inline-commands;
  }
</style>
