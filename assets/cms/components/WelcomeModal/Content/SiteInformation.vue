<template>
    <div class="modal-content">
        <form method="post" @submit="send">
            <concrete-welcome-header title="Tell us a little about your site"></concrete-welcome-header>
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
import ConcreteWelcomeHeader from '../Header'
export default {
    components: {
        ConcreteWelcomeHeader
    },
    props: {
        survey: {
            type: String,
            required: true,
        },
    },
    data: () => ({
    }),
    methods: {
        skip() {
            this.$emit('mark-slide-as-viewed', 'site_information')
        },
        send(e) {
            var my = this
            e.preventDefault()
            var data = $(this.$el).find('form').serializeArray()
            data.push({ name: 'ccm_token', value: CCM_SECURITY_TOKEN })
            new ConcreteAjaxRequest({
                url: CCM_DISPATCHER_FILENAME + '/ccm/system/welcome/site_information/submit/',
                data: data,
                success: function (r) {
                    my.$emit('mark-slide-as-viewed', 'site-information', false)
                }
            })
        }
    },
    mounted() {
    }
}
</script>
