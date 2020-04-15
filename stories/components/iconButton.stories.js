import IconButton from '../../assets/cms/components/IconButton.vue'
import Vue from 'vue'

Vue.component('IconButton', IconButton)

export default {
    title: 'Components/IconButton',
    component: IconButton
}

export const basicUsage = () => ({
    component: {
        IconButton
    },
    methods: {
        handleClick() {
            alert('Button Clicked.')
        }
    },
    template: `
    <div class="ccm-ui">
        <IconButton
            icon="fa-trash-alt"
            icon-type="fontawesome-regular"
            color="#7F7F7F"
            @click="handleClick"
        />  
    </div>
    `
})

export const basicUsageWithLabel = () => ({
    component: {
        IconButton
    },
    methods: {
        handleClick() {
            alert('Button Clicked.')
        }
    },
    template: `
    <div class="ccm-ui">
        <IconButton
            icon="fa-trash-alt"
            icon-type="fontawesome-regular"
            color="#7F7F7F"
            @click="handleClick"
        >
            Delete
        </IconButton>  
    </div>
    
    `
})

export const withOutlineIconOnly = () => ({
    component: {
        IconButton
    },
    methods: {
        handleClick() {
            alert('Button Clicked.')
        }
    },
    template: `
    <div class="ccm-ui">
        <IconButton
            icon="fa-trash-alt"
            icon-type="fontawesome-regular"
            @click="handleClick"
            bootstrap-class="btn-outline-secondary"
        />  
    </div>
    
    `
})

export const withLabelOutline = () => ({
    component: {
        IconButton
    },
    methods: {
        handleClick() {
            alert('Button Clicked.')
        }
    },
    template: `
    <div class="ccm-ui">
        <IconButton
            icon="fa-trash-alt"
            icon-type="fontawesome-regular"
            @click="handleClick"
            bootstrap-class="btn-outline-secondary"
        >
            Delete
        </IconButton>  
    </div>
    
    `
})

export const withLabelOutlineDisabled = () => ({
    component: {
        IconButton
    },
    methods: {
        handleClick() {
            alert('Button Clicked.')
        }
    },
    template: `
    <div class="ccm-ui">
        <IconButton
            icon="fa-trash-alt"
            icon-type="fontawesome-regular"
            color="#7F7F7F"
            @click="handleClick"
            bootstrap-class="btn-outline-secondary"
            disabled  
        >
            Delete
        </IconButton>  
    </div>
    
    `
})
