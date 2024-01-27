import Files from '../../../assets/cms/components/file-manager/Chooser/Files.vue'
import { action } from '@storybook/addon-actions'
import _ from 'underscore'

/**
 * @TODO Mock the expected result from ConcreteAjaxRequest
 */

window._ = _
window.ConcreteAjaxRequest = action('ConcreteAjaxRequest')
window.CCM_DISPATCHER_FILENAME = ''
window.CCM_SECURITY_TOKEN = ''

export default {
    component: Files,
    title: 'FileManager/Chooser/Files'
}

export const basicUsage = {
    args: {
        routePath: '/foo'
    }
}
