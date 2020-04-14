import Icon from '../../assets/cms/components/Icon.vue'
import Vue from 'vue'

Vue.component('Icon', Icon)

export default {
    title: 'Components/Icon',
    component: Icon
}

export const basicIcon = () => ({
    template: `
        <div>
            <p>With fontawesome solid icons
            <Icon icon="fa-trash" icon-type="fontawesome-solid" color="#7F7F7F"/>    
            </p>
            <p>With fontawesome regular icons
            <Icon icon="fa-trash-alt" icon-type="fontawesome-regular" color="#7F7F7F"/>    
            </p>
            <p>With fontawesome brand icons
            <Icon icon="fa-vuejs" icon-type="fontawesome-brand" color="#41b883"/>    
            </p>
        </div>
    `
})

export const iconWithOutline = () => '<Icon icon="fa-trash-alt" icon-type="fontawesome-regular" color="#7F7F7F" outline></Icon>'
export const iconWithLabel = () => '<Icon icon="fa-trash-alt" icon-type="fontawesome-regular" color="#7F7F7F">Delete</Icon>'
export const iconWithLabelToTheLeft = () => '<Icon icon="fa-trash-alt" icon-type="fontawesome-regular" color="#7F7F7F" label-position="left">Delete</Icon>'
export const disabledIcon = () => '<Icon icon="fa-trash-alt" icon-type="fontawesome-regular" color="#7F7F7F" disabled></Icon>'
export const disabledIconWithLabel = () => '<Icon icon="fa-trash-alt" icon-type="fontawesome-regular" color="#7F7F7F" disabled>Delete</Icon>'