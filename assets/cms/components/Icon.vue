<template functional>

    <span class="icon">
        <i :class="[{
            'fas': props.type === 'fontawesome-solid',
            'far': props.type === 'fontawesome-regular',
            'fab': props.type === 'fontawesome-brand',
            }, props.icon]"
            v-bind:style="props.color ? {'color':props.color} : null"
        />
    </span>

</template>

<script>
export default {
    props: {
        icon: String,
        type: String,
        color: String
    }
}
</script>

<style lang="scss" scope>
    .icon {
        font-size: 1.2rem;
    }
</style>
