<template>
    <input :name="name" v-model="selectedValue" />
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect, WebFont */
export default {
    data() {
        return {
            selectedValue: this.value
        }
    },
    props: {
        value: {
        },
        name: {
            type: String,
            required: true
        },
        selectedLocale: {
            required: false
        },
        locales: {
            type: Array,
            required: true
        }
    },
    watch: {
    },
    mounted() {
        var config = {}
        config.maxOptions = null
        config.maxItems = 1
        config.items = [this.selectedLocale]
        config.options = this.locales
        config.valueField = 'id'
        config.render = {
            option: function (data, escape) {
                return `<div><img class="me-2" src="${data.flag}">${data.language.text}</div>`
            },
            item: function (item, escape) {
                return `<div><img class="me-2" src="${item.flag}">${item.language.text}</div>`
            }
        }
        this.$nextTick(() => {
            const select = new TomSelect(this.$el, config)
            select.on('change', (option) => {
                this.selectedValue = option
            })
            select.sync()
        })
    },
    methods: {

    }
}
</script>
