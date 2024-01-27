import Modal from '../../../assets/cms/components/Announcement/Modal/Modal.vue'
import {action} from "@storybook/addon-actions";

export default {
    component: Modal,
    title: 'Announcement/Modal/Modal',
}

export const basicUsage = {
    args: {
        handle: 'foo',
        totalSlides: 4,
        slides: [
            {
                component: 'ConcreteAnnouncementCollectSiteInformationSlide',
                componentProps: {
                    survey: '<input name=example value=on type="radio"> ON<br><input name=example value=off type="radio"> OFF',
                    onMarkAnnouncementAsViewed: action('mark-announcement-as-viewed'),
                    onAdvanceBroadcast: action('advance-broadcast'),
                }
            },
            {
                component: 'ConcreteAnnouncementCollectSiteInformationSlide',
                componentProps: {
                    survey: '<input name=example value=on type="radio"> ON<br><input name=example value=off type="radio"> OFF',
                    onMarkAnnouncementAsViewed: action('mark-announcement-as-viewed'),
                    onAdvanceBroadcast: action('advance-broadcast'),
                }
            },
            {
                component: 'ConcreteAnnouncementCollectSiteInformationSlide',
                componentProps: {
                    survey: '<input name=example value=on type="radio"> ON<br><input name=example value=off type="radio"> OFF',
                    onMarkAnnouncementAsViewed: action('mark-announcement-as-viewed'),
                    onAdvanceBroadcast: action('advance-broadcast'),
                }
            },
            {
                component: 'ConcreteAnnouncementCollectSiteInformationSlide',
                componentProps: {
                    survey: '<input name=example value=on type="radio"> ON<br><input name=example value=off type="radio"> OFF',
                    onMarkAnnouncementAsViewed: action('mark-announcement-as-viewed'),
                    onAdvanceBroadcast: action('advance-broadcast'),
                }
            }
        ],
    },
}