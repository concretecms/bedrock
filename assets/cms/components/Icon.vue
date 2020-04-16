<template functional>
    <i v-if='$options.methods.isFontAwesome(props.type)' class="icon"
        :class="[{
            fas: props.type === props.iconTypes.fas,
            far: props.type === props.iconTypes.far,
            fab: props.type === props.iconTypes.fab,
        }, props.icon.indexOf('fa-') === 0 ? props.icon : `fa-${props.icon}`]"
        :style="{ color: props.color }"
    />
    <svg v-else-if='$options.methods.isSvg(props.type)' viewport='0 0 20 20' width='20px' height='20px'>
        <use :xlink:href='`${$options.spritePath || "/assets/icons/sprites.svg"}#icon-${props.icon}`' :style='`fill: ${props.color}`'></use>
    </svg>
    <span v-else>Invalid icon type.</span>
</template>

<script>
import FontawesomeIcons from './fontawesome-iconlist'

// Export constants for types
const getTypes = () => {
    const types = {
        svg: 'svg',
        fontawesomeSolid: 'fas',
        fontawesomeRegular: 'far',
        fontawesomeBrand: 'fab'
    }
    types.fas = types.fontawesomeSolid
    types.far = types.fontawesomeRegular
    types.fab = types.fontawesomeBrand
    return types
}
export const Types = getTypes()

// Export constants for available icons
const svgIcons = {
    menuLauncher: 'menu-launcher',
    search: 'search',
    dialogHelp: 'dialog-help',
    cog: 'cog',
    dashboard: 'dashboard',
    plus: 'plus',
    info: 'info',
    bookmarkPage: 'bookmark-page',
    pencil: 'pencil',
    sitemap: 'sitemap',
    arrowLeft: 'arrow-left',
    help: 'help',
    dialogClose: 'dialog-close'
}

const camelCase = key => key.replace(/-([a-z0-9])/g, (match, group) => group.toUpperCase())
const arrayToIconObject = (object, item) => ({ ...object, [camelCase(item)]: item })
const buildIconList = () => {
    const icons = {}
    icons[Types.svg] = svgIcons
    icons[Types.fas] = FontawesomeIcons.fas.reduce(arrayToIconObject, {})
    icons[Types.far] = FontawesomeIcons.far.reduce(arrayToIconObject, {})
    icons[Types.fab] = FontawesomeIcons.fab.reduce(arrayToIconObject, {})

    return icons
}

export const Icons = buildIconList()

// Export our component definition
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: Types.fas,
            validator: type => Types[type] === type
        },
        color: {
            type: String,
            default: 'inherit'
        },
        iconTypes: {
            default: () => Types
        },
        iconList: {
            default: () => Icons
        }
    },
    methods: {
        /**
         * Filters for checking types, these have to be methods because you can't use piped filters with v-if
         */
        isFontAwesome: type => [Types.fas, Types.far, Types.fab].indexOf(type) >= 0,
        isSvg: type => type === Types.svg
    }
}
</script>
