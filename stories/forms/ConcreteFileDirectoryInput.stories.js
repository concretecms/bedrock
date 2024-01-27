
// Set up the values for all stories in this file
import Toggle from '../../assets/cms/components/form/Toggle.vue'
import ConcreteFileDirectoryInput from '../../assets/cms/components/form/ConcreteFileDirectoryInput.vue'
import _ from 'underscore'
import { action } from '@storybook/addon-actions'
import 'tom-select/dist/css/tom-select.bootstrap5.css'
import TomSelect from 'tom-select'

window._ = _
window.TomSelect = TomSelect
window.CCM_DISPATCHER_FILENAME = ''
window.CCM_SECURITY_TOKEN = 'security'
window.ConcreteAjaxRequest = function(data) {
    action('ConcreteAjaxRequest')(data)
    data.success({
        directories: [
            { value: 'option 1', text: 'Option 1' },
            { value: 'option 2', text: 'Option 2' }
        ]
    })
}

export default {
    title: 'Forms/ConcreteFileDirectoryInput',
    component: ConcreteFileDirectoryInput
}
export const basicUsage = {
    args: {
        inputLabel: 'Label',
        inputName: 'foo',
        directoryId: 10,
        showAddDirectoryButton: false,
        disabled: false
    }
}
