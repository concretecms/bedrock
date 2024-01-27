<template>
    <section class="row w-100 align-items-center">
        <div class="col-md-3 text-center" v-if="showSidebar">
            <span class="d-inline-block" style="max-width: 100px;" v-html="item.icon.element" v-if="item.icon"></span>
        </div>
        <div :class="{'col-md-9': showSidebar, 'col-md-12': !showSidebar}">
            <h5>{{ item.title }}</h5>
            <div class="text-muted">{{ item.description }}</div>
            <div class="ccm-help-media">
                <component :key="action.component" v-for="action in item.actions" :is="action.component"
                           v-bind="action.componentProps"
                ></component>
            </div>
        </div>
    </section>
</template>

<script>
import ConcreteAnnouncementVideoAction from '../Action/VideoAction.vue'
import ConcreteAnnouncementGuideAction from '../Action/GuideAction.vue'
import ConcreteAnnouncementExternalLinkAction from '../Action/ExternalLinkAction.vue'

export default {
    components: {
        ConcreteAnnouncementVideoAction,
        ConcreteAnnouncementGuideAction,
        ConcreteAnnouncementExternalLinkAction
    },
    props: {
        indentIfIconEmpty: {
            type: Boolean,
            required: false,
            default: true
        },
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        showSidebar() {
            return this.item.icon || this.indentIfIconEmpty
        }
    }
}
</script>
