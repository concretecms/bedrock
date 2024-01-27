<template>
    <div class='menubutton-wrapper dropdown'>
        <IconButton
            @click='(...args) => $emit("click", ...args)'
            v-bind="{
                type: active ? $options.buttonTypes.save : $options.buttonTypes.outline,
                icon: icon,
                iconType: iconType
            }">
            {{ title }}
        </IconButton>
        <slot></slot>
    </div>
</template>
<script>
import ContextMenu from './ContextMenu.vue'
import MenuItem from './MenuItem.vue'
import MenuDivider from './MenuDivider.vue'
import IconButton, { types as buttonTypes } from '../IconButton.vue'
import { icons, types } from '../iconlist'

export default {
    buttonTypes,
    components: {
        IconButton,
        ContextMenu,
        MenuItem,
        MenuDivider,
        ...IconButton.components
    },
    emits: ['click'],
    props: {
        title: String,
        icon: {
            type: String,
            default: icons.fas.ellipsisH
        },
        iconType: {
            type: String,
            default: types.fas
        },
        active: {
            type: Boolean,
            required: true
        }
    }
}
</script>
