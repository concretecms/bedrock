import MenuButton from '../../assets/cms/components/menu/MenuButton'
import { icons } from '../../assets/cms/components/iconlist'

// Set up the values for all stories in this file
export default {
    title: 'CMS/Menu',
    component: MenuButton
}

// Simplest usage with default sizing from the core
export const basicUsage = () => ({
    components: {
        MenuButton,
        ...MenuButton.components
    },
    data() {
        return {
            active: true,
            lastClicked: 'nothing yet'
        }
    },
    methods: {
        itemClick(e) {
            this.lastClicked = e.target.innerText
            this.active = false
        }
    },
    template: `
    <div class='ccm-ui' style='height: 350px'>
        <p>Active: <em>{{active ? 'Yes' : 'No'}}</em></p>
        <p>Last clicked: <em>{{lastClicked}}</em></p>
        <MenuButton @click='active=!active' :active='active'>
            <ContextMenu :show='active'>
                <MenuItem @click='itemClick' icon='${icons.fas.angleDoubleUp}' :disabled=true>Move To Top</MenuItem>
                <MenuItem @click='itemClick' icon='${icons.fas.angleUp}'>Move Up</MenuItem>
                <MenuItem @click='itemClick' icon='${icons.fas.angleDown}'>Move Down</MenuItem>
                <MenuItem @click='itemClick' icon='${icons.fas.angleDoubleDown}'>Move To Bottom</MenuItem>
                <MenuItem @click='itemClick' icon='${icons.fas.copy}'>Duplicate</MenuItem>
                <MenuDivider />
                <MenuItem @click='itemClick' icon='${icons.fas.trash}'>Delete</MenuItem>
            </ContextMenu>
        </MenuButton>
    </div>
    `
})

export const menuByItself = () => ({
    components: {
        ...MenuButton.components
    },
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
            <ContextMenu :show=true>
            <MenuItem @click='itemClick' icon='${icons.fas.angleDoubleUp}' :disabled=true>Move To Top</MenuItem>
            <MenuItem @click='itemClick' icon='${icons.fas.angleUp}'>Move Up</MenuItem>
            <MenuItem @click='itemClick' icon='${icons.fas.angleDown}'>Move Down</MenuItem>
            <MenuItem @click='itemClick' icon='${icons.fas.angleDoubleDown}'>Move To Bottom</MenuItem>
            <MenuItem @click='itemClick' icon='${icons.fas.copy}'>Duplicate</MenuItem>
            <MenuDivider />
            <MenuItem @click='itemClick' icon='${icons.fas.trash}'>Delete</MenuItem>
            </ContextMenu>
        </div>
    </div>`
})

export const concreteAreaMenu = () => `
<div id='ccm-popover-menu-container' class='ccm-ui'>
    <div class="popover bs-popover-top">
        <div class="arrow"></div>
        <div class="popover-inner">
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Add Block</a>
                <a class="dropdown-item" href="#">Add Layout</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Edit Area Design</a>
            </div>
        </div>
    </div>
</div>
`

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
