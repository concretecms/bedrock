import Chooser from '../../../assets/cms/components/file-manager/Chooser.vue'
import '../../../assets/cms/js/events'
import _ from 'underscore'

window._ = _

/**
 * @TODO Flesh this out with multiple chooser types
 */

export default {
    component: Chooser,
    title: 'FileManager/Chooser/Chooser'
}

export const basicUsage = {
    args: {}
}
