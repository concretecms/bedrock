import Toggle from '../../assets/cms/components/form/Toggle'

// Set up the values for all stories in this file
export default {
    title: 'CMS/Forms',
    component: Toggle
}

// Simplest usage with default sizing from the core
export const toggle = () => ({
    data: () => ({
        active: true
    }),
    components: {
        Toggle,
        ...Toggle.components
    },
    template: `
    <div class='ccm-ui'>
        <fieldset class='mb-5'>
            <legend class='mb-0'>Recommended: "v-model" usage:</legend>
            <Toggle v-model="active">foo</Toggle>
        </fieldset>

        <fieldset class='mb-5'>
            <legend class='mb-0'>Basic direct usage.</legend>
            <span>Current State: {{ active ? 'active' : 'inactive' }}</span>
            <Toggle @change="active = !active" :value="active">foo</Toggle>
        </fieldset>

        <fieldset class='mb-5'>
            <legend class='mb-0'>International titles</legend>
            <Toggle @change="active = !active" :value="active" affirmative-title='Igen' negative-title='Nem'>foo</Toggle>
        </fieldset>

        <fieldset class='mb-5'>
            <legend class='mb-0'>Undefined listener:</legend>
            <Toggle :value="active">foo</Toggle>
        </fieldset>
    </div>`
})
