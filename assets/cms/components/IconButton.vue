<template>
    <button
        v-bind="{type: buttonType}"
        class='btn'
        :class="[$options.classMap[type] || $options.defaultClass, buttonClass]"
        :disabled="disabled"
        >
        <Icon v-bind="{icon: icon, type: iconType, color: iconColor}" v-if="labelPosition === 'right'" />
        <span class="label" v-if="showSlot">
            <slot />
        </span>
        <Icon v-bind="{icon: icon, type: iconType, color: iconColor}" v-if="labelPosition !== 'right'" />
    </button>
</template>

<script>
import Icon from './Icon.vue'

export const types = {
    add: 'add',
    save: 'save',
    delete: 'delete',
    cancel: 'cancel',
    outline: 'outline',
    floating: 'floating'
}

export default {
    classMap: {
        [types.add]: 'btn-success',
        [types.save]: 'btn-primary',
        [types.delete]: 'btn-danger',
        [types.cancel]: 'btn-outline-secondary',
        [types.outline]: 'btn-outline-secondary',
        [types.floating]: 'btn-outline'
    },
    defaultClass: 'btn-outline-primary',
    props: {
        type: {
            type: String,
            default: types.add
        },
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
        buttonType: {
            type: String,
            default: 'button'
        },
        buttonClass: [String, Array, Object]
    },
    components: {
        Icon
    },
    computed: {
        showSlot() {
            return this.hasTextContent({children: this.$slots.default ? this.$slots.default() : []})
        }
    },
    methods: {
        hasTextContent(node) {
            if (!node.children) {
                return false
            }

            for (let child of node.children) {
                if (typeof child === 'string' && child.length > 0) {
                    return true
                }
                
                if (this.hasTextContent(child)) {
                    return true
                }
            }

            return false
        }
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
