<template>
    <div class='ccm-toggle' :class='[model ? "on" : "off"]'>
        <span class='affirmative' @click='set(true)'>
            <span class='title'>{{affirmativeTitle}}</span>
            <span class='icon'>
                <Icon :type='model ? "fas" : "far"' :icon='model ? "dot-circle" : "circle"' />
            </span>
        </span>
        <span class='negative' @click='set(false)'>
            <span class='title'>{{negativeTitle}}</span>
            <span class='icon'>
                <Icon :type='!model ? "fas" : "far"' :icon='!model ? "dot-circle" : "circle"' />
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

<script setup>
import Icon from '../Icon.vue'

const model = defineModel({ type: Boolean, required: true })

const emit = defineEmits(['change'])

defineProps({
    affirmativeTitle: {
        type: String,
        default: 'Yes'
    },
    negativeTitle: {
        type: String,
        default: 'No'
    }
})

function set(to) {
    if (model.value !== to) {
        model.value = to
        emit('change', to)
    }
}
</script>
