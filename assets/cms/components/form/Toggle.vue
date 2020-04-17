<template functional>
    <div class='ccm-toggle' :class='[props.active ? "on" : "off", props.class]'>
        <span class='affirmative' @click='(e) => (!props.active && (listeners.change || (() => {}))(e))'>
            <span class='title'>{{props.affirmativeTitle}}</span>
            <span class='icon'>
                <input type='radio' :checked='props.active' />
            </span>
        </span>
        <span class='negative' @click='(e) => (props.active && (listeners.change || (() => {}))(e))'>
            <span class='title'>{{props.negativeTitle}}</span>
            <span class='icon'>
                <input type='radio' :checked='!props.active' />
            </span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
.ccm-toggle {
  display: flex;

  &.off .affirmative {
    cursor: pointer;

    .icon > input {
      cursor: pointer;
    }
  }

  &.on .negative {
    cursor: pointer;

    .icon > input {
      cursor: pointer;
    }
  }

  .affirmative {
    margin-right: 1rem;
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

      input {
        height: 1rem;
        width: 1rem;
      }
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
