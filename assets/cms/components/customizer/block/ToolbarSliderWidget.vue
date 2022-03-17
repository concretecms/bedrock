<template>
    <div>
        <label class="form-label" :for="inputId">{{title}}</label>
        <div class="ccm-inline-style-slider-wrapper">
            <div class="ccm-inline-style-sliders">
                <input v-on:input="handleInput" :id="inputId + '_slider'" type="range" :min="min" :max="max" :step="step" :value="value">
                <input :value="calculatedValue" :id="inputId" :name="inputId" type="hidden">
            </div>
            <span class="input-group input-group-sm">
                <input type="text" :id="inputId+'_text'" autocomplete="off" class="form-control" :value="value" v-on:input="handleInput">
                <span class="input-group-text" v-if="units !== ''">{{units}}</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        },
        value: {
            type: Number,
            default: 0
        },
        units: {
            type: String,
            default: ''
        },
        inputId: {
            type: String,
            default: ''
        },
        attachUnits: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        handleInput(event) {
            let newValue = parseInt(event.target.value)
            if (isNaN(newValue)) {
                newValue = 0
            }
            if (newValue < this.min) {
                newValue = this.min
            }
            if (newValue > this.max) {
                newValue = this.max
            }

            this.calculateBackground(newValue)

            this.$emit('input', newValue)
        },
        calculateBackground(value) {
            const target = document.querySelector('input[type=range][id=' + this.inputId + '_slider]')

            target.style.backgroundSize = (value - this.min) * 100 / (this.max - this.min) + '% 100%'
        }
    },
    mounted() {
        this.calculateBackground(this.value ? this.value : 0)
    },
    computed: {
        calculatedValue() {
            let value = this.value ? this.value : 0
            if (this.attachUnits) {
                value += this.units
            }

            return value
        }
    }

}
</script>

<style lang="scss" scoped>

</style>
