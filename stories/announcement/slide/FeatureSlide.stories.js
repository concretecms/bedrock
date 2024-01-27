import FeatureSlide from '../../../assets/cms/components/Announcement/Slide/FeatureSlide.vue'
import { action } from '@storybook/addon-actions'

window.CCM_SECURITY_TOKEN = ''
window.CCM_DISPATCHER_FILENAME = ''

window.ConcreteAjaxRequest = action('ConcreteAjaxRequest')

export default {
    component: FeatureSlide,
    title: 'Announcement/Slide/FeatureSlide',
    decorators: [
        () => ({ template: '<div class=\'bg-dark text-light p-3\'><story/></div>' })
    ]
}

export const basicUsage = {
    args: {
        title: 'Foo',
        button: {},
        items: [
            { title: 'Foo', description: 'Example Announcement Item', actions: [] }
        ],
        currentSlideInGroup: 1,
        totalSlidesInGroup: 5,

        onMarkAnnouncementAsViewed: action('mark-announcement-as-viewed'),
        onAdvanceBroadcast: action('advance-broadcast')
    }
}

export const lastSlide = {
    args: {
        title: 'Foo',
        button: {},
        items: [
            { title: 'Foo', description: 'Example Announcement Item', actions: [] }
        ],
        currentSlideInGroup: 5,
        totalSlidesInGroup: 5,

        onMarkAnnouncementAsViewed: action('mark-announcement-as-viewed'),
        onAdvanceBroadcast: action('advance-broadcast')
    }
}
