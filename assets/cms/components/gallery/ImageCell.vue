<template functional>
    <div class="ccm-image-cell text-center" :class="{ active: props.isActive }">
        <button class="delete" @click="listeners.delete">
            <Icon icon="times" type="fas" color="#fff"/>
        </button>
        <img :src="props.src"
            :style="{ width: props.size + 'px', height: props.size + 'px' }"
            @click="listeners.click"
        />
        <p>{{ props.fileSize }}</p>
    </div>
</template>

<style lang="scss" scoped>
.ccm-image-cell {
  display: inline-flex;
  flex-direction: column;
  position: relative;

  &:hover,
  &.active {
    img {
      border: 2px solid #4a90e2;
      opacity: 1;
    }

    .delete {
      opacity: 1;
      transition: opacity 0.2s ease-out;
    }
  }

  p {
    color: #676b74;
    font-size: 1rem;
    letter-spacing: 0;
    margin-top: 0.625rem;
    text-transform: uppercase;
  }

  img {
    border: 2px solid #979797;
    box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
    opacity: 0.7;
    padding: 0.5rem;
    transition: opacity 0.5s ease-out;
  }

  .delete {
    background-color: #6a6f7b;
    border-radius: 20px;
    float: left;
    height: 30px;
    margin-right: -10px;
    margin-top: -10px;
    opacity: 0;
    position: absolute;
    right: 0;
    width: 30px;
    z-index: 90;
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
