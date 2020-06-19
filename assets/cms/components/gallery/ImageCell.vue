<template functional>
    <div class="ccm-image-cell-grid">
      <div class="ccm-image-cell v-component text-center" :class="{ active: props.isActive }">
          <button type="button" class="delete" @click="listeners.delete">
              <Icon icon="times" type="fas" color="#fff"/>
          </button>
          <div @click="listeners.click">
              <img :src="props.src" :style="{ width: props.size + 'px', height: props.size + 'px' }" />
              <p>{{ props.fileSize }}</p>
          </div>
      </div>
    </div>
</template>

<script>
import Icon from '../Icon'

export default {
    components: {
        Icon
    },
    props: {
        isActive: {
            type: Boolean,
            default: false
        },
        src: {
            type: String,
            required: true
        },
        fileSize: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        }
    }
}
</script>
