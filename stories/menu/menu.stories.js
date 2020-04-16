import MenuButton from '../../assets/cms/components/menu/MenuButton.vue'
import MenuItem from '../../assets/cms/components/menu/MenuItem.vue'
import MenuDivider from '../../assets/cms/components/menu/MenuDivider.vue'
import ContextMenu from '../../assets/cms/components/menu/ContextMenu.vue'
import { Icons, Types } from '../../assets/cms/components/Icon.vue'
import Vue from 'vue'

// Add our component to the global vue instance
Vue.component('MenuButton', MenuButton)
Vue.component('MenuItem', MenuItem)
Vue.component('MenuDivider', MenuDivider)
Vue.component('ContextMenu', ContextMenu)

// Set up the values for all stories in this file
export default {
    title: 'CMS/Menu',
    component: MenuButton
}

// Simplest usage with default sizing from the core
export const basicUsage = () => ({
    data() {
        return {
            active: false,
            lastClicked: 'nothing yet'
        }
    },
    methods: {
        itemClick(e) {
            this.lastClicked = e.target.innerText
            this.active = false
        },
        hide(e) {
            this.lastClicked = 'Outside'
            this.active = false
        }
    },
    template: `
    <div class='ccm-ui' style='height: 350px'>
        <p>Last clicked: <em>{{lastClicked}}</em></p>
        <MenuButton :buttonType='far' @click='active=!active' :active='!!active' icon='fa-ellipsis-h'>
            <ContextMenu :show='active'>
                <MenuItem @click='itemClick' icon='fa-angle-double-up' :disabled=true>Move To Top</MenuItem>
                <MenuItem @click='itemClick' icon='fa-angle-up'>Move Up</MenuItem>
                <MenuItem @click='itemClick' icon='fa-angle-down'>Move Down</MenuItem>
                <MenuItem @click='itemClick' icon='fa-angle-double-down'>Move To Bottom</MenuItem>
                <MenuItem @click='itemClick' icon='fa-copy'>Duplicate</MenuItem>
                <MenuDivider />
                <MenuItem @click='itemClick' icon='fa-trash'>Delete</MenuItem>
            </ContextMenu>
        </MenuButton>
    </div>
    `
})

export const contextMenu = () => ({
    component: ContextMenu,
    data: () => ({
        action: 'nothing yet'
    }),
    methods: {
        itemClick(e) {
            this.action = e.target.innerText
        }
    },
    template: `
    <div class='ccm-ui'>
        <p>Last clicked: <em>{{action}}</em></p>
        <div class='dropdown'>
            <ContextMenu show=1>
                <MenuItem @click='itemClick' icon='${Icons.svg.moveToTop}' iconType='${Types.svg}' :disabled=true>Move To Top</MenuItem>
                <MenuItem @click='itemClick' icon='${Icons.svg.moveUp}' iconType='${Types.svg}'>Move Up</MenuItem>
                <MenuItem @click='itemClick' icon='${Icons.svg.moveDown}' iconType='${Types.svg}'>Move Down</MenuItem>
                <MenuItem @click='itemClick' icon='${Icons.svg.moveToBottom}' iconType='${Types.svg}'>Move To Bottom</MenuItem>
                <MenuItem @click='itemClick' icon='${Icons.svg.duplicate}' iconType='${Types.svg}'>Duplicate</MenuItem>
                <MenuDivider />
                <MenuItem @click='itemClick' icon='${Icons.svg.bin}' iconType='${Types.svg}'>Delete</MenuItem>
            </ContextMenu>
        </div>
    </div>`
})

export const defaultBootstrapMenu = () => `
<div class='ccm-ui'>
  <div class="dropdown-menu d-block position-static" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item disabled" disabled href="#">Move To Top</a>
    <a class="dropdown-item" href="#">Move Up</a>
    <a class="dropdown-item" href="#">Move Down</a>
    <a class="dropdown-item" href="#">Move To Bottom</a>
    <a class="dropdown-item" href="#">Duplicate</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Delete</a>
  </div>
</div>
`
