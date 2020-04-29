import IconButton, { types as buttonTypes } from '../../assets/cms/components/IconButton.vue'
import { types, icons } from '../../assets/cms/components/iconlist'

export default {
    title: 'Basics/IconButton',
    component: IconButton
}

export const allButtonTypes = () => ({
    components: {
        IconButton,
        ...IconButton.components
    },
    data: () => ({
        types: Object.values(buttonTypes),
        clicks: 0
    }),
    filters: {
        capitalize(string) {
            return string[0].toUpperCase() + string.substr(1)
        }
    },
    template: `
    <div class='ccm-ui'>
        <p>Clicks: {{ clicks }}</p>
        <div class='d-flex relative'>
            <div class='ml-2 d-flex flex-column' v-for='(type, idx) in types'>
                <div class='d-flex align-items-baseline justify-content-end'>
                    <strong class='mr-2'v-if='idx === 0'>Regular</strong>
                    <IconButton button-class='mb-2' @click='() => clicks++' v-bind='{type}' icon='trash' icon-type='fas'>{{ type | capitalize }}</IconButton>
                </div>
                <div class='d-flex align-items-baseline justify-content-end'>
                    <strong class='mr-2' v-if='idx === 0'>Active</strong>
                    <IconButton button-class='mb-2 active' @click='() => clicks++' v-bind='{type}' icon='trash' icon-type='fas'>{{ type | capitalize }}</IconButton>
                </div>
                <div class='d-flex align-items-baseline justify-content-end'>
                    <strong class='mr-2' v-if='idx === 0'>Disabled</strong>
                    <IconButton button-class='mb-2 disabled' disabled @click='() => clicks++' v-bind='{type}' icon='trash' icon-type='fas'>{{ type | capitalize }}</IconButton>
                </div>
            </div>
        </div>
    </div>
    `
})

export const iconButton = () => ({
    components: {
        IconButton,
        ...IconButton.components
    },
    data: () => ({
        clicks: 0
    }),
    template: `
    <div class="ccm-ui">
        <p>Clicks: {{clicks}}</p>
        <IconButton type="${buttonTypes.add}" icon="${icons.far.trashAlt}" @click="clicks++" />
    </div>
    `
})

export const svgUsage = () => ({
    components: {
        IconButton,
        ...IconButton.components
    },
    data: () => ({
        clicks: 0
    }),
    template: `
    <div class="ccm-ui">
        <p>Clicks: {{clicks}}</p>
        <IconButton iconType="${types.svg}" icon="${icons.svg.plus}" type="${buttonTypes.add}" @click="clicks++" />
        <IconButton iconType="${types.svg}" icon="${icons.svg.dialogClose}" type="${buttonTypes.delete}" @click="clicks--" />
    </div>
    `
})

export const labeledButton = () => ({
    components: {
        IconButton,
        ...IconButton.components
    },
    data: () => ({
        clicks: 0
    }),
    template: `
    <div class="ccm-ui">
        <p>Clicks: {{clicks}}</p>
        <IconButton
            type="${buttonTypes.delete}"
            icon="${icons.far.trashAlt}"
            icon-type="${types.far}"
            @click="clicks++"
        >
            Delete
        </IconButton>  
    </div>
    
    `
})

export const iconButtonWithOutline = () => ({
    components: {
        IconButton,
        ...IconButton.components
    },
    data: () => ({
        clicks: 0
    }),
    template: `
    <div class="ccm-ui">
        <p>Clicks: {{clicks}}</p>
        <IconButton
            icon="${icons.far.trashAlt}"
            icon-type="${types.far}"
            @click="clicks++"
            type="${buttonTypes.outline}"
        />  
    </div>
    
    `
})

export const labeledWithOutline = () => ({
    components: {
        IconButton,
        ...IconButton.components
    },
    data: () => ({
        clicks: 0
    }),
    template: `
    <div class="ccm-ui">
        <p>Clicks: {{clicks}}</p>
        <IconButton
            icon="${icons.far.trashAlt}"
            icon-type="${types.far}"
            @click="clicks++"
            type="${buttonTypes.outline}"
            label-position="left"
        >
            Delete
        </IconButton>  
    </div>
    
    `
})

export const disabled = () => ({
    components: {
        IconButton,
        ...IconButton.components
    },
    data: () => ({
        clicks: 0
    }),
    template: `
    <div class="ccm-ui">
        <p>Clicks: {{clicks}}</p>
        <IconButton
            icon="${icons.far.trashAlt}"
            icon-type="${types.far}"
            @click="clicks++"
            format="outline"
            disabled  
        >
            Delete
        </IconButton>  
    </div>
    
    `
})
