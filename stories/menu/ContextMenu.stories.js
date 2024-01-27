import ContextMenu from '../../assets/cms/components/menu/ContextMenu.vue'
import MenuItem from '../../assets/cms/components/menu/MenuItem.vue'
import MenuDivider from '../../assets/cms/components/menu/MenuDivider.vue'
import { icons } from '../../assets/cms/components/iconlist'
import { action } from '@storybook/addon-actions'

export default {
    component: ContextMenu,
    title: 'Menu'
}

export const contextMenuBasicUsage = {
    args: {
        show: true
    },
    render: (args) => ({
        components: { ContextMenu, MenuItem, MenuDivider },
        setup: () => ({
            args,
            itemClick: (e) => action('click')(e.target.innerText)
        }),
        template: `
            <ContextMenu v-bind="args">
                <MenuItem @click='itemClick' icon='${icons.fas.angleDoubleUp}' :disabled=true>Move To Top</MenuItem>
                <MenuItem @click='itemClick' icon='${icons.fas.angleUp}'>Move Up</MenuItem>
                <MenuItem @click='itemClick' icon='${icons.fas.angleDown}'>Move Down</MenuItem>
                <MenuItem @click='itemClick' icon='${icons.fas.angleDoubleDown}'>Move To Bottom</MenuItem>
                <MenuItem @click='itemClick' icon='${icons.fas.copy}'>Duplicate</MenuItem>
                <MenuDivider />
                <MenuItem @click='itemClick' icon='${icons.fas.trash}'>Delete</MenuItem>
            </ContextMenu>
        `
    })
}
