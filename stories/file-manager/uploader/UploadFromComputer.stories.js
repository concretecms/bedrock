import UploadFromComputer from '../../../assets/cms/components/file-manager/Uploader/UploadFromComputer.vue'
import _ from 'underscore'
import 'dropzone'
import '../../../assets/cms/js/events'
import './UploadFromComputer.scss'
import { action } from '@storybook/addon-actions'

/**
 * @TODO Make sure events are working properly
 */

window._ = _
window.CCM_DISPATCHER_FILENAME = ''

export default {
    component: UploadFromComputer,
    title: 'FileManager/Uploader/UploadFromComputer'
}

export const basicUsage = {
    args: {
        onFilesReadyToUpload: action('files-ready-to-upload'),
        onUploadProgressStateChange: action('uploadProgressStateChange'),
        onUploadComplete: action('upload-complete')
    }
}
