<template>
    <button class="btn btn-primary float-end"
            type="button"
            :disabled="disabled"
            data-bs-toggle="modal" :data-bs-target="modalTarget">
        {{buttonText}}
    </button>
</template>

<script setup>
defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    buttonText: {
        type: String,
        required: true
    },
    modalTarget: {
        type: String,
        default: '#modal-add-scheduled-board-element'
    }
})
</script>
