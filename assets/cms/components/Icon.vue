<template functional>

    <i class="icon" :class="[{
            'fas': props.iconType === 'fontawesome-solid',
            'far': props.iconType === 'fontawesome-regular',
            'fab': props.iconType === 'fontawesome-brand',
        }, props.icon]"
        :style="{'color': props.iconColor}"
    />

</template>

<script>
export default {
    props: {
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .icon {
        font-size: 1.2rem;
    }
</style>
