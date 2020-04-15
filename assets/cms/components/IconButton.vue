<template functional>
    <span class="button-container">
        <button
            @click='listeners.click'
            v-bind:class="['btn', props.bootstrapClass]"
            :disabled="props.disabled"
            >
            <span class="label" v-if="props.labelPosition === 'left'"
                v-bind:class="{disabled : props.disabled}">
                <slot />
            </span>

            <Icon :icon="props.icon" :type="props.type" :color="props.disabled ? '#ccc' : props.color"/>

            <span class="label" v-if="props.labelPosition === 'right' || !props.labelPosition"
                v-bind:class="{disabled : props.disabled}">
                <slot />
            </span>

        </button>
    </span>
</template>

<script>
import Icon from './Icon'

export default {
    props: {
        outline: Boolean,
        disabled: Boolean,
        labelPosition: String,
        icon: String,
        type: String,
        color: String,
        bootstrapClass: {
            type: String
        }
    },
    components: {
        Icon
    }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/cms/scss/bootstrap-overrides';
.button-container {
    button {
        display: inline-flex;
        align-items: center;
        &:focus {
            outline: none;
        }

        &.clear {
            background:none;
            border:none;
        }
    }
}

.label {
    font-family: sans-serif;
    font-size: .9rem;
    margin-left: 10px;
    &:empty {
        display: none;
    }
}
</style>
