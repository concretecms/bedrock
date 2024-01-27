import Modal from "../../assets/cms/components/Help/Modal.vue";
import VideoAction from "../../assets/cms/components/Announcement/Action/VideoAction.vue";
import GuideAction from "../../assets/cms/components/Announcement/Action/GuideAction.vue";
import ExternalLinkAction from "../../assets/cms/components/Announcement/Action/ExternalLinkAction.vue";
import 'magnific-popup'
import 'magnific-popup/dist/magnific-popup.css'
import '../../assets/cms/js/help/help'

export default {
    title: 'Help/Modal',
    component: Modal,
    description: "foo",
    decorators: [
        () => ({
            template: `
                <div class="modal show" style="display:block;z-index:1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body"><story /></div>
                        </div>
                    </div>
                </div>`,
        })
    ]
}

export const defaultUsage = {
    args: {
        items: [
            {title: 'Video', description: 'This is a video that one could watch', actions: [{component: VideoAction, componentProps: {url: 'https://example.com/'}}]},
            {title: 'Guide', description: 'This is a guide to view', actions: [{component: GuideAction, componentProps: {guide: 'foo'}}]},
            {title: 'External Link', description: 'Follow this external link', actions: [{component: ExternalLinkAction, componentProps: {url: 'https://example.com/'}}]},
        ]
    }
}

export const withSlot = {
    render: (args) => ({
        components: {Modal},
        setup: () => ({
            args
        }),
        template: `<Modal v-bind="args">
            <template v-slot:main><span>Main content</span></template>
            <template v-slot:sidebar><span>Sidebar</span></template>
        </Modal>`
    })
}