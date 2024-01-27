import ConcreteLocaleSelect from '../../assets/cms/components/form/ConcreteLocaleSelect.vue'
import { action } from '@storybook/addon-actions'
import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.bootstrap5.css'

window.TomSelect = TomSelect

export default {
    title: 'Forms/ConcreteLocaleSelect',
    component: ConcreteLocaleSelect
}

export const basicUsage = {
    args: {
        locales: [
            { id: 1, language: { text: 'Foo' }, flag: '/concrete/images/countries/us.png' },
            { id: 2, language: { text: 'Baz' }, flag: '/concrete/images/countries/jp.png' }
        ],
        selectedLocale: 1,
        name: 'locale-input',
        onChange: action('change')
    }
}
