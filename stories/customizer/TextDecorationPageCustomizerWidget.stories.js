import TextDecorationPageCustomizerWidget from "../../assets/cms/components/customizer/TextDecorationPageCustomizerWidget.vue";
import {action} from "@storybook/addon-actions";

export default {
    component: TextDecorationPageCustomizerWidget,
    title: 'Customizer/TextDecorationPageCustomizerWidget',
}

export const basicUsage = {
    args: {
        styleValue: {
            style: {
                variable: 'passed-in-variable',
            },
            value: {
                textDecoration: 'underline'
            }
        },
        onUpdate: action('update')
    },
}