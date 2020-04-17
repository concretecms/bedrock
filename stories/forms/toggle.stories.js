import Toggle from '../../assets/cms/components/form/Toggle'
import Vue from 'vue'

// Add our component to the global vue instance
Vue.component('Toggle', Toggle)

// Set up the values for all stories in this file
export default {
    title: 'CMS/Forms/Toggle',
    component: Toggle
}

// Simplest usage with default sizing from the core
export const basicUsage = () => ({
    data: () => ({
        active: true
    }),
    methods: {
        handleClick(e) {
            console.log('click', e)
            this.active = !this.active
        }
    },
    template: `
    <div class='ccm-ui'>
        <fieldset>
            <legend class='mb-1'>Basic usage.</legend>
            <span>Current State: {{ active ? 'active' : 'inactive' }}</span>
            <Toggle @change="handleClick" :active="active">foo</Toggle>
        </fieldset>

        <fieldset class='mt-5'>
            <legend class='mb-1'>International titles</legend>
            <Toggle @change="handleClick" :active="active" affirmative-title='Igen' negative-title='Nem'>foo</Toggle>
        </fieldset>

        <fieldset class='mt-5'>
            <legend class='mb-1'>Undefined listener:</legend>
            <Toggle :active="active">foo</Toggle>
        </fieldset>
    </div>`
})
