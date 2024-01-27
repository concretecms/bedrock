import ConcreteOptionSelect from '../../assets/cms/components/form/ConcreteOptionSelect.vue'
import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.bootstrap5.css'
import { rest } from 'msw'
import { action } from '@storybook/addon-actions'

window.TomSelect = TomSelect

const items = [
    { id: 270, primary_label: 'Products' },
    { id: 271, primary_label: 'Some other page' },
    { id: 272, primary_label: 'A quick brown fox jumped over the lazy dog.' }
]

export default {
    component: ConcreteOptionSelect,
    title: 'Forms/ConcreteOptionSelect',
    parameters: {
        msw: [
            rest.post('/selected-option-url', (req, res, ctx) => {
                return res(ctx.json(items.slice(0, 1)))
            }),
            rest.post('/data-source-url', (req, res, ctx) => {
                return res(ctx.json(items))
            })
        ]
    }
}

export const basicUsage = {
    args: {
        accessToken: '',
        dataSourceUrl: '/data-source-url',
        attributeKeyId: 1,
        selectedOptionsUrl: '/selected-option-url',
        onChange: action('change')
    }
}

export const preselected = {
    args: {
        accessToken: '',
        dataSourceUrl: '/data-source-url',
        attributeKeyId: 1,
        selectedOptionsUrl: '/selected-option-url',
        value: [270],
        onChange: action('change')
    }
}
