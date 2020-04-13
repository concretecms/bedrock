<template functional>
    <span class="container" >
        <span v-if="props.labelPosition === 'left'" class="label" v-bind:class="{disabled : props.disabled}">
            <slot />
        </span>
        <span class="icon" v-bind:class="{outline : props.outline}">
            <i :class="[props.icon]" 
                v-bind:style="[props.disabled ? {'color':'#ccc'} : {'color':props.color}]"
            />
            
        </span>
        <span 
            v-if="props.labelPosition === 'right' || props.labelPosition == null" 
            class="label" 
            v-bind:class="{disabled : props.disabled}"
        >
            <slot />
        </span>
    </span>
</template>

<script>


export default {
    props: {
        icon: String,
        iconType: String,
        color: String,
        outline: Boolean,
        disabled: Boolean,
        labelPosition: String
    }
}
</script>

<style lang="scss" scoped>
    .container {
        display: inline-flex;
        align-items: center;
    }
    .icon {
        padding: 5px 13px;
        font-size: 1.4rem;
        &.outline {
            border: 1px solid #D8D8D8;
            border-radius: 4px;
        }
    }
    .label {
        font-size: .9rem;
        color: #444444;

        &.disabled {
            color: #ccc;
        }
    }
    
</style>
