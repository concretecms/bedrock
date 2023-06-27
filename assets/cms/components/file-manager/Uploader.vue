<template>
    <div>
        <upload-from-computer
            :upload-directory-id="uploadDirectoryId"
            :dropzone-options="dropzoneOptions"
            @upload-complete="$emit('upload-complete')"
            @uploadProgressStateChange="isUploadInProgress = $event"/>

        <concrete-file-directory-input
            :input-label="i18n.uploadFilesTo"
            input-name="uploadDirectoryId"
            :show-add-directory-button="true"
            :disabled="isUploadInProgress"
            @change="uploadDirectoryId = $event"/>
    </div>
</template>

<script>
import UploadFromComputer from './Uploader/UploadFromComputer'
import ConcreteFileDirectoryInput from '../form/ConcreteFileDirectoryInput'

export default {
    components: {
        UploadFromComputer,
        ConcreteFileDirectoryInput
    },
    props: {
        dropzoneOptions: {
            type: Object,
            default: () => ({})
        }
    },
    data: () => ({
        i18n: {
            uploadFilesTo: 'Upload files to'
        },
        uploadDirectoryId: 0,
        isUploadInProgress: false
    }),
    mounted() {
        if (window.ccmi18n_fileuploader) {
            for (const key in this.i18n) {
                if (window.ccmi18n_fileuploader[key]) {
                    this.i18n[key] = window.ccmi18n_fileuploader[key]
                }
            }
        }
    }
}
</script>
