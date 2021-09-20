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
export const iconSelector = () => `<div class="ccm-ui">
    <div class="form-group">
        <icon-selector name="fa-icon" />
    </div>
    <div class="form-group">
        <icon-selector name="fa-icon-selected" selected="fas fa-address-book" />
    </div>
    <div class="form-group">
        <icon-selector name="fa-icon-custom-title" title="Choose One" empty-option-label="Unselect" />
    </div>
</div>`

window.$ = window.jQuery = jQuery