import Icon, { Icons, Types } from '../../assets/cms/components/Icon.vue'
import Vue from 'vue'

Vue.component('Icon', Icon)

export default {
    title: 'Basics/Icon',
    component: Icon
}

export const basicUsage = () => ({
    data: () => ({
        svg: Icons.svg,
        fas: Icons.fas,
        far: Icons.far,
        fab: Icons.fab,
        types: Object.values(Types).filter(type => type !== 'svg')
    }),
    template: `
    <div class='ccm-ui'>
        <fieldset >
            <legend>SVGs</legend>
            <div v-for='icon in svg' style='display:inline-block;width:50px;height:50px;' :title='icon'>
                <Icon :icon='icon' type="${Types.svg}" color="blue" />
            </div>
        </fieldset>
        <fieldset>
            <legend>Fontawesome</legend>
            <div class='d-flex'>
                <div style='flex-grow: 1; flex-basis: 0;'>
                    <p>With fontawesome solid icons</p>
                    <div v-for='icon of fas' style='display:inline-block;width:50px;height:50px;' :title='icon'>
                        <Icon :icon='icon' type="${Types.fas}" color="#7F7F7F" />
                    </div>
                </div>

                <div style='flex-grow: 1; flex-basis: 0;'>
                    <p>With fontawesome regular icons</p>
                    <div v-for='icon of far' style='display:inline-block;width:50px;height:50px;' :title='icon'>
                        <Icon :icon='icon' type="${Types.far}" color="red" />
                    </div>
                </div>

                <div style='flex-grow: 1; flex-basis: 0;'>
                    <p>With fontawesome brand icons</p>
                    <div v-for='icon of fab' style='display:inline-block;width:50px;height:50px;' :title='icon'>
                        <Icon :icon='icon' type="${Types.fab}" color="#41b883" />
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    `
})
