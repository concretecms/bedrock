<template>
    <div class="ccm-gallery-edit">
        <input type="hidden" name="field_json" :value="JSON.stringify($props.gallery)" />
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
                    <icon-button icon="plus" icon-type="fas" type="outline" class="btn btn-secondary" @click="addImage()">
                        Add Images
                    </icon-button>
                </div>
                <div class="image-container mt-4"
                    ref="imageContainer"
                    :class="activeImage !== null ? 'active-image' : ''">
                    <div ref="cell" class="ccm-image-cell-container" v-for="(image, index) in $props.gallery" :key="index">
                        <ImageCell
                            :src="image.thumbUrl"
                            :file-size="image.fileSize"
                            size="120"
                            :isActive="activeImage === index ? true : false"
                            @click="openImage(image, index, $event)"
                            @delete="deleteImage(index)"
                            />
                    </div>
                </div>

                <div v-if="activeImage !== null">
                    <ImageDetail @delete="deleteImage(activeImage)" :image="this.gallery[activeImage]" />
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
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    overflow-y: auto;
    position: relative;

    &.active-image {
      height: 200px;
    }

    .ccm-image-cell-container {
      min-width: 130px;
      position: relative;
      width: 20%;
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
        activeImage: null
    }),
    methods: {
        openTab(tab) {
            this.activeTab = tab
        },
        openImage(image, index, event) {
            if (this.activeImage && this.activeImage === index) {
                this.closeImage()
            } else {
                this.activeImage = index
                this.$nextTick(() => {
                    const container = this.$refs.imageContainer
                    container.scrollTop = this.$refs.cell[index].offsetTop
                })
            }
        },
        closeImage() {
            this.activeImage = null
        },
        deleteImage(index) {
            if (this.activeImage === index) {
                this.closeImage()
            }

            this.gallery.splice(index, 1)
        },
        addImage() {
            const me = this

            ConcreteFileManager.launchDialog(function(data) {
                ConcreteFileManager.getFileDetails(data.fID, function(file) {
                    file = file.files[0] || {}
                    me.gallery.push({
                        id: data.fID,
                        title: file.title,
                        description: file.description,
                        src: file.url,
                        attributes: [],
                        imageUrl: file.url,
                        thumbUrl: file.url,
                        displayChoices: JSON.parse(JSON.stringify(me.choices)),
                        fileSize: file.fileSize || '-',
                        detailUrl: file.urlDetail
                    })

                    const lastIndex = me.gallery.length - 1
                    me.openImage(me.gallery[lastIndex], lastIndex)
                })
            })
        }
    },
    props: {
        gallery: {
            type: Array,
            required: true
        },
        choices: {
            type: Object,
            required: true
        }
    }
}
</script>
