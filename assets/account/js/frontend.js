import './frontend/draft-list'
import './frontend/notification'

import Vue from 'vue'

// Load up our cropper
Vue.component('avatar-cropper', require('./frontend/components/Avatar/Cropper.vue'))

window.Vue = Vue;
