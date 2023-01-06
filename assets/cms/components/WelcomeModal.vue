<template>
    <div class="ccm-ui">
        <div class="modal fade" data-bs-backdrop="static" role="dialog" tabindex="-1" id="concrete-welcome-modal">
            <div class="modal-dialog modal-dialog-centered">
                <component
                    :is="slideComponent"
                    v-bind="slideComponentProps"
                    @advance-slide="advanceSlide"
                    @mark-slide-as-viewed="markSlideAsViewed"
                ></component>
            </div>
        </div>
    </div>
</template>
<script>
import ConcreteWelcomeContentHelp from './WelcomeModal/Content/Help'
import ConcreteWelcomeContentSiteInformation from './WelcomeModal/Content/SiteInformation'

export default {
    components: {
        ConcreteWelcomeContentHelp,
        ConcreteWelcomeContentSiteInformation
    },
    props: {
        modal: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        currentSlide: 0
    }),
    computed: {
        slideComponent: function() {
            return this.modal.slides[this.currentSlide].component
        },
        slideComponentProps: function() {
            return this.modal.slides[this.currentSlide].componentProps
        }
    },

    methods: {
        markSlideAsViewed(handle, skipNotifyBackend) {
            var my = this
            if (!skipNotifyBackend) {
                new ConcreteAjaxRequest({
                    url: CCM_DISPATCHER_FILENAME + '/ccm/system/welcome/mark_as_viewed/' + handle,
                    data: {
                        ccm_token: CCM_SECURITY_TOKEN
                    },
                    success: function (r) {
                        my.advanceSlide()
                    }
                })
            } else {
                my.advanceSlide()
            }
        },
        advanceSlide() {
            if ((this.currentSlide + 1) < this.modal.slides.length) {
                this.currentSlide++
            } else {
                var modal = this.getModal()
                modal.hide()
            }
        },
        getModal() {
            const welcomeModal = document.getElementById('concrete-welcome-modal');
            return bootstrap.Modal.getOrCreateInstance(welcomeModal);
        }
    },
    mounted() {
        var modal = this.getModal()
        if (modal) {
            modal.show();
        }
    }
}
</script>
