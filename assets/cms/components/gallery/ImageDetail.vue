<template>
    <div class="ccm-gallery-image-details">
        <div class="image-preview text-center">
            <img :src="this.$props.image.imageUrl" />
            <IconButton
              icon="trash-alt"
              icon-type="far"
              @click="$emit('delete')"
              type="outline"
            >
              Remove from Gallery
            </IconButton>
            <!-- <button type="button" class="btn btn-secondary" @click="$emit('delete')">Remove from Gallery</button> -->
        </div>
        <div class="image-details">
            <section>
                <strong>Custom Attributes</strong>

                <p class="image-title">{{this.$props.image.title}}</p>
                <p class="image-description">{{this.$props.image.description}}</p>

                <div class="mb-4 text-right">
                    <IconButton
                      icon="pencil-alt"
                      icon-type="fas"
                      @click="goToDetails($props.image.detailUrl)"
                      type="outline"
                    >
                      Edit Attributes
                    </IconButton>
                </div>
            </section>

            <section v-if="!this.$props.image.displayChoices.length">
                <div class="mb-2">
                    <strong>Display Options</strong>
                </div>
                <div v-for="(choice, index) in this.$props.image.displayChoices" :key="index">
                    <input v-if="choice.type === 'text'"
                        :placeholder="choice.title"
                        :name="index"
                        class="form-control mb-3"
                        v-model="choice.value"
                    />
                    <select v-if="choice.type === 'select'"
                        :name="index"
                        v-model="choice.value"
                        class="form-control mb-3">
                        <option selected disabled value="0">{{ choice.title }}</option>
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
      height: 270px;
      margin-bottom: 10px;
      width: auto;
    }
  }

  .image-details {
    section {
      clear: both;
      margin-bottom: 10px;

      p {
        color: #005164;
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
import IconButton from '../IconButton'

export default {
    components: {
        IconButton,
        ...IconButton.components
    },
    props: {
        image: {
            type: Object,
            required: true
        }
    },
    methods: {
        goToDetails: (url) => {
            window.open(url, '_blank')
        }
    }
}
</script>
