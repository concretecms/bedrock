<template>
    <select :name="name" :title="title" v-model="selectedOption" ref="iconSelector">
        <option v-for="icon in icons" :value="icon.value">{{ icon.label }}</option>
    </select>
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect */
import { icons } from '../iconlist'

// Export our component definition
export default {
    data() {
        return {
            selectedOption: this.selected
        }
    },
    props: {
        name: String,
        selected: {
            type: String,
            required: false,
            default: ''
        },
        title: {
            type: String,
            require: false,
            default: 'Choose Icon'
        },
        emptyOptionLabel: {
            type: String,
            require: false,
            default: '** None Selected'
        }
    },
    computed: {
        icons: function () {
            const arr = []

            arr.push({
                value: '',
                label: this.emptyOptionLabel
            })

            Object.entries(icons.fas).forEach(function(value) {
                arr.push({
                    value: 'fas fa-' + value[1],
                    label: value[0]
                })
            })
            Object.entries(icons.fab).forEach(function(value) {
                arr.push({
                    value: 'fab fa-' + value[1],
                    label: value[0]
                })
            })

            return arr
        }
    },
    mounted() {
        new TomSelect(this.$el, {
            maxOptions: null,
            render: {
                option: function (data, escape) {
                    return '<div class="d-flex align-items-center"><span class="d-flex align-items-center justify-content-center me-2" style="width: 32px"><i class="' + data.value + '"></i></span><span>' + data.text + '</span></div>'
                },
                item: function (item, escape) {
                    return '<div class="d-flex  align-items-center"><span class="d-flex align-items-center justify-content-center me-2" style="width: 32px"><i class="' + item.value + '"></i></span><span>' + item.text + '</span></div>'
                }
            }
        })
    }
}
</script>
