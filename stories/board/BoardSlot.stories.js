import BoardSlot from '../../assets/cms/components/BoardSlot.vue'

/**
 * @TODO Make this a better representation of how this component should be used
 */
export default {
    component: BoardSlot,
    title: 'Boards/BoardSlot'
}

export const basicUsage = {
    args: {
        slotData: {
            slot: 'foo',
            slotType: 'S',
            boardInstanceID: 1,
            bID: 2,
            isLocked: true
        },
        style: 'max-width: 500px;position:relative'
    },
    render: (args) => ({
        components: { BoardSlot },
        setup: () => ({ args }),
        template: '<BoardSlot v-bind="args">Content</BoardSlot>'
    })
}
