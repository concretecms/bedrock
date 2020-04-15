<template functional>
    <div class='ccm-toggle' :foo='{ "this" : "isnt",
     valid: "fpp"}' :class='[props.active ? "on" : "off", props.class]'>
        <span class='affirmative' @click='(e) => (!props.active && (listeners.change || (() => {}))(e))'>
            <span class='title'>{{props.affirmativeTitle}}</span>
            <span class='icon'>
                <i :class='[props.active ? "fas fa-dot-circle" : "far fa-circle"]' />
            </span>
        </span>
        <span class='negative' @click='(e) => (props.active && (listeners.change || (() => {}))(e))'>
            <span class='title'>{{props.negativeTitle}}</span>
            <span class='icon'>
                <i :class='[!props.active ? "fas fa-dot-circle" : "far fa-circle"]' />
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
        }
    }
}
</script>
