<template functional>
    <div :class="{'dropdown-menu': true, show: props.show, ...props.class}" aria-labelledby="dropdownMenuButton">
        <slot></slot>
    </div>
</template>
<style lang='scss' scoped>
@import '../../../../assets/cms/scss/bootstrap-overrides';

.dropdown-menu {
  border-color: $gray-400;
  border-radius: 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  min-width: 175px;
}
</style>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true
        },
        class: String | Array | Object
    }
}
</script>
