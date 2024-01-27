<template>
    <i v-if='$options.methods.isFontAwesome(type)' class="icon"
        :class="[{
            fas: type === iconTypes.fas,
            far: type === iconTypes.far,
            fab: type === iconTypes.fab,
        }, (icon || []).indexOf('fa-') === 0 ? icon : `fa-${icon}`]"
        :style="{ color: color }"
    />
    <svg v-else-if='$options.methods.isSvg(type)' viewport='0 0 20 20' width='20px' height='20px'>
        <use :xlink:href='`${spritePath}#icon-${icon}`' :style='`fill: ${color}`'></use>
    </svg>
    <span v-else>{{ i18n.invalidIconType }}</span>
</template>

<script>
import { icons, types } from './iconlist'

// Reexport the icons and types to make them easy to get at
export { icons, types }

// Export our component definition
export default {
    data: () => ({
        i18n: {
            invalidIconType: 'Invalid icon type.'
        }
    }),
    props: {
        spritePath: {
            type: String,
            default: '/concrete/images/icons/bedrock/sprites.svg'
        },
        icon: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: types.fas,
            validator: type => types[type] === type
        },
        color: {
            type: String,
            default: 'currentColor'
        },
        iconTypes: {
            default: () => types
        },
        iconList: {
            default: () => icons
        }
    },
    methods: {
        /**
         * Filters for checking types, these have to be methods because you can't use piped filters with v-if
         */
        isFontAwesome: type => [types.fas, types.far, types.fab].indexOf(type) >= 0,
        isSvg: type => type === types.svg
    },
    mounted() {
        if (window.ccmi18n) {
            for (const key in this.i18n) {
                if (window.ccmi18n[key]) {
                    this.i18n[key] = window.ccmi18n[key]
                }
            }
        }
    }

}
</script>
