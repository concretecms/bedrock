import FontFamilyPageCustomizerWidget from '../../assets/cms/components/customizer/FontFamilyPageCustomizerWidget.vue'
import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.bootstrap5.css'
import { action } from '@storybook/addon-actions'

window.TomSelect = TomSelect

export default {
    component: FontFamilyPageCustomizerWidget,
    title: 'Customizer/FontFamilyPageCustomizerWidget'
}

export const basicUsage = {
    args: {
        styleValue: {
            value: { fontFamily: 'foo' },
            style: {
                variable: 'passed-in-variable',
                fonts: [
                    { type: 'baz', name: 'bar' }
                ]
            }
        },
        onUpdate: action('update')
    }
}
