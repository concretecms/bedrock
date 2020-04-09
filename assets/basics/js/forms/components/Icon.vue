<template functional>
    <span>
        <span class="icon"><i :class="[props.icon]"></i></span>
        <span class="label"><slot /></span>
    </span>
</template>

<script>
export default {
    props: {
        icon: String
    }
}
</script>