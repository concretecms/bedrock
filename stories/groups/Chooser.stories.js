import Chooser from '../../assets/cms/components/groups/Chooser.vue'
import jQuery from 'jquery'
import 'jquery-ui'

import '../../assets/cms/js/tree'
import { action } from '@storybook/addon-actions'

import 'jquery.fancytree'
import 'jquery.fancytree/dist/modules/jquery.fancytree.glyph'
import 'jquery.fancytree/dist/modules/jquery.fancytree.dnd'
window.$ = window.jquery = window.jQuery = jQuery

/**
 * @TODO Get fancy tree rendering properly. It seems like jquery UI isn't registering how I'd expect or something
 */

window.CCM_SECURITY_TOKEN = ''
window.CCM_DISPATCHER_FILENAME = ''

window.ConcreteAjaxRequest = function(data) {
    action('ConcreteAjaxRequest')(data)

    if (data.url === '/ccm/system/group/chooser/tree') {
        data.success({ treeID: 1 })
    }
}

export default {
    component: Chooser,
    title: 'Groups/Chooser'
}

export const basicUsage = {
    args: {}
}
