import Icon from '../../assets/basics/js/forms/components/Icon.vue'
import Vue from 'vue'

Vue.component('Icon', Icon)

export default {
    title: 'Forms/Icon',
    component: Icon
}

export const basicUsage = () => '<Icon  icon="fa fa-cog">Mike was here</Icon>'