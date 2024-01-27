<template>
    <div class="ccm-context-theme">
        <select :name="inputName" v-model="selectedColor">
            <option v-for="color in colorCollection.colors" :selected="selectedColor == color.variable" :value="color.variable">{{ color.name }}</option>
        </select>
    </div>
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect */
export default {
    data() {
        return {
            selectedColor: this.color
        }
    },
    emits: ['change'],
    props: {
        colorCollection: {
            type: Object,
            required: true
        },
        inputName: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: false
        }
    },
    watch: {
        selectedColor: {
            handler(value) {
                this.$emit('change', value)
            }
        }
    },
    mounted() {
        var my = this
        new TomSelect(this.$el.querySelector('select'), {
            render: {
                option: function (data, escape) {
                    return my.dataContentAttribute(data)
                },
                item: function (item, escape) {
                    return my.dataContentAttribute(item)
                }
            }
        })
    },
    methods: {
        dataContentAttribute: function(item) {
            return '<div><span style="background-color: var(--bs-' + item.value + ')" class="btn me-2 p-2"></span> ' + item.text + '</div>'
        }
    }
}
</script>
