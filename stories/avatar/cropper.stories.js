import Cropper from '../../assets/account/js/frontend/components/Avatar/Cropper.vue'
import Vue from 'vue'

// Add our component to the global vue instance
Vue.component('cropper', Cropper)

// Set up the values for all stories in this file
export default {
    title: 'Account/Cropper',
    component: Cropper
}

// Simplest usage with default sizing from the core
export const basicUsage = () => '<cropper :width=150 :height=150 uploadurl="https://jsonplaceholder.typicode.com/posts" src="https://via.placeholder.com/150" />'

// An example of a different form factor being used
export const differentSizes = () => '<cropper :width=400 :height=300 uploadurl="https://jsonplaceholder.typicode.com/posts" src="https://via.placeholder.com/400x300" />'
