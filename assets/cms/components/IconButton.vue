<template functional>
    <span class="container" v-bind:class="{outline : props.outline}">

        <span class="label" v-if="props.labelPosition === 'left'" 
            v-bind:class="{disabled : props.disabled}">
            <slot />
        </span>
            
        <Icon :icon="props.icon" :type="props.type" :color="props.disabled ? '#ccc' : props.color"/>

        <span class="label" v-if="props.labelPosition === 'right' || !props.labelPosition"
            v-bind:class="{disabled : props.disabled}">
            <slot />
        </span>
        
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
        color: String
    },
    components: {
        Icon
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: inline-flex;
    align-items: center;
}
.outline {
        border: 1px solid #D8D8D8;
        border-radius: 4px;
}
.label {
    font-family: sans-serif;
    font-size: .9rem;
    color: #444444;
    margin: 5px 10px 5px 5px;

    &.disabled {
        color: #ccc;
    }
    &:empty {
        display: none;
    }
}
</style>