import Icon, { icons, types as iconTypes } from '../../assets/cms/components/Icon.vue'

const flatTypes = {}
for (let i in icons) {
    for (let ii in icons[i]) {
        flatTypes[`${i}.${ii}`] = icons[i][ii]
    }
}

export default {
    title: 'Basics/Icon',
    component: Icon,
    tags: ['autodocs'],
    argTypes: {
        icon: {
            options: flatTypes,
            control: 'select',
        },
        type: {
            options: iconTypes,
            control: 'select'
        }
    },
}

export const basicUsage = {
    args: {
        icon: icons.fas.rocket,
        type: iconTypes.fas,
        color: 'coral'
    }
}

export const allIcons = () => ({
    components: {
        Icon
    },
    data: () => ({
        icons,
        types: Object.values(iconTypes).filter(type => type !== 'svg')
    }),
    template: `
    <div class='ccm-ui'>
        <fieldset >
            <legend>SVGs</legend>
            <div class='d-flex'>
                <div v-for='icon in icons.svg' style='display:flex;width:50px;height:50px;align-items:center;justify-content:center;' :title='icon'>
                    <Icon :icon='icon' type="${iconTypes.svg}" color="blue" style='align-self:center; justify-self: center;' />
                </div>
            </div>
        </fieldset>
        <fieldset>
            <legend>Fontawesome</legend>
            <div class='d-flex'>
                <div style='flex-grow: 1; flex-basis: 0;'>
                    <p>With fontawesome solid icons</p>
                    <div v-for='icon of icons.fas' style='display:flex;width:50px;height:50px;align-items:center;justify-content:center;float:left;' :title='icon'>
                        <Icon :icon='icon' type="${iconTypes.fas}" color="#7F7F7F" />
                    </div>
                </div>

                <div style='flex-grow: 1; flex-basis: 0;'>
                    <p>With fontawesome regular icons</p>
                    <div v-for='icon of icons.far' style='display:flex;width:50px;height:50px;align-items:center;justify-content:center;float:left;' :title='icon'>
                        <Icon :title="icon" :icon='icon' type="${iconTypes.far}" color="red" />
                    </div>
                </div>

                <div style='flex-grow: 1; flex-basis: 0;'>
                    <p>With fontawesome brand icons</p>
                    <div v-for='icon of icons.fab' style='display:flex;width:50px;height:50px;align-items:center;justify-content:center;float:left;' :title='icon'>
                        <Icon :icon='icon' type="${iconTypes.fab}" color="#41b883" />
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    `
})
