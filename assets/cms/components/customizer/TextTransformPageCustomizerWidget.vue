<template>
    <select @change="componentUpdated" class="form-select form-select-sm" v-model="textTransform"
            :style="{'text-transform': textTransform}">
        <option v-for="transformValue in transformValues" :value="transformValue">{{ getTransformValueDisplayName(transformValue) }}</option>
    </select>
</template>

<script>

export default {
    emits: ['update'],
    data() {
        return {
            textTransform: this.styleValue.value.textTransform
        }
    },
    methods: {
        componentUpdated: function () {
            this.$emit('update', {
                variable: this.styleValue.style.variable,
                value: {
                    textTransform: this.textTransform
                }
            })
        },
        getTransformValueDisplayName: function (id) {
            if (window.ccmi18n_styleCustomizer && window.ccmi18n_styleCustomizer.textTransforms && window.ccmi18n_styleCustomizer.textTransforms[id]) {
                return window.ccmi18n_styleCustomizer.textTransforms[id]
            }
            return id
        }
    },
    computed: {
        transformValues: function () {
            return [
                'none',
                'uppercase',
                'lowercase',
                'capitalize',
                'full-width',
                'full-width-kana'
            ]
        }
    },
    props: {
        styleValue: {
            type: Object
        }
    }
}
</script>
