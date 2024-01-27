import ContextMenu from '../../assets/cms/components/menu/ContextMenu.vue'
import MenuItem from '../../assets/cms/components/menu/MenuItem.vue'
import MenuDivider from '../../assets/cms/components/menu/MenuDivider.vue'
import { action } from '@storybook/addon-actions'
import { icons } from '../../assets/cms/components/iconlist'

export default {
    component: MenuDivider,
    title: 'Menu',
    decorators: [() => ({ template: '<div class="dropdown-menu show"><story/></div>' })]
}

export const dividerBasicUsage = {
    args: {},
    render: (args) => ({
        components: { ContextMenu, MenuItem, MenuDivider },
        setup: () => ({
            args,
            itemClick: (e) => action('click')(e.target.innerText)
        }),
        template: '<MenuDivider v-bind="args"/>'
    })
}
