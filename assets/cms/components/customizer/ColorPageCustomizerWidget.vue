<template>
  <div class="d-flex">
    <div>{{ styleObject.name }}</div>
    <div class="ml-auto"><input type="color"></div>
  </div>
</template>

<script>

export default {
    components: {
    },
    data() {
      return {

      }
    },
    computed: {},
    props: {
        styleObject: {
            type: Object
        }
    }
}
</script>
