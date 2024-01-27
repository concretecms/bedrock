<template>
    <concrete-ajax-select
        :name="inputName"
        :access-token="accessToken"
        :data-source-url="dataSourceUrl"
        :selected-options-url="selectedOptionsUrl"
        :value="entryId"
        @change="updateSelected"
        :form-data="formData"
        :max-items="null"
        :remove-button="true"
    >
    </concrete-ajax-select>
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect */
import ConcreteAjaxSelect from './ConcreteAjaxSelect.vue'
export default {
    components: { ConcreteAjaxSelect },
    prop: ['entryId'],
    model: {
        prop: 'entryId',
        event: 'change'
    },
    props: {
        entity: {
            type: String,
            required: true
        },
        accessToken: {
            type: String,
            required: true
        },
        inputName: {
            type: String
        },
        entryId: {
            type: [Number, String, Array],
            required: false
        }
    },
    emits: ['change'],
    computed: {
        formData() {
            return {
                entity: this.entity,
                entryId: this.entryId
            }
        }
    },
    data() {
        return {
            dataSourceUrl: CCM_DISPATCHER_FILENAME + '/ccm/system/express/entry/autocomplete',
            selectedOptionsUrl: CCM_DISPATCHER_FILENAME + '/ccm/system/express/entry/autocomplete/get_selected',
            selectedEntryId: null
        }
    },
    watch: {
        entryId: {
            immediate: true,
            handler: function(entryId) {
                this.selectedEntryId = entryId
            }
        }
    },
    methods: {
        updateSelected(value) {
            this.selectedEntryId = value
            this.$emit('change', this.selectedEntryId)
        }
    }
}
</script>
