<template>
    <concrete-ajax-select
        :name="inputName"
        :access-token="accessToken"
        :data-source-url="dataSourceUrl"
        :selected-options-url="selectedOptionsUrl"
        :value="pageId"
        @change="updateSelected"
        :form-data="formData"
    >
    </concrete-ajax-select>
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect */
import ConcreteAjaxSelect from './ConcreteAjaxSelect.vue'
export default {
    components: { ConcreteAjaxSelect },
    prop: ['pageId'],
    model: {
        prop: 'pageId',
        event: 'change'
    },
    props: {
        accessToken: {
            type: String,
            required: true
        },
        inputName: {
            type: String
        },
        pageId: {
            type: [Number, String, Array],
            required: false
        }
    },
    emits: ['change'],
    computed: {
        formData() {
            return {
                pageId: this.pageId
            }
        }
    },
    data() {
        return {
            dataSourceUrl: CCM_DISPATCHER_FILENAME + '/ccm/system/page/autocomplete',
            selectedOptionsUrl: CCM_DISPATCHER_FILENAME + '/ccm/system/page/autocomplete/get_selected',
            selectedPageId: null
        }
    },
    watch: {
        pageId: {
            immediate: true,
            handler: function(pageId) {
                this.selectedPageId = pageId
            }
        }
    },
    methods: {
        updateSelected(value) {
            this.selectedPageId = value
            this.$emit('change', this.selectedPageId)
        }
    }
}
</script>
