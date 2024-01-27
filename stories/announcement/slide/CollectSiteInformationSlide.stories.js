import CollectSiteInformationSlide
    from '../../../assets/cms/components/Announcement/Slide/CollectSiteInformationSlide.vue'
import { action } from '@storybook/addon-actions'

export default {
    component: CollectSiteInformationSlide,
    title: 'Announcement/Slide/CollectSiteInformationSlide',
    decorators: [
        () => ({ template: '<div class=\'bg-dark text-light p-3\'><story/></div>' })
    ]
}

export const basicUsage = {
    args: {
        survey: '<input name=example value=on type="radio"> ON<br><input name=example value=off type="radio"> OFF',
        onMarkAnnouncementAsViewed: action('mark-announcement-as-viewed'),
        onAdvanceBroadcast: action('advance-broadcast')
    }
}