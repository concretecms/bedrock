import Toggle from '../../assets/cms/components/form/Toggle.vue'
import { action } from '@storybook/addon-actions'
import { ref } from 'vue'

// Set up the values for all stories in this file
export default {
    title: 'Forms/Toggle',
    component: Toggle
    // tags: ['autodocs'],
}
export const basicUsage = {
    args: {
        modelValue: false,
        onChange: action('change')
    }
}

export const differentTitles = {
    args: {
        affirmativeTitle: 'Igen',
        negativeTitle: 'Nem'
    },
    render: (args) => ({
        components: { Toggle },
        setup: () => ({ args }),
        template: '<span>Is set: {{args.modelValue}}</span><Toggle v-bind="args" v-model="args.modelValue">foo</Toggle>'
    })
}
