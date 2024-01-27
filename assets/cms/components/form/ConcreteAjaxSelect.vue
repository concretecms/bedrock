<template>
    <input :class="cssClasses" :name="name" v-if="maxItems == 1" />
    <select multiple :class="cssClasses" :name="name" v-else />
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect */
export default {
    props: {
        // If we use this component in a traditional non-vue-based form, we need to
        // have a name for the input field. This controls that. Can be safely left blank
        // if you're just using this in Vue w/v-model
        name: {
            type: String
        },
        // Do we want our input/select to have any custom classes?
        cssClasses: {
            type: Array
        },
        // The value of whatever item we're selecting, be it user ID, page ID, array of page IDs, etc...
        value: {
            type: [Array, String, Number]
        },
        // The URL used to search
        dataSourceUrl: {
            type: String,
            required: true
        },
        // The selected options URL
        selectedOptionsUrl: {
            type: String,
            required: true
        },
        // The data sent to the server with every request. Paired with an access token to ensure
        // that only authorized requests are responded to.
        formData: {
            type: Object,
            required: true
        },
        // Used to authorize requests
        accessToken: {
            type: String,
            required: true
        },
        // Whether to include the remove button on each selected item
        removeButton: {
            type: Boolean,
            required: false,
            default: false
        },
        maxItems: {
            required: false,
            default: 1
        },
        allowCreate: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: ['change'],
    data() {
        return {}
    },
    mounted() {
        var my = this
        var config = {
            maxOptions: null,
            maxItems: my.maxItems,
            searchField: 'primary_label',
            labelField: 'primary_label',
            valueField: 'id',
            load: function (query, callback) {
                var formData = my.getFormData()
                formData.append('query', query)
                var url = my.dataSourceUrl
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
                    return (typeof (my.$parent.renderOption) === 'function')
                        ? my.$parent.renderOption(item, escape) : my.renderOption(item, escape)
                },
                item: function (item, escape) {
                    return (typeof (my.$parent.renderItem) === 'function')
                        ? my.$parent.renderItem(item, escape) : my.renderItem(item, escape)
                }
            }
        }

        if (this.removeButton) {
            config.plugins = ['remove_button']
        }

        if (!this.maxItems) {
            config.onItemAdd = function () {
                // Without this method, Tom Select persists the search string even after we search for something,
                // requiring us to delete the string in order to continue searching for something else - it's kind
                // of annoying. it only seems to be a problem in multi-select mode ?!
                this.setTextboxValue('')
                this.refreshOptions()
            }
        }

        if (this.allowCreate) {
            config.createOnBlur = true
            config.create = true
        }

        my.select = new TomSelect(this.$el, config)
        my.select.on('change', function (value) {
            my.$emit('change', value)
        })
    },
    unmounted() {
        this.select?.destroy()
    },
    watch: {
        value: {
            immediate: true,
            handler: function () {
                var my = this
                if (my.value) {
                    var formData = my.getFormData()
                    var url = my.selectedOptionsUrl
                    fetch(url, {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => response.json())
                        .then(json => {
                            json.forEach((item) => {
                                my.select.addOption(item)
                                my.select.addItem(item.id)
                            })
                        }).catch(() => {})
                }
            }
        }
    },
    methods: {
        getFormData() {
            var formData = new FormData()
            for (const [key, value] of Object.entries(this.formData)) {
                if (Array.isArray(value)) {
                    // Multi-select, as in the case of ConcreteExpressEntrySelect, etc...
                    value.forEach((thisValue) => {
                        formData.append(key + '[]', thisValue)
                    })
                } else if (typeof (value) === 'boolean') {
                    formData.append(key, value ? 1 : 0)
                } else {
                    formData.append(key, value)
                }
            }
            formData.append('accessToken', this.accessToken)
            return formData
        },
        renderOption(item, escape) {
            return `<div>${escape(item.primary_label)}</div>`
        },
        renderItem(item, escape) {
            return `<div>${escape(item.primary_label)}</div>`
        }
    }
}
</script>
