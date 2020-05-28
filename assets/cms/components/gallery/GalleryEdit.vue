<template>
    <div class="ccm-gallery-edit">

        <ul id="galleryBlock" class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link"
                    :class="activeTab === 'image' ? 'active' : ''"
                    @click="openTab('image')">
                    Images
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link"
                    @click="openTab('design')"
                    :class="activeTab === 'design' ? 'active' : ''">
                    Design
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link"
                    @click="openTab('settings')"
                    :class="activeTab === 'settings' ? 'active' : ''">
                    Settings
                </a>
            </li>
        </ul>

        <div class="tab-content" id="galleryBlockContent">
            <div v-if="activeTab === 'image'"  id="galleryImages">
                <div class="text-right mt-4">
                    <button class="btn btn-secondary" @click="addImage()">Add Images</button>
                </div>
                <div class="image-container mt-4"
                    ref="imageContainer"
                    :class="Object.keys(this.activeImage).length != 0 ? 'active-image':''">
                    <ImageCell v-for="(image, index) in $props.gallery" :key="index"
                        :src="image.thumbUrl"
                        :file-size="image.fileSize"
                        size="120"
                        :isActive="activeImage.id === image.id ? true : false"
                        @click="openImage(image, $event)"
                        @delete="deleteImage(image)"
                        />
                </div>

                <div v-if="Object.keys(activeImage).length != 0">
                    <ImageDetail @delete="deleteImage(activeImage)" :image="activeImage"/>
                </div>
            </div>
            <div v-if="activeTab === 'design'"  id="galleryDesign">
                Design Content
            </div>
            <div v-if="activeTab === 'settings'"  id="gallerySettings">
                Settings Content
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ccm-gallery-edit {
  .nav {
    .nav-tab {
      display: flex;
    }

    .nav-item {
      flex: 1;
      text-align: center;

      .nav-link {
        border-color: #f4f4f4;

        &.active {
          border-color: #4a90e2;

          &:hover {
            border-color: #4a90e2;
          }
        }

        &:hover {
          border-color: #ccc;
        }
      }
    }
  }

  .image-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    overflow-y: auto;

    &.active-image {
      height: 200px;
    }

    .ccm-image-cell {
      margin: 10px 15px;
      position: relative;
    }
  }
}
</style>

<script>
import ImageCell from './ImageCell'
import ImageDetail from './ImageDetail'

export default {
    components: {
        ImageCell,
        ImageDetail,
        ...ImageCell.components,
        ...ImageDetail.components
    },
    data: () => ({
        activeTab: 'image',
        activeImage: {}
    }),
    methods: {
        openTab(tab) {
            this.activeTab = tab
        },
        openImage(image, event) {
            if (Object.keys(this.activeImage).length !== 0 && this.activeImage === image) {
                this.closeImage()
            } else {
                this.activeImage = image
                this.$nextTick(() => {
                    const container = this.$refs.imageContainer
                    container.scrollTop = event.target.offsetParent.offsetTop - 170
                })
            }
        },
        closeImage() {
            this.activeImage = {}
        },
        deleteImage(image) {
            if (confirm('Really delete this image?')) {
                if (this.activeImage === image) {
                    this.closeImage()
                }

                const index = this.gallery.indexOf(image)
                this.gallery.splice(index, 1)
            }
        },
        addImage() {
            console.log('Add Image')
        }
    },
    props: {
        gallery: {
            type: Array,
            required: true
        }
    }
}
</script>
