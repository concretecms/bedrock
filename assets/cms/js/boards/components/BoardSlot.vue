<template>
    <div class="ccm-block-edit">
        <i class="fas fa-thumbtack" v-if="isPinned"></i>
        <slot></slot>
    </div>
</template>

<script>
/* globals ConcreteBoardSlotMenu */
import '../menu'

export default {
    props: {
        instanceSlotId: Number,
        isPinned: Boolean
    },
    data: () => ({

    }),
    methods: {

    },
    mounted() {
        /* eslint-disable-next-line no-unused-vars */
        const menu = new ConcreteBoardSlotMenu($(this.$el), {
            highlightClassName: 'ccm-block-highlight',
            menuActiveClass: 'ccm-block-highlight',
            menu: 'div[data-menu-board-instance-slot-id=' + this.instanceSlotId + ']'
        })
    }
}
</script>
