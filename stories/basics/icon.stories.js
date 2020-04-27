import Icon, { icons, types as iconTypes } from '../../assets/cms/components/Icon.vue'

export default {
    title: 'Basics/Icon',
    component: Icon
}

export const basicUsage = () => ({
    components: {
        Icon
    },
    data: () => ({
        svg: icons.svg,
        fas: icons.fas,
        far: icons.far,
        fab: icons.fab,
        types: Object.values(iconTypes).filter(type => type !== 'svg')
    }),
    template: `
    <div class='ccm-ui'>
        <fieldset >
            <legend>SVGs</legend>
            <div class='d-flex'>
                <div v-for='icon in svg' style='display:flex;width:50px;height:50px;align-items:center;justify-content:center;outline:1px #f0f0f0 solid;' :title='icon'>
                    <Icon :icon='icon' type="${iconTypes.svg}" color="blue" style='align-self:center; justify-self: center;' />
                </div>
            </div>
        </fieldset>
        <fieldset>
            <legend>Fontawesome</legend>
            <div class='d-flex'>
                <div style='flex-grow: 1; flex-basis: 0;'>
                    <p>With fontawesome solid icons</p>
                    <div v-for='icon of fas' style='display:flex;width:50px;height:50px;align-items:center;justify-content:center;float:left;outline:1px #f0f0f0 solid;' :title='icon'>
                        <Icon :icon='icon' type="${iconTypes.fas}" color="#7F7F7F" />
                    </div>
                </div>

                <div style='flex-grow: 1; flex-basis: 0;'>
                    <p>With fontawesome regular icons</p>
                    <div v-for='icon of far' style='display:flex;width:50px;height:50px;align-items:center;justify-content:center;float:left;outline:1px #f0f0f0 solid;' :title='icon'>
                        <Icon :icon='icon' type="${iconTypes.far}" color="red" />
                    </div>
                </div>

                <div style='flex-grow: 1; flex-basis: 0;'>
                    <p>With fontawesome brand icons</p>
                    <div v-for='icon of fab' style='display:flex;width:50px;height:50px;align-items:center;justify-content:center;float:left;outline:1px #f0f0f0 solid;' :title='icon'>
                        <Icon :icon='icon' type="${iconTypes.fab}" color="#41b883" />
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    `
})
