/* eslint-disable no-new */

import AvatarCropper from './frontend/components/AvatarCropper.vue'

$(function() {
    window.Concrete.Vue.createContext('frontend', {
        AvatarCropper
    })
    if (document.querySelectorAll('[data-view=account]').length) {
        Concrete.Vue.activateContext('frontend', function (Vue, config) {
            new Vue({
                el: '[data-view=account]',
                components: config.components
            })
        })
    }
})
