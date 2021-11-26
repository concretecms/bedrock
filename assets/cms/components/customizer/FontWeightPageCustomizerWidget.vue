<template>
    <select @change="componentUpdated" class="form-select form-select-sm" v-model="fontWeight"
            :style="{'font-weight': fontWeight}">
        <option v-for="fontWeightValue in fontWeightValues" :value="fontWeightValue">{{ getWeightValueDisplayName(fontWeightValue) }}</option>
    </select>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            fontWeight: this.styleValue.value.fontWeight
        }
    },
    methods: {
        componentUpdated: function () {
            this.$emit('update', {
                variable: this.styleValue.style.variable,
                value: {
                    fontWeight: this.fontWeight
                }
            })
        },
        getWeightValueDisplayName: function (id) {
            if (window.ccmi18n_styleCustomizer && window.ccmi18n_styleCustomizer.fontWeights && window.ccmi18n_styleCustomizer.fontWeights[id]) {
                return window.ccmi18n_styleCustomizer.fontWeights[id];
            }
            return id;
        }
    },
    computed: {
        fontWeightValues: function () {
            return [
                'normal',
                'bold',
                'bolder',
                'light',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900'
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
