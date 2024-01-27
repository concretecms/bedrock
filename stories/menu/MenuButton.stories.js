import MenuButton from '../../assets/cms/components/menu/MenuButton.vue'
import {icons, types} from '../../assets/cms/components/iconlist'
import {ref} from "vue";
import {action} from "@storybook/addon-actions";

const flatTypes = {}
for (let i in icons) {
    for (let ii in icons[i]) {
        flatTypes[`${i}.${ii}`] = icons[i][ii]
    }
}

export default {
    component: MenuButton,
    title: "Menu",
    argTypes: {
        icon: {
            description: "The icon to use, pulls from `iconlist.js`",
            options: flatTypes,
            control: 'select',
        },
        iconType: {
            description: "The type of icon to use, pulls from `iconlist.js`",
            options: types,
            control: 'select'
        },
    }
}

export const menuButtonBasicUsage = {
    args: {
        active: true
    },
    render: (args) => ({
        components: {MenuButton, ...MenuButton.components},
        setup: () => ({
            args,
            active: ref(args.active),
            toggle: action('toggle'),
            click: (v) => action(v.target.innerText)(v)
        }),
        template: `
            <MenuButton v-bind="args" @click='toggle(active = !active)' :active='active'>
                <ContextMenu :show="active">
                    <MenuItem @click='click' icon='${icons.fas.angleDoubleUp}' :disabled=true>Move To Top</MenuItem>
                    <MenuItem @click='click' icon='${icons.fas.angleUp}'>Move Up</MenuItem>
                    <MenuItem @click='click' icon='${icons.fas.angleDown}'>Move Down</MenuItem>
                    <MenuItem @click='click' icon='${icons.fas.angleDoubleDown}'>Move To Bottom</MenuItem>
                    <MenuItem @click='click' icon='${icons.fas.copy}'>Duplicate</MenuItem>
                    <MenuDivider />
                    <MenuItem @click='click' icon='${icons.fas.trash}'>Delete</MenuItem>
                </ContextMenu>
            </MenuButton>
        `,
    })
}