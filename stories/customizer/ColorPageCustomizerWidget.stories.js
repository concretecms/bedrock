import ColorPageCustomizerWidget from "../../assets/cms/components/customizer/ColorPageCustomizerWidget.vue";
import {action} from "@storybook/addon-actions";
import 'spectrum-colorpicker2'
import 'spectrum-colorpicker2/dist/spectrum.css'

export default {
    component: ColorPageCustomizerWidget,
    title: 'Customizer/ColorPageCustomizerWidget',
}

export const basicUsage = {
    args: {
        styleValue: {
            value: 'red',
            style: {
                variable: 'provided-variable'
            }
        },
        onUpdate: action('update'),
    },
}