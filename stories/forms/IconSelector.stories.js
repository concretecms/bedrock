import jQuery from 'jquery'
import 'bootstrap'
import TomSelect from 'tom-select'
import IconSelector from '../../assets/cms/components/form/IconSelector.vue'
import 'tom-select/dist/css/tom-select.bootstrap5.css'
import {action} from "@storybook/addon-actions";
import {ref} from "vue";

window.TomSelect = TomSelect

// Set up the values for all stories in this file
export default {
    title: 'Forms/IconSelector',
    component: IconSelector,
    decorators: [() => ({
        setup() {
            const form = ref(null)
            return {
                form,
                formData(form) {
                    const result = {}
                    const data = $(form).serializeArray().map(({name, value}) => result[name] = value)
                    return result
                }
            }
        },
        template: `
            <form ref="form"><story/></form>
            <h5>Form Data</h5>
            <pre>{{ formData(form) }}</pre>
        `,
    })],
    tags: ['autodocs']
}


export const basicUsage = {
    args: {
        name: 'icon',
        onUpdate: action('update'),
    }
}

export const defaultSelected = {
    args: {
        name: 'icon',
        selected: 'fas fa-address-book',
        onUpdate: action('update'),
    }
}

export const customTitle = {
    args: {
        name: 'fa-icon-custom-title',
        emptyOptionLabel: 'Choose One',
        onUpdate: action('update'),
    }
}
