import FontWeightPageCustomizerWidget from '../../assets/cms/components/customizer/FontWeightPageCustomizerWidget.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: FontWeightPageCustomizerWidget,
    title: 'Customizer/FontWeightPageCustomizerWidget'
}

export const basicUsage = {
    args: {
        styleValue: {
            value: { fontWeight: 'bold' },
            style: {
                variable: 'provided-variable'
            }
        },
        onUpdate: action('update')
    }
}
