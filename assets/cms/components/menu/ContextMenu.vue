<template>
    <div class="dropdown-menu" :class="[show ? 'show' : '', props.class]" aria-labelledby="dropdownMenuButton">
        <slot></slot>
    </div>
</template>
<script setup>
const props = defineProps({
    show: {type: Boolean, required: true},
    class: String
})
</script>