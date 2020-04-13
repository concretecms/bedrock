<template functional>
<div v-if='listeners.click' href='#' @click='listeners.click' v-bind='{...attrs, ...props}' :class='{"dropdown-item": true, "d-flex": true, disabled: props.disabled === true}'>
    <span class='menu-icon flex d-flex'><i v-if='props.icon' :class='["fas", props.icon]'></i></span>
    <span class='flex'><slot></slot></span>
</div>
<a v-else :href='props.href' v-bind='{...attrs, ...props}' :class='{"dropdown-item": true, "d-flex": true, disabled: props.disabled}'>
    <span class='menu-icon flex d-flex justify-center'><i v-if='props.icon' :class='["fa", props.icon]'></i></span>
    <span class='flex'><slot></slot></span>
</a>
</template>
<style lang='scss' scoped>
@import '../../../../assets/cms/scss/bootstrap-overrides';

.dropdown-item {
  .menu-icon {
    align-items: center;
    color: $gray-500;
    justify-content: center;
    width: 2.188em;
  }

  &.disabled {
    .menu-icon {
      color: inherit;
    }
  }

  &:active {
    .menu-icon {
      color: inherit;
    }
  }
}
</style>
<script>
export default {
    props: {
        disabled: Boolean,
        icon: String,
        href: String
    }
}
</script>
