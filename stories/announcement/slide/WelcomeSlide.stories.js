import WelcomeSlide from '../../../assets/cms/components/Announcement/Slide/WelcomeSlide.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: WelcomeSlide,
    title: 'Announcement/Slide/WelcomeSlide',
    decorators: [
        () => ({ template: '<div class=\'bg-dark text-light p-3\'><story/></div>' })
    ]
}

export const basicUsage = {
    args: {
        items: [
            { title: 'Foo', description: 'Example Announcement Item', actions: [] }
        ],
        itemAccessToken: '',
        onMarkAnnouncementAsViewed: action('mark-announcement-as-viewed'),
        onAdvanceBroadcast: action('advance-broadcast')
    }
}
