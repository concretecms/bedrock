import IconButton from '../../assets/cms/components/IconButton.vue'
import { Types, Icons } from '../../assets/cms/components/Icon.vue'
import Vue from 'vue'

Vue.component('IconButton', IconButton)

export default {
    title: 'Basics/IconButton',
    component: IconButton
}

export const iconButton = () => ({
    component: {
        IconButton
    },
    data: () => ({
        clicks: 0
    }),
    template: `
    <div class="ccm-ui">
        <p>Clicks: {{clicks}}</p>
        <IconButton icon="${Icons.far.trashAlt}" @click="clicks++" />
    </div>
    `
})

console.log(Icons)
export const svgUsage = () => ({
    component: {
        IconButton
    },
    data: () => ({
        clicks: 0
    }),
    template: `
    <div class="ccm-ui">
        <p>Clicks: {{clicks}}</p>
        <IconButton iconType="${Types.svg}" icon="${Icons.svg.plus}" @click="clicks++" />
        <IconButton iconType="${Types.svg}" icon="${Icons.svg.dialogClose}" @click="clicks++" />
    </div>
    `
})

export const labeledButton = () => ({
    component: {
        IconButton
    },
    data: () => ({
        clicks: 0
    }),
    template: `
    <div class="ccm-ui">
        <p>Clicks: {{clicks}}</p>
        <IconButton
            icon="${Icons.far.trashAlt}"
            icon-type="${Types.far}"
            icon-color="#7F7F7F"
            @click="clicks++"
        >
            Delete
        </IconButton>  
    </div>
    
    `
})

export const iconButtonWithOutline = () => ({
    component: {
        IconButton
    },
    data: () => ({
        clicks: 0
    }),
    template: `
    <div class="ccm-ui">
        <p>Clicks: {{clicks}}</p>
        <IconButton
            icon="${Icons.far.trashAlt}"
            icon-type="${Types.far}"
            @click="clicks++"
            format="outline-primary"
        />  
    </div>
    
    `
})

export const labeledWithOutline = () => ({
    component: {
        IconButton
    },
    data: () => ({
        clicks: 0
    }),
    template: `
    <div class="ccm-ui">
        <p>Clicks: {{clicks}}</p>
        <IconButton
            icon="${Icons.far.trashAlt}"
            icon-type="${Types.far}"
            @click="clicks++"
            format="outline"
            label-position="left"
        >
            Delete
        </IconButton>  
    </div>
    
    `
})

export const disabled = () => ({
    component: {
        IconButton
    },
    data: () => ({
        clicks: 0
    }),
    template: `
    <div class="ccm-ui">
        <p>Clicks: {{clicks}}</p>
        <IconButton
            icon="${Icons.far.trashAlt}"
            icon-type="${Types.far}"
            @click="clicks++"
            format="outline"
            disabled  
        >
            Delete
        </IconButton>  
    </div>
    
    `
})
