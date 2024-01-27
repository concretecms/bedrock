import Item from "../../../assets/cms/components/Announcement/Item/Item.vue";
import 'magnific-popup'
import 'magnific-popup/dist/magnific-popup.css'

export default {
    component: Item,
    title: 'Announcement/Item/Item',
}

export const basicUsage = {
    args: {
        item: {
            icon: 'foo',
            title: 'Foo',
            description: 'This is an example item',
            actions: [
                {
                    component: 'ConcreteAnnouncementVideoAction',
                    componentProps: {
                        url: 'javascript:void',
                    }
                },
                {
                    component: 'ConcreteAnnouncementGuideAction',
                    componentProps: {
                        guide: 'foo',
                    }
                },
                {
                    component: 'ConcreteAnnouncementExternalLinkAction',
                    componentProps: {
                        url: 'javascript:void',
                    }
                }
            ]
        },
    },
}