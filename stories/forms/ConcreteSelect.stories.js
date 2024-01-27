import ConcreteSelect from '../../assets/cms/components/form/ConcreteSelect.vue'
import 'tom-select/dist/css/tom-select.bootstrap5.css'
import TomSelect from 'tom-select'
import { action } from '@storybook/addon-actions'

window.TomSelect = TomSelect

export default {
    component: ConcreteSelect,
    title: 'Forms/ConcreteSelect',
    tags: ['autodocs']
}

export const basicUsage = {
    args: {
        name: 'foo',
        options: {
            foo: 'Foo',
            bar: 'Bar'
        },
        onChange: action('change')
    }
}

export const optionGroups = {
    args: {
        name: 'foo',
        options: {
            foo: {
                baz: 'Baz',
                bar: 'Bar'
            }
        },
        onChange: action('change')
    }
}

export const selectMultiple = {
    args: {
        name: 'foo',
        options: {
            foo: 'Foo',
            baz: 'Baz',
            bar: 'Bar'
        },
        multiple: true,
        onChange: action('change')
    }
}
