import Header from '../../../assets/cms/components/file-manager/Chooser/Header.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: Header,
    title: 'FileManager/Chooser/Header'
}

export const basicUsage = {
    args: {
        title: 'Foo',
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
        onBreadcrumbItemClick: action('breadcrumbItemClick')
    }
}
