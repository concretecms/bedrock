import Board from '../../assets/cms/components/Board.vue'

/**
 * @TODO Make this work with Board when Board does something
 */
export default {
    component: Board,
    title: 'Boards/Board'
}

export const basicUsage = {
    render: () => ({
        components: ['Board'],
        template: '<Board>This component has no functionality, just a single slot</Board>'
    })
}
