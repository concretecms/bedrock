import InputGroup from '../../assets/cms/components/InputGroup.vue'
import Vue from 'vue'

Vue.component('InputGroup', InputGroup)

export default {
    title: 'Components/InputGroup',
    component: InputGroup
}

export const basicUsage = () => '<InputGroup label="First Name" />'