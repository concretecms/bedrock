<template functional>
    <div class="ccm-image-cell text-center">
        <img :src="props.src" :style="{ width: props.size + 'px', height: props.size + 'px' }" />
        <p>{{ props.fileSize }}</p>
    </div>
</template>

<style lang="scss" scoped>
.ccm-image-cell {
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

    &:hover {
      border: 2px solid #4a90e2;
      opacity: 1;
    }
  }
}
</style>

<script>

export default {
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
            type: Number,
            required: true
        }
    }
}
</script>
