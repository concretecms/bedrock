<template functional>
    <span class="button-container">
        <button
            @click='listeners.click'
            :class="[{ 'btn btn-light' : props.format === 'floating',
                    'btn btn-outline-secondary' : props.format === 'outline',
                    'btn btn-outline-primary' : props.format === 'outline-primary',
                }]"
            :disabled="props.disabled"
            >
            <span class="label" v-if="props.labelPosition === 'left'"
                :class="{disabled : props.disabled}">
                <slot />
            </span>

            <Icon :icon="props.icon" :icon-type="props.iconType" :color="props.color"/>

            <span class="label" v-if="props.labelPosition === 'right'"
                :class="{disabled : props.disabled}">
                <slot />
            </span>

        </button>
    </span>
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
        icon: String,
        iconType: String,
        color: String,
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

.button-container {
    button {
        .label {
            font-size: .9rem;
            margin-left: 10px;
            &:empty {
                display: none;
            }
        }
    }
}

</style>
