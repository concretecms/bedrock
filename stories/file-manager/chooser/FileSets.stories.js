import FileSets from "../../../assets/cms/components/file-manager/Chooser/FileSets.vue";
import _ from 'underscore'
import {action} from "@storybook/addon-actions";

/**
 * @TODO Make this display more functionality
 */

window._ = _
window.ConcreteAjaxRequest = action('ConcreteAjaxRequest')
window.CCM_DISPATCHER_FILENAME = ''
window.CCM_SECURITY_TOKEN = ''

export default {
    component: FileSets,
    title: 'FileManager/Chooser/FileSets',
}

export const basicUsage = {
    args: {
        title: 'Foo'
    },
}