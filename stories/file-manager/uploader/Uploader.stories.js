import Uploader from "../../../assets/cms/components/file-manager/Uploader.vue";
import _ from 'underscore'
import "dropzone"
import "../../../assets/cms/js/events"
import "./UploadFromComputer.scss"
import TomSelect from "tom-select";
import 'tom-select/dist/css/tom-select.bootstrap5.css'
import {action} from "@storybook/addon-actions"


/**
 * @TODO Make sure events are working properly
 */

window._ = _
window.CCM_DISPATCHER_FILENAME = ''
window.CCM_SECURITY_TOKEN = ''
window.TomSelect = TomSelect
window.ConcreteAjaxRequest = action('ConcreteAjaxRequest')

export default {
    component: Uploader,
    title: 'FileManager/Uploader/Uploader',
}

export const basicUsage = {
    args: {},
}