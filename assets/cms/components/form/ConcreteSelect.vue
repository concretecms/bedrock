<template>
    <select :name="name" :multiple="multiple" v-model="selectedValue" @change="$emit('change', selectedValue)">
        <template v-if="hasOptGroups">
            <optgroup v-for="(optgroupOptions, optgroupLabel) in options" :label="optgroupLabel">
                <option v-for="(label, value) in optgroupOptions" :value="value">
                    {{label}}
                </option>
            </optgroup>
        </template>
        <template v-else>
            <option v-for="(label, value) in options" :value="value" :key="value">
                {{label}}
            </option>
        </template>
    </select>
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect */
export default {
    data() {
        return {
            selectedValue: this.value
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        value: {
            required: false
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false
        },
        options: {
            type: Object,
            required: true
        }
    },
    emits: ['change'],
    watch: {

    },
    mounted() {
        var options = {}
        options.maxOptions = null
        if (this.multiple) {
            options.plugins = {
                remove_button: {

                }
            }
        }
        this.$nextTick(() => {
            new TomSelect(this.$el, options)
        })
    },
    computed: {
        hasOptGroups: function() {
            if (this.options && Object.keys(this.options).length > 0) {
                if (typeof (this.options[Object.keys(this.options)[0]]) === 'object') {
                    return true
                }
            }
            return false
        }
    },
    methods: {
    }
}
</script>
