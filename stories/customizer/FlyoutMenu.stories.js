import FlyoutMenu from '../../assets/cms/components/customizer/flyout/FlyoutMenu.vue'

export default {
    component: FlyoutMenu,
    title: 'Customizer/FlyoutMenu'
}

export const basicUsage = {
    render: (args) => ({
        components: { FlyoutMenu },
        template: `
            <FlyoutMenu>
                <template v-slot:icon>Icon</template>
                <template v-slot:content>Content</template>
            </FlyoutMenu>`
    })
}
