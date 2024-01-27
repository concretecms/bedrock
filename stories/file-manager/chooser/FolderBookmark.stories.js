import FolderBookmark from "../../../assets/cms/components/file-manager/Chooser/FolderBookmark.vue";
import {action} from "@storybook/addon-actions";
import _ from 'underscore'

/**
 * @TODO Make this display more functionality
 */

window._ = _
window.ConcreteAjaxRequest = action('ConcreteAjaxRequest')
window.CCM_DISPATCHER_FILENAME = ''
window.CCM_SECURITY_TOKEN = ''

export default {
    component: FolderBookmark,
    title: 'FileManager/Chooser/FolderBookmark',
}

export const basicUsage = {
    args: {
        startFolder: 1,
        title: 'Foo'
    },
}