<template>
    <div class="ccm-image-thumbnail-editor">
        <cropper
            ref="cropper"
            class="ccm-image-thumbnail-editor-cropper"
            :stencil-props="{
                handlers: {},
                movable: true,
                resizable: false
            }"
            :stencil-size="stencilSize"
            :canvas="canvas"
            :resize-image="{
                adjustStencil: false
            }"
            image-restriction="fit-area"
            :src="src"
        />
        <div class="ccm-image-thumbnail-editor-controls">
            <a @click="zoomIn"><svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M8 11h3m3 0h-3m0 0V8m0 3v3M17 17l4 4M3 11a8 8 0 1016 0 8 8 0 00-16 0z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
            <a @click="zoomOut"><svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M17 17l4 4M3 11a8 8 0 1016 0 8 8 0 00-16 0zM8 11h6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
        </div>
        <div class="ccm-image-thumbnail-editor-save">
            <button @click="save" class="btn btn-primary float-end">{{ lang.save }}</button>
        </div>
    </div>
</template>
<script>
/* eslint-disable no-new */
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
        src: {
            type: String,
            required: true
        },
        uploadUrl: {
            type: String,
            required: true
        }
    },
    data: () => ({
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
        save() {
            var my = this
            this.saveInProgress = true
            const { canvas } = this.$refs.cropper.getResult()
            if (canvas) {
                const form = new FormData()
                form.append('ccm_token', this.accessToken)
                canvas.toBlob(blob => {
                    form.append('file', blob)
                    new ConcreteAjaxRequest({
                        url: my.uploadUrl,
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        data: form,
                        success: function(r) {
                            jQuery.fn.dialog.closeTop()
                            ConcreteAlert.notify({
                                message: ccmi18n_filemanager.thumbnailImageSaved,
                                title: ccmi18n_filemanager.thumbnailImages
                            })
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
