import jQuery from 'jquery'
import 'bootstrap'
import 'bootstrap-select'
import IconSelector from "../../assets/cms/components/form/IconSelector";
import Vue from 'vue'

// Add our component to the global vue instance
Vue.component('icon-selector', IconSelector)

// Set up the values for all stories in this file
export default {
    title: 'CMS/Forms',
    component: IconSelector
}

// Simplest usage with default sizing from the core
export const iconSelector = () => '<div class="ccm-ui"><icon-selector name="fa-icon" /></div>'

window.$ = window.jQuery = jQuery