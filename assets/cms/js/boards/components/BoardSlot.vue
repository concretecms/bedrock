<template>
    <div class="ccm-block-edit">
        <i class="slot-pinned fas fa-thumbtack" v-if="isPinned"></i>

        <slot></slot>
    </div>
</template>

<script>
/* globals ConcreteMenu */
/* eslint-disable no-new */
import '../../in-context-menu'

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

        my.menu = menu
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
