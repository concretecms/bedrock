import Toggle from '../../assets/cms/components/Toggle.vue'
import Vue from 'vue'

Vue.component('Toggle', Toggle)

export default {
    title: 'Components/Toggle',
    component: Toggle
}

export const basicToggle = () => ({
    component: {
        Toggle
    },
    data() {
        return {
            isChecked: false,
        }
    },
    methods: {
        handleClick(e) {
            if (this.isChecked) {
                this.isChecked = false
            } else {
                this.isChecked = true
            }
            console.log(this.isChecked)
        }
    },
    template: `
        <Toggle toggle-default-label="I agree to the terms and conditions."  
            toggle-default-icon="fa-square" 
            toggle-checked-icon="fa-check-square" 
            icon-type="fontawesome-regular" 
            icon-default-color="#D8D8D8"  
            @click="handleClick"
            v-bind:checked="isChecked"
        />   
    `
})


export const toggleOptions = () => ({
    component: {
        Toggle
    },
    data() {
        return {
            isChecked: false,
        }
    },
    methods: {
        handleClick(e) {
            if (this.isChecked) {
                this.isChecked = false
            } else {
                this.isChecked = true
            }
            console.log(this.isChecked)
        }
    },
    template: `
    <Toggle toggle-default-label="No" 
        toggle-checked-label="Yes" 
        toggle-default-icon="fa-circle" 
        toggle-checked-icon="fa-dot-circle" 
        icon-type="fontawesome-regular" 
        icon-default-color="#D8D8D8" 
        icon-checked-color="#4A90E2" 
        label-position="left"
        @click="handleClick"
        v-bind:checked="isChecked"
    />
    `
})



