<template>
    <div class="modal-dialog modal-dialog-centered">
        <component
            :key="slideComponentKey"
            :is="slideComponent"
            v-bind="slideComponentProps"
            @advance-broadcast="advanceSlides"
            @mark-announcement-as-viewed="markAnnouncementAsViewed"
        ></component>
    </div>
</template>
<script>
/* eslint-disable no-new */
import ConcreteAnnouncementFeatureSlide from '../Slide/FeatureSlide.vue'
import ConcreteAnnouncementWelcomeSlide from '../Slide/WelcomeSlide.vue'
import ConcreteAnnouncementCollectSiteInformationSlide from '../Slide/CollectSiteInformationSlide.vue'

export default {
    components: {
        ConcreteAnnouncementFeatureSlide,
        ConcreteAnnouncementWelcomeSlide,
        ConcreteAnnouncementCollectSiteInformationSlide
    },
    props: {
        handle: {
            type: String,
            required: true
        },
        totalSlides: {
            type: Number,
            required: true,
            default: 1
        },
        slides: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        currentSlide: 0
    }),
    computed: {
        slideComponentKey: function() {
            return 'slide' + this.currentSlide
        },
        slideComponent: function() {
            return this.slides[this.currentSlide].component
        },
        slideComponentProps: function() {
            const props = this.slides[this.currentSlide].componentProps
            props.currentSlideInGroup = this.currentSlide
            props.totalSlidesInGroup = this.totalSlides
            return props
        }
    },

    methods: {
        markAnnouncementAsViewed() {
            var my = this
            new ConcreteAjaxRequest({
                url: CCM_DISPATCHER_FILENAME + '/ccm/system/announcement/mark_as_viewed/' + my.handle,
                data: {
                    ccm_token: CCM_SECURITY_TOKEN
                }
            })
        },
        advanceSlides() {
            if ((this.currentSlide + 1) < this.slides.length) {
                this.currentSlide++
            } else {
                // emit it up to the grandparent "Broadcast" component
                this.$emit('advance-broadcast')
            }
        }
    }
}
</script>
