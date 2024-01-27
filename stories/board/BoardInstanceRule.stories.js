import BoardInstanceRule from '../../assets/cms/components/BoardInstanceRule.vue'

/**
 * @TODO: Make this render as expected
 */
export default {
    component: BoardInstanceRule,
    title: 'Boards/BoardInstanceRule'
}

export const basicUsage = {
    args: {
        rule: {
            slot: 'Slot',
            name: 'Rule Name'
        }
    }
}
