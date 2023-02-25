<template>
    <div class="modal-content">
        <concrete-welcome-header title="Take a few minutes to learn the basics"></concrete-welcome-header>
        <div class="modal-body">
            <transition appear name="concrete-fade" mode="out-in">
                <div key="loading" v-if="!Array.isArray(itemsToDisplay)">
                    <div class="placeholder-wave">
                        <section>
                            <span class="placeholder col-4 bg-black"></span>
                            <span class="placeholder col-10 bg-secondary"></span>
                            <span class="placeholder col-3 bg-primary"></span>
                        </section>
                        <section class="mt-4">
                            <span class="placeholder col-4 bg-black"></span>
                            <span class="placeholder col-10 bg-secondary"></span>
                            <span class="placeholder col-3 bg-primary"></span>
                        </section>
                        <section class="mt-4">
                            <span class="placeholder col-4 bg-black"></span>
                            <span class="placeholder col-10 bg-secondary"></span>
                            <span class="placeholder col-3 bg-primary"></span>
                        </section>
                    </div>
                </div>
                <div v-else key="items">
                    <section :class="{'mt-4': i > 0}" v-for="(item, i) in itemsToDisplay">
                        <h5>{{ item.title }}</h5>
                        <div class="text-muted">{{ item.description }}</div>
                        <div class="ccm-help-media">
                            <component :key="action.component" v-for="action in item.actions" :is="action.component"
                                       v-bind="action.componentProps"
                            ></component>
                        </div>
                    </section>
                </div>
            </transition>
        </div>
        <div class="modal-footer d-flex">
            <button class="btn btn-primary ms-auto" @click="markSlideAsViewed">Got It!</button>
        </div>
    </div>
</template>

<script>
import ConcreteWelcomeHeader from '../Header'
import ConcreteWelcomeActionVideo from './Action/Video'
import ConcreteWelcomeActionGuide from './Action/Guide'
import ConcreteWelcomeActionExternalLink from './Action/ExternalLink'

export default {
    components: {
        ConcreteWelcomeHeader,
        ConcreteWelcomeActionVideo,
        ConcreteWelcomeActionGuide,
        ConcreteWelcomeActionExternalLink
    },
    props: {
        items: {
            type: Array,
            required: false,
        },
        itemAccessToken: {
            type: String,
            required: true
        }
    },
    data: () => ({
        itemsToDisplay: null
    }),
    methods: {
        markSlideAsViewed() {
            this.$emit('mark-slide-as-viewed', 'introduction')
        }
    },
    mounted() {
        var my = this
        if (my.items) {
            this.itemsToDisplay = my.items
        } else {
            new ConcreteAjaxRequest({
                url: `${CCM_DISPATCHER_FILENAME}/ccm/system/dialogs/help/get_items`,
                data: {
                    ccm_token: my.itemAccessToken
                },
                success: r => {
                    my.itemsToDisplay = r
                }
            })
        }
    }
}
</script>