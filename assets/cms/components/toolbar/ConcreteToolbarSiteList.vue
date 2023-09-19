<template>
    <input />
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect */
export default {
    data() {
        return {

        }
    },
    props: {
        token: {
            type: String,
            required: true
        },
        uri: {
            type: String,
            required: true
        },
        selectedSite: {
            type: [String, Number],
            required: false
        },
        sites: {
            type: Array,
            required: true
        }
    },
    watch: {
    },
    computed: {
        options: function() {
            const options = []
            this.sites.forEach((site) => {
                options.push({ value: site.id, text: site.name })
            })
            return options
        }
    },
    mounted() {
        var config = {}
        config.maxOptions = null
        config.options = this.options
        config.maxItems = 1
        config.items = [this.selectedSite]
        this.$nextTick(() => {
            const select = new TomSelect(this.$el, config)
            select.on('change', (option) => {
                const url = CCM_DISPATCHER_FILENAME + '/ccm/site/redirect/' + option +
                    '?rUri=' + encodeURIComponent(this.uri) +
                    '&ccm_token=' + this.token
                window.location.href = url
            })
        })
    },
    methods: {
    }
}
</script>
