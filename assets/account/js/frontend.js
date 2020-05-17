import AvatarCropper from './frontend/components/Avatar/Cropper.vue'

window.Concrete.Vue.createContext('frontend', {
    AvatarCropper
})

Concrete.Vue.activateContext('frontend', '[data-view=account]', document)
