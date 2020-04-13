import Toggle from '../../assets/cms/components/Toggle.vue'
import Vue from 'vue'

Vue.component('Toggle', Toggle)

export default {
    title: 'Components/Toggle',
    component: Toggle
}

export const basicToggle = () => '<Toggle toggle-default-label="I agree to the terms and conditions."  toggle-default-icon="fa-square-o" toggle-checked-icon="fa-check-square" icon-type="regular" icon-default-color="#D8D8D8" checked />'
export const toggleOptions = () => '<Toggle toggle-default-label="No" toggle-checked-label="Yes" toggle-default-icon="fa-circle-o" toggle-checked-icon="fa-circle" icon-default-color="#D8D8D8" icon-checked-color="#4A90E2" label-position="left"/>'

