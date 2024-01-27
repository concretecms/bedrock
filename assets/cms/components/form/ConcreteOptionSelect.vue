<template>
    <concrete-ajax-select
        :name="inputName"
        :access-token="accessToken"
        :data-source-url="dataSourceUrl"
        :selected-options-url="selectedOptionsUrl"
        :value="value"
        @change="updateSelected"
        :form-data="formData"
        :max-items="maxItems"
        :remove-button="maxItems != 1"
        :allow-create="true"
    >
    </concrete-ajax-select>
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect */
import ConcreteAjaxSelect from './ConcreteAjaxSelect.vue'
export default {
    components: { ConcreteAjaxSelect },
    prop: ['value'],
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        dataSourceUrl: {
            type: String,
            required: true
        },
        selectedOptionsUrl: {
            type: String,
            required: true
        },
        allowMultipleValues: {
            type: Boolean,
            default: false
        },
        attributeKeyId: {
            type: [String, Number],
            required: true
        },
        accessToken: {
            type: String,
            required: true
        },
        inputName: {
            type: String
        },
        value: {
            type: Array,
            required: false
        }
    },
    emits: ['change'],
    computed: {
        maxItems() {
            if (this.allowMultipleValues) {
                return null
            } else {
                return 1
            }
        },
        formData() {
            return {
                akID: this.attributeKeyId,
                optionId: this.value
            }
        }
    },
    data() {
        return {
            selectedValue: null
        }
    },
    watch: {
        entryId: {
            immediate: true,
            handler: function(value) {
                this.selectedValue = value
            }
        }
    },
    methods: {
        updateSelected(value) {
            this.selectedValue = value
            this.$emit('change', this.selectedValue)
        }
    }
}
</script>
