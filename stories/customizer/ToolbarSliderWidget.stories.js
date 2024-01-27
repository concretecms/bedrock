import ToolbarSliderWidget from '../../assets/cms/components/customizer/block/ToolbarSliderWidget.vue'
import { action } from '@storybook/addon-actions'
import { ref } from 'vue'

export default {
    component: ToolbarSliderWidget,
    title: 'Customizer/Block/ToolbarSliderWidget'
}

const value = ref(1)
export const basicUsage = {
    args: {
        units: 'px',
        onInput(v) {
            action('input')(v)
            value.value = v
        },
        value
    }
}
