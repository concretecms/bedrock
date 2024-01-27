import FileManager from '../../../assets/cms/components/file-manager/Chooser/FileManager.vue'
import _ from 'underscore'
import { action } from '@storybook/addon-actions'

/**
 * @TODO Mock the ajax requests
 */

window._ = _
window.ConcreteAjaxRequest = action('ConcreteAjaxRequest')
window.CCM_DISPATCHER_FILENAME = ''
window.CCM_SECURITY_TOKEN = ''

export default {
    component: FileManager,
    title: 'FileManager/Chooser/FileManager'
}

export const basicUsage = {
    args: {
        title: 'Foo',
        startFolder: 'foo'
    }
}
