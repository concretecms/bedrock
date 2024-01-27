import ExternalFileProvider from '../../../assets/cms/components/file-manager/Chooser/ExternalFileProvider.vue'
import { action } from '@storybook/addon-actions'
import _ from 'underscore'

window._ = _
window.ConcreteAjaxRequest = action('ConcreteAjaxRequest')
window.CCM_DISPATCHER_FILENAME = ''
window.CCM_SECURITY_TOKEN = ''

export default {
    component: ExternalFileProvider,
    title: 'FileManager/Chooser/ExternalFileProvider'
}

export const basicUsage = {
    args: {
        id: 4,
        title: 'Test'
    }
}
