import SavedSearch from "../../../assets/cms/components/file-manager/Chooser/SavedSearch.vue";
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
    component: SavedSearch,
    title: 'FileManager/Chooser/SavedSearch',
}

export const basicUsage = {
    args: {
        title: 'Foo'
    },
}