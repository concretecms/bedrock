import ContextMenu from '../../assets/cms/components/menu/ContextMenu.vue'
import MenuItem from '../../assets/cms/components/menu/MenuItem.vue'
import MenuDivider from '../../assets/cms/components/menu/MenuDivider.vue'
import { action } from '@storybook/addon-actions'
import { icons, types } from '../../assets/cms/components/iconlist'

export default {
    component: MenuItem,
    title: 'Menu',
    decorators: [() => ({ template: '<div class="dropdown-menu show"><story/></div>' })]
}

export const itemBasicUsage = {
    args: {
        show: true,
        icon: icons.fas.times,
        iconType: types.fas,
        content: 'Menu item'
    },
    render: (args) => ({
        components: { ContextMenu, MenuItem, MenuDivider },
        setup: () => ({
            args,
            itemClick: (e) => action('click')(e.target.innerText)
        }),
        template: '<MenuItem v-bind="args">{{ args.content }}</MenuItem>'
    })
}
