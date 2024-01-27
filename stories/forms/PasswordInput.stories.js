import PasswordInput from '../../assets/cms/components/form/PasswordInput.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: PasswordInput,
    title: 'Forms/PasswordInput'
}

export const basicUsage = {
    args: {
        strengthMeter: true,

        onChange: action('change')
    }
}
