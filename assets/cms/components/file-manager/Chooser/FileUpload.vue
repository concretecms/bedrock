<template>
    <div>
        <chooser-header :show-form-factor-selector="false" :title="title"/>

        <uploader
            :dropzone-options="dropzoneOptions"
            @upload-complete="$emit('upload-complete')"
        />
    </div>
</template>

<script>
/* eslint-disable no-new */
import ChooserHeader from './Header'
import Uploader from '../Uploader'

export default {
    components: {
        ChooserHeader,
        Uploader
    },
    data: () => ({
        selectedFiles: []
    }),
    props: {
        title: {
            type: String,
            required: true
        },
        multipleSelection: {
            type: Boolean,
            default: true
        },
        dropzoneOptions: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        selectedFiles(value) {
            this.$emit('update:selectedFiles', value)
        }
    }
}
</script>
