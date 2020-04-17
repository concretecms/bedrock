<template functional>
    <div class='ccm-toggle' :class='[props.active ? "on" : "off", props.class]'>
        <span class='affirmative' @click='(e) => (!props.active && (listeners.change || (() => {}))(e))'>
            <span class='title'>{{props.affirmativeTitle}}</span>
            <span class='icon'>
                <Icon
                  :type='props.active ? props.checkedIconType : props.uncheckedIconType'
                  :icon='props.active ? props.checkedIcon : props.uncheckedIcon' />
            </span>
        </span>
        <span class='negative' @click='(e) => (props.active && (listeners.change || (() => {}))(e))'>
            <span class='title'>{{props.negativeTitle}}</span>
            <span class='icon'>
                <Icon
                  :type='!props.active ? props.checkedIconType : props.uncheckedIconType'
                  :icon='!props.active ? props.checkedIcon : props.uncheckedIcon' />
            </span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
.ccm-toggle {
  display: flex;

  &.off .affirmative {
    cursor: pointer;
  }

  &.on .negative {
    cursor: pointer;
  }

  .affirmative {
    margin-right: 2px;
  }

  .affirmative,
  .negative {
    align-items: center;
    display: flex;

    > .title {
      margin-right: 8px;
    }

    > .icon {
      align-items: center;
      display: flex;
      height: 30px;
      justify-content: center;
      width: 30px;
    }
  }
}
</style>

<script>
import Icon, { Types, Icons } from '../Icon'

export default {
    props: {
        active: {
            type: Boolean,
            required: true
        },
        affirmativeTitle: {
            type: String,
            default: 'Yes'
        },
        negativeTitle: {
            type: String,
            default: 'No'
        },
        checkedIconType: {
            type: String,
            default: Types.fas
        },
        checkedIcon: {
            type: String,
            default: Icons.fas.dotCircle
        },
        uncheckedIconType: {
            type: String,
            default: Types.far
        },
        uncheckedIcon: {
            type: String,
            default: Icons.fas.circle
        }
    },
    components: { Icon }
}
</script>
