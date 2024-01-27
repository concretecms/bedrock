import ConcreteThemeColorInput from "../../assets/cms/components/form/ConcreteThemeColorInput.vue";
import "tom-select/dist/css/tom-select.bootstrap5.css";
import TomSelect from "tom-select";
import {action} from "@storybook/addon-actions";

window.TomSelect = TomSelect

export default {
    title: 'Forms/ConcreteThemeColorInput',
    component: ConcreteThemeColorInput
}

const colorCollection = {
    colors: [
        {variable: 'danger', name: 'Danger'},
        {variable: 'warning', name: 'Warning'},
        {variable: 'info', name: 'Info'},
        {variable: 'dark', name: 'Dark'},
    ]
}

export const defaultUsage = {
    args: {
        colorCollection,
        onChange: action('change'),
    }
}

export const withValueSet = {
    args: {
        colorCollection,
        color: 'warning',
        onChange: action('change'),
    }
}