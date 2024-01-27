import Breadcrumb from '../../assets/cms/components/Breadcrumb.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: Breadcrumb,
    title: 'Basics/Breadcrumb'
}

export const basicUsage = {
    args: {
        breadcrumbItems: [
            { name: 'Home', children: [] },
            {
                name: 'About',
                children: [
                    { name: 'About' },
                    { name: 'FAQ' }
                ]
            },
            { name: 'Blog', children: [] }
        ],
        onItemClick: action('itemClick')
    }
}
