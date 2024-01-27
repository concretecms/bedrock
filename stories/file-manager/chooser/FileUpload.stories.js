import FileUpload from '../../../assets/cms/components/file-manager/Chooser/FileUpload.vue'
import _ from 'underscore'
import 'dropzone'
import '../../../assets/cms/js/events'
import '../uploader/UploadFromComputer.scss'
import { action } from '@storybook/addon-actions'
import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.bootstrap5.css'

/**
 * @TODO Mock full functionality
 */

window._ = _
window.TomSelect = TomSelect
window.ConcreteAjaxRequest = action('ConcreteAjaxRequest')
window.CCM_DISPATCHER_FILENAME = ''
window.CCM_SECURITY_TOKEN = ''

export default {
    component: FileUpload,
    title: 'FileManager/Chooser/FileUpload'
}

export const basicUsage = {
    args: {
        title: 'Foo'
    }
}
