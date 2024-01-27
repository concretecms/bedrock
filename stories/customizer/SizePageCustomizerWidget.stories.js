import SizePageCustomizerWidget from '../../assets/cms/components/customizer/SizePageCustomizerWidget.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: SizePageCustomizerWidget,
    title: 'Customizer/SizePageCustomizerWidget'
}

export const basicUsage = {
    args: {
        styleValue: {
            style: {
                variable: 'passed-in-variable'
            },
            value: {
                size: 50,
                unit: 'px'
            }
        },
        onUpdate: action('update')
    }
}
