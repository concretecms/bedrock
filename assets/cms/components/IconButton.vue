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
        <span class="label" v-if="props.labelPosition === 'left'">
            <slot />
        </span>

        <Icon :icon="props.icon" :icon-type="props.iconType" :icon-color="props.iconColor" />

        <span class="label" v-if="props.labelPosition === 'right'">
            <slot />
        </span>

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
            type: String,
            default: 'fontawesome-solid'
        },
        iconColor: {
            type: String,
            default: 'inherit'
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

    &:empty {
      display: none;
    }
  }
}

</style>
