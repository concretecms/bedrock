<template>
    <select class="form-control" :name="name" :title="title" v-model="selectedOption" ref="iconSelector">
        <option v-for="icon in icons" :value="icon.value" :data-icon="icon.value + ' fa-fw'">{{ icon.label }}</option>
    </select>
</template>

<script>
import { icons } from '../iconlist'

// Export our component definition
export default {
    data() {
        return {
            selectedOption: this.selected,
            emptyOptionLabel: this.emptyOptionLabel
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
        $(this.$refs.iconSelector).selectpicker({
            liveSearch: true,
            width: 'fit'
        })
    }
}
</script>
