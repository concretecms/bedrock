import IconButton from '../../assets/cms/components/IconButton.vue'
import Vue from 'vue'

Vue.component('IconButton', IconButton)

export default {
    title: 'Components/IconButton',
    component: IconButton
}

export const basicUsage = () => ({
    template: `
    <IconButton
        icon="fa-trash-alt"
        type="fontawesome-regular"
        color="#7F7F7F"
    >
        Delete
    </IconButton>  
    `
})

export const onlyIcon = () => ({
    template: `
    <IconButton
        icon="fa-trash-alt"
        type="fontawesome-regular"
        color="#7F7F7F"
        outline
    >
    </IconButton>  
    `
})

export const withLabelOutline = () => ({
    template: `
    <IconButton
        icon="fa-trash-alt"
        type="fontawesome-regular"
        color="#7F7F7F"
        outline
    >
        Delete
    </IconButton>  
    `
})

export const withLabelOutlineDisabled = () => ({
    template: `
    <IconButton
        icon="fa-trash-alt"
        type="fontawesome-regular"
        color="#7F7F7F"
        disabled
    >
        Delete
    </IconButton>  
    `
})