import ImagePageCustomizerWidget from "../../assets/cms/components/customizer/ImagePageCustomizerWidget.vue";
import {action} from "@storybook/addon-actions";

export default {
    component: ImagePageCustomizerWidget,
    title: 'Customizer/ImagePageCustomizerWidget'
}

window.ConcreteFileManager = {
    launchDialog: action('ConcreteFileManager.launchDialog')
}

export const basicUsage = {
    args: {
        styleValue: {
            value: {
                imageURL: '',
                imageFileId: 4,
            },
            style: {
                variable: 'passed-in-variable',
                name: 'foo'
            }
        }
    }
}