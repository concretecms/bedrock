import TextTransformPageCustomizerWidget
    from "../../assets/cms/components/customizer/TextTransformPageCustomizerWidget.vue";
import {action} from "@storybook/addon-actions";

export default {
    component: TextTransformPageCustomizerWidget,
    title: 'Customizer/TextTransformPageCustomizerWidget',
}

export const basicUsage = {
    args: {
        styleValue: {
            value: {textTransform: 'lowercase'},
            style: {variable: 'provided-variable'}
        },
        onUpdate: action('update')
    },
}