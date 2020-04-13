<template functional>
    <div class='menubutton-wrapper dropdown'>
        <button @click='listeners.click' :class="[props.buttonClass, props.active ? props.buttonActiveClass : props.buttonInactiveClass]">
            <i :class="[props.icon, 'fas']"></i> {{props.title}}
        </button>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        icon: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        buttonClass: {
            type: String,
            default: 'btn'
        },
        buttonActiveClass: {
            type: String,
            default: 'btn-primary'
        },
        buttonInactiveClass: {
            type: String,
            default: 'btn-outline-secondary'
        }
    }
}
</script>
