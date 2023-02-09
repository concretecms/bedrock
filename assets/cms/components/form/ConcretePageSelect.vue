<template>
    <input :name="inputName" />
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect */
export default {
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
    prop: ['pageId'],
    model: {
        prop: 'pageId',
        event: 'change'
    },
    created() {
        var my = this
        if (this.pageId) {
            var formData = this.getFormData()
            formData.append('pageId[]', this.pageId)
            var url = CCM_DISPATCHER_FILENAME + '/ccm/system/page/autocomplete/get_selected'
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
                }).catch(() => {
                })
        }
    },
    mounted() {
        var my = this
        my.select = new TomSelect(this.$el, {
            maxOptions: null,
            maxItems: 1,
            searchField: 'primary_label',
            labelField: 'primary_label',
            valueField: 'id',
            load: function(query, callback) {
                var url = CCM_DISPATCHER_FILENAME + '/ccm/system/page/autocomplete'
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
            return formData
        }
    }
}
</script>
