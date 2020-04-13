import Icon from '../../assets/cms/components/Icon.vue'
import Vue from 'vue'

Vue.component('Icon', Icon)

export default {
    title: 'Components/Icon',
    component: Icon
}

export const basicIcon = () => '<Icon icon="fa fa-trash-o" color="#7F7F7F"></Icon>'
export const iconWithOutline = () => '<Icon icon="fa fa-trash-o" color="#7F7F7F" outline></Icon>'
export const iconWithLabel = () => '<Icon icon="fa fa-trash-o" color="#7F7F7F">Delete</Icon>'
export const iconWithLabelToTheLeft = () => '<Icon icon="fa fa-trash-o" color="#7F7F7F" label-position="left">Delete</Icon>'
export const disabledIcon = () => '<Icon icon="fa fa-trash-o" color="#7F7F7F" disabled></Icon>'
export const disabledIconWithLabel = () => '<Icon icon="fa fa-trash-o" color="#7F7F7F" disabled>Delete</Icon>'