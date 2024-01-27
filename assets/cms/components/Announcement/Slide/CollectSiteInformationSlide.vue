<template>
    <div class="modal-content">
        <form method="post" @submit="submitForm">
            <announcement-header title="Tell us a little about your site"></announcement-header>
            <div class="modal-body">
                <div class="offset-lg-3 col-lg-9">
                    <span v-html="survey"></span>
                </div>
                <div class="small">
                    <p>This information will be used to improve your experience. It will never be shared outside of the team building Concrete CMS.</p>
                    <div><a href="#" target="_blank">Privacy Policy</a></div>
                </div>
            </div>
            <div class="modal-footer d-flex">
                <button class="btn btn-secondary" type="button" @click="skip">Skip</button>
                <button class="btn btn-primary ms-auto" type="submit">Send</button>
            </div>
        </form>
    </div>
</template>

<script>
/* eslint-disable no-new */
import AnnouncementHeader from '../Header/Header.vue'
export default {
    components: {
        AnnouncementHeader
    },
    props: {
        survey: {
            type: String,
            required: true
        }
    },
    emits: ['mark-announcement-as-viewed', 'advance-broadcast'],
    methods: {
        skip() {
            this.$emit('mark-announcement-as-viewed')
            this.$emit('advance-broadcast')
        },
        submitForm(e) {
            var my = this
            e.preventDefault()
            var data = $(this.$el).find('form').serializeArray()
            data.push({ name: 'ccm_token', value: CCM_SECURITY_TOKEN })
            new ConcreteAjaxRequest({
                url: CCM_DISPATCHER_FILENAME + '/ccm/system/announcement/site_information/submit/',
                data: data,
                success: function (r) {
                    // No need to emit the mark-announcement-as-viewed event because this is already handled
                    // by the backend submit method above.
                    my.$emit('advance-broadcast')
                }
            })
        }
    },
    mounted() {
    }
}
</script>
