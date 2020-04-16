<template functional>
    <button
        @click='listeners.click'
        :class="{
            'btn btn-light': props.format === 'floating',
            'btn btn-outline-secondary': props.format === 'outline',
            'btn btn-outline-primary': props.format === 'outline-primary',
        }"
        :disabled="props.disabled"
        >
        <Icon :icon="props.icon" :type="props.iconType" :color="props.iconColor" v-if="props.labelPosition === 'left'" />
        <span class="label" v-if="!!$slots.default">
            <slot />
        </span>
        <Icon :icon="props.icon" :type="props.iconType" :color="props.iconColor" v-if="props.labelPosition === 'right'" />
    </button>
</template>

<script>
import Icon from './Icon'

export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        labelPosition: {
            type: String,
            default: 'right'
        },
        icon: {
            type: String,
            required: true
        },
        iconType: {
            type: String
        },
        iconColor: {
            type: String
        },
        format: {
            type: String,
            default: 'floating'
        }
    },
    components: {
        Icon
    }
}
</script>

<style lang="scss" scoped>

button {
  .label {
    margin: 0 10px;
  }
}

</style>
