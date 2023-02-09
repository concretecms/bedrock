<template>
    <select multiple :name="inputName" />
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect, WebFont */
export default {
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
    prop: ['entryId'],
    model: {
        prop: 'entryId',
        event: 'change'
    },
    created() {
        var my = this
        if (this.entryId) {
            var formData = this.getFormData()
            if (Array.isArray(this.entryId)) {
                this.entryId.forEach((thisEntryId) => {
                    formData.append('entryId[]', thisEntryId)
                })
            } else {
                formData.append('entryId[]', this.entryId)
            }
            var url = CCM_DISPATCHER_FILENAME + '/ccm/system/express/entry/autocomplete/get_selected'
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
        my.select = new TomSelect(this.$el, {
            maxOptions: null,
            searchField: 'primary_label',
            labelField: 'primary_label',
            valueField: 'id',
            plugins: {
                remove_button: {
                }
            },
            onItemAdd: function() {
                // Without this method, Tom Select persists the search string even after we search for something,
                // requiring us to delete the string in order to continue searching for something else - it's kind
                // of annoying.
                this.setTextboxValue('')
                this.refreshOptions()
            },
            load: function(query, callback) {
                var url = CCM_DISPATCHER_FILENAME + '/ccm/system/express/entry/autocomplete'
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
        })
        my.select.on('change', function(value) {
            my.$emit('change', value)
        })
    },
    methods: {
        getFormData() {
            var formData = new FormData()
            formData.append('accessToken', this.accessToken)
            formData.append('entity', this.entity)
            return formData
        }
    }
}
</script>
