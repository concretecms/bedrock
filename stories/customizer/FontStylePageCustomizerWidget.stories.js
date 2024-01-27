import FontStylePageCustomizerWidget from "../../assets/cms/components/customizer/FontStylePageCustomizerWidget.vue";
import {action} from "@storybook/addon-actions";

export default {
    component: FontStylePageCustomizerWidget,
    title: 'Customizer/FontStylePageCustomizerWidget'
}

export const basicUsage = {
    args: {
        styleValue: {
            style: {
                variable: 'passed-in-variable',
            },
            value: {
                fontStyle: 'italic'
            }
        },
        onUpdate: action('update')
    }
}