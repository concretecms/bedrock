import ThumbnailEditor from '../../assets/cms/components/Image/ThumbnailEditor.vue'
import './ThumbnailEditor.scss'
import { action } from '@storybook/addon-actions'

window.ConcreteAjaxRequest = action('ConcreteAjaxRequest')

export default {
    component: ThumbnailEditor,
    title: 'Image/ThumbnailEditor',
    decorators: [
        () => ({ template: '<div style=\'position: relative; margin: 0 auto;width: 500px; height: 500px\'><story/></div>' })
    ]
}

export const basicUsage = {
    args: {
        width: 600,
        height: 400,
        accessToken: '',
        lang: {
            save: 'Save'
        },
        src: '/images/examplejpeg.jpeg',
        uploadUrl: '/upload'
    }
}
