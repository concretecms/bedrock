<template functional>
    <div class="ccm-gallery-image-details">
        <div class="image-preview text-center">
            <img :src="props.image.imageUrl" />
            <button class="btn btn-secondary" @click="listeners.delete">Remove from Gallery</button>
        </div>
        <div class="image-details">
            <section>
                <strong>Custom Attributes</strong>

                <p class="image-title">{{props.image.title}}</p>
                <p class="image-description">{{props.image.description}}</p>

                <div class="mb-4 text-right">
                    <a :href="props.image.detailUrl" target="_blank" class="btn btn-secondary">Edit Attributes</a>
                </div>
            </section>
            <section v-if="!props.image.displayChoices.lenght">
                <div class="mb-2">
                    <strong>Display Options</strong>
                </div>
                <div v-for="(choice, index) in props.image.displayChoices" :key="index">
                    <input v-if="choice.type === 'text'"
                        :placeholder="choice.title"
                        :name="index"
                        class="form-control mb-3"

                    />
                    <select v-if="choice.type === 'select'"
                        :name="index"
                        class="form-control mb-3">
                        <option selected disabled>{{ choice.title }}</option>
                        <option v-for="(option, index ) in choice.options"
                            :key="index"
                            :value="index">
                            {{ option }}
                        </option>
                    </select>
                </div>
            </section>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.ccm-gallery-image-details {
  border-top: 1px solid #979797;
  display: flex;
  padding-top: 20px;

  .image-preview,
  .image-details {
    flex: 1;
    padding: 10px;
  }

  .image-preview {
    img {
      height: auto;
      margin-bottom: 10px;
      width: 100%;
    }
  }

  .image-details {
    section {
      clear: both;
      margin-bottom: 10px;

      p {
        margin: 15px 0 15px 15px;

        &.image-title {
          font-weight: bold;
        }
      }

    }
  }
}
</style>

<script>
export default {
    props: {
        image: {
            type: Object,
            required: true
        }
    }
}
</script>
