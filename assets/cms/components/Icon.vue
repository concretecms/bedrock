<template functional>

    <i class="icon" :class="[{
            'fas': props.iconType === 'fontawesome-solid',
            'far': props.iconType === 'fontawesome-regular',
            'fab': props.iconType === 'fontawesome-brand',
        }, props.icon]"
        :style="props.color ? {'color':props.color} : null"
    />

</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: 'fa-exclamation-triangle'
        },
        iconType: {
            type: String,
            default: 'fontawesome-solid'
        },
        color: String
    }
}
</script>

<style lang="scss" scoped>
    .icon {
        font-size: 1.2rem;
    }
</style>
