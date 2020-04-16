<template functional>
<div v-if='listeners.click' href='#' @click='listeners.click' v-bind='{...attrs, ...props}' :class='{"dropdown-item": true, "d-flex": true, disabled: props.disabled === true}'>
    <span class='menu-icon flex d-flex'>
      <Icon :icon='props.icon' :type='props.iconType' :color='props.iconColor' />
    </span>
    <span class='flex menu-item-title'><slot /></span>
</div>
<a v-else :href='props.href' v-bind='{...attrs, ...props}' :class='{"dropdown-item": true, "d-flex": true, disabled: props.disabled}'>
    <span class='menu-icon flex d-flex justify-center'>
      <Icon :icon='props.icon' :type='props.iconType' :color='props.iconColor' />
    </span>
    <span class='flex menu-item-title'><slot /></span>
</a>
</template>
<style lang='scss' scoped>
@import '../../../../assets/cms/scss/bootstrap-overrides';

.dropdown-item {
  .menu-icon {
    align-items: center;
    color: $gray-500;
    justify-content: center;
  }

  &.disabled {
    .menu-icon {
      color: inherit;
      fill: currentColor;
    }
  }

  &:active {
    .menu-icon {
      color: inherit;
      fill: currentColor;
    }
  }
}
</style>
<script>
import Icon from '../Icon'

export default {
    components: {
        Icon
    },
    props: {
        disabled: Boolean,
        icon: String,
        iconType: String,
        iconColor: String,
        href: String
    }
}
</script>
