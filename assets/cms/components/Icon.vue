<template functional>

    <span class="icon">
        <i :class="[{
            'fas': props.type === 'fontawesome-solid',
            'far': props.type === 'fontawesome-regular',
            'fab': props.type === 'fontawesome-brand',
            }, props.icon]" 
            v-bind:style="{'color':props.color}"
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
        padding: 10px 12px;
        font-size: 1.2rem;
    }
</style>

