import Icon from '../../assets/cms/components/Icon.vue'
import Vue from 'vue'

Vue.component('Icon', Icon)

export default {
    title: 'Components/Icon',
    component: Icon
}

export const basicUsage = () => ({
    template: `
        <div>
            <p>With fontawesome solid icons</p>
            <Icon icon="fa-trash" type="fontawesome-solid" color="#7F7F7F"/>    
            
            <p>With fontawesome regular icons</p>
            <Icon icon="fa-trash-alt" type="fontawesome-regular" color="#7F7F7F"/>    
            
            <p>With fontawesome brand icons</p>
            <Icon icon="fa-vuejs" type="fontawesome-brand" color="#41b883"/>    
            
        </div>
    `
})
