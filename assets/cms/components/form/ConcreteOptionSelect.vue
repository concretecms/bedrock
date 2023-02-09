<template>
    <select multiple :name="inputName" />
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect, WebFont */
export default {
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
    prop: ['value'],
    model: {
        prop: 'value',
        event: 'change'
    },
    created() {
        var my = this
        if (this.value) {
            var formData = this.getFormData()
            this.value.forEach((optionId) => {
                formData.append('optionId[]', optionId)
            })
            var url = this.selectedOptionsUrl
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(json => {
                    if (my.select) {
                        json.forEach((item) => {
                            my.select.addOption(item)
                            my.select.addItem(item.id)
                        })
                    }
                }).catch(() => {})
        }
    },
    mounted() {
        var my = this
        var config = {
            maxOptions: null,
            searchField: 'primary_label',
            labelField: 'primary_label',
            valueField: 'id',
            createOnBlur: true,
            create: true,
            onItemAdd: function() {
                // Without this method, Tom Select persists the search string even after we search for something,
                // requiring us to delete the string in order to continue searching for something else - it's kind
                // of annoying.
                this.setTextboxValue('')
                this.refreshOptions()
            },
            load: function(query, callback) {
                var url = my.dataSourceUrl
                var formData = my.getFormData()
                formData.append('query', query)
                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(json => {
                        callback(json)
                    }).catch(() => {
                        callback()
                    })
            },
            render: {
                option: function (item, escape) {
                    return `<div>
                                ${escape(item.primary_label)}
                            </div>`
                },
                item: function (item, escape) {
                    return `<div>
                                ${escape(item.primary_label)}
                            </div>`
                }
            }
        }
        if (!this.allowMultipleValues) {
            config.maxItems = 1
        } else {
            config.plugins = ['remove_button']
        }
        my.select = new TomSelect(this.$el, config)
        my.select.on('change', function(value) {
            my.$emit('change', value)
        })
    },
    methods: {
        getFormData() {
            var formData = new FormData()
            formData.append('akID', this.attributeKeyId)
            formData.append('accessToken', this.accessToken)
            return formData
        }
    }
}
</script>
