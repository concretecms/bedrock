import ToolbarSectionWidget from '../../assets/cms/components/customizer/block/ToolbarSectionWidget.vue'

/**
 * @TODO Get CSS loading properly for this
 */
export default {
    component: ToolbarSectionWidget,
    title: 'Customizer/Block/ToolbarSectionWidget'
}

export const basicUsage = {
    args: {},
    render: (args) => ({
        components: { ToolbarSectionWidget },
        setup: () => ({ args }),
        template: '<ToolbarSectionWidget>Dropdown contents</ToolbarSectionWidget>'
    })
}
