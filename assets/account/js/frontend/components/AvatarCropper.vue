<template>
    <div class="ccm-account-avatar-cropper">
        <div class="card">
            <div class="card-header">{{ lang.header }}</div>
            <div class="card-body">
                <template v-if="image">
                    <cropper
                        ref="cropper"
                        :stencil-props="{
                            handlers: {},
                            resizable: false,
                        }"
                        :stencil-size="stencilSize"
                        :canvas="canvas"
                        image-restriction="stencil"
                        :src="image.src"
                    />
                    <div class="ccm-account-avatar-cropper-controls">
                        <a @click="zoomIn"><svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M8 11h3m3 0h-3m0 0V8m0 3v3M17 17l4 4M3 11a8 8 0 1016 0 8 8 0 00-16 0z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
                        <a @click="zoomOut"><svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M17 17l4 4M3 11a8 8 0 1016 0 8 8 0 00-16 0zM8 11h6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
                    </div>
                    <div class="ccm-account-avatar-cropper-save" v-if="image">
                        <button @click="image = null" class="btn btn-secondary float-start">{{ lang.reset }}</button>
                        <template v-if="saveInProgress">
                            <button class="btn btn-primary float-end" disabled>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                {{ lang.saveInProgress }}
                            </button>
                        </template>
                        <button @click.prevent="saveAvatar" class="btn btn-primary float-end" v-else>{{ lang.save }}</button>
                    </div>
                </template>
                <template v-else>
                    <div :class="{'ccm-account-avatar-cropper-drop': true, 'ccm-account-avatar-crop-drop-hover': isDragging}"
                         @dragover="dragover"
                         @dragleave="dragleave"
                         @drop="drop"
                         @click="$refs.file.click()">
                        <input type="file" ref="file" @change="onChange" accept="image/*">
                    </div>
                    <div class="ccm-account-avatar-cropper-focus">
                        <div class="ccm-account-avatar-cropper-icon">
                            <svg width="100%" height="100%" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 20.4V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6z" stroke="#000000" stroke-width="1.5"></path><path d="M6 18h12M12 14V6m0 0l3.5 3.5M12 6L8.5 9.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </div>
                        <div class="ccm-account-avatar-cropper-text">{{ lang.upload }}</div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
export default {
    components: {
        Cropper
    },
    props: {
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        accessToken: {
            type: String,
            required: true
        },
        lang: {
            type: Object,
            required: true
        },
        uploadUrl: {
            type: String,
            required: true
        },
        reloadOnSave: {
            type: Boolean,
            default: true
        }
    },
    emits: ['save'],
    data: () => ({
        isDragging: false,
        image: null,
        saveInProgress: false
    }),
    computed: {
        stencilSize: function() {
            const stencilSize = {}
            stencilSize.width = this.width
            stencilSize.height = this.height
            return stencilSize
        },
        canvas: function() {
            const canvas = {}
            canvas.maxWidth = this.width
            canvas.maxHeight = this.height
            return canvas
        }
    },
    methods: {
        zoomIn() {
            this.$refs.cropper.zoom(1.2)
        },
        zoomOut() {
            this.$refs.cropper.zoom(0.8)
        },
        dragover(e) {
            e.preventDefault()
            this.isDragging = true
        },
        dragleave() {
            this.isDragging = false
        },
        drop(e) {
            e.preventDefault()
            this.$refs.file.files = e.dataTransfer.files
            this.onChange()
            this.isDragging = false
        },
        onChange() {
            var files = this.$refs.file.files
            if (files && files[0]) {
                if (this.image && this.image.src) {
                    URL.revokeObjectURL(this.image.src)
                }
                const blob = URL.createObjectURL(files[0])
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.image = {
                        src: blob,
                        type: files[0].type
                    }
                }
                reader.readAsArrayBuffer(files[0])
            }
        },
        saveAvatar() {
            this.saveInProgress = true
            const { canvas } = this.$refs.cropper.getResult()
            if (canvas) {
                const form = new FormData()
                form.append('ccm_token', this.accessToken)
                canvas.toBlob(blob => {
                    form.append('file', blob)
                    // You can use axios, superagent and other libraries instead here
                    fetch(this.uploadUrl, {
                        method: 'POST',
                        body: form
                    }).then(() => {
                        if (this.reloadOnSave) {
                            window.location.reload()
                        } else {
                            this.$emit('save', blob)
                            this.saveInProgress = false
                        }
                    })
                })
            }
        }
    },
    mounted() {
    }
}
</script>
