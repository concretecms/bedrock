<template functional>
    <div class="container">
        <span class="label">{{props.label}}</span>
        <input class="input" />
    </div>
</template>

<script>
export default {
    props: {
        label:String,
        position: String
    }
}
</script>

<style lang="scss" scoped>
    .container {
        display: inline-flex;
        align-items: center;
    }

    .input {
        padding:5px;
        margin:5px;
        border: 1px solid #D8D8D8;
    }
</style>