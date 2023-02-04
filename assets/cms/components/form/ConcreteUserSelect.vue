<template>
    <input :name="inputName" class="ccm-form-select-user" />
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect */
export default {
    props: {
        includeAvatar: {
            type: Boolean,
            default: false
        },
        labelFormat: {
            type: String,
            default: 'auto'
        },
        accessToken: {
            type: String,
            required: true
        },
        inputName: {
            type: String
        },
        userId: {
            type: [Number, String, Array],
            required: false
        }
    },
    prop: ['userId'],
    model: {
        prop: 'userId',
        event: 'change'
    },
    created() {
        var my = this
        if (this.userId) {
            var formData = this.getFormData()
            formData.append('userId[]', this.userId)
            var url = CCM_DISPATCHER_FILENAME + '/ccm/system/user/autocomplete/get_selected'
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
                var formData = my.getFormData()
                formData.append('query', query)
                var url = CCM_DISPATCHER_FILENAME + '/ccm/system/user/autocomplete'
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
                    return my.renderOption(item)
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
            formData.append('includeAvatar', this.includeAvatar ? 1 : 0)
            formData.append('labelFormat', this.labelFormat)
            formData.append('accessToken', this.accessToken)
            return formData
        },
        renderOption: function (item) {
            var option = '<div>'

            if (item.avatar) {
                option += `<div class="ccm-form-select-user-avatar">
                                <img src="${item.avatar}"/>
                           </div>`
            }

            option += '<div>'
            option += `<div class="ccm-form-select-user-label-primary">
                            ${escape(item.primary_label)}
                       </div>`

            if (item.secondary_label) {
                option += `<div class="ccm-form-select-user-label-secondary">
                               ${escape(item.secondary_label)}
                           </div>`
            }

            option += '</div>'
            option += '</div>'
            return option
        }
    }
}
</script>
