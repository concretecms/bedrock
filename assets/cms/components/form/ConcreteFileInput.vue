<template>
    <div class="ccm-file-selector">
        <input type="hidden" :name="inputName" :value="selectedFileID" />

        <div class="ccm-file-selector-choose" v-if="!selectedFile && !isLoading">
            <button type="button" @click="isChooserOpen = true" class="btn btn-secondary">
                {{chooseText}}
            </button>
        </div>

        <div v-if="isLoading">
            <div class="btn-group">
                <div class="btn btn-secondary"><svg class="ccm-loader-dots"><use xlink:href="#icon-loader-circles" /></svg></div>
                <button type="button" @click="selectedFileID = null" class="ccm-file-selector-reset btn btn-secondary">
                    <i class="fa fa-times-circle"></i>
                </button>
            </div>
        </div>

        <div class="ccm-file-selector-loaded" v-if="selectedFile !== null">
            <div class="btn-group">
                <a :href="selectedFile.urlDetail" target="_blank" class="btn btn-secondary">
                    <span v-html="selectedFile.resultsThumbnailImg"></span>
                    <span class="ccm-file-selector-title">{{selectedFile.title}}</span>
                </a>
                <button type="button" @click="selectedFileID = null" class="ccm-file-selector-reset btn btn-secondary">
                    <i class="fa fa-times-circle"></i>
                </button>
            </div>
        </div>

        <concrete-file-chooser
                v-if="isChooserOpen"
                @onChooserClose="isChooserOpen = false"
                v-on:choose-files="chooseFile"
        ></concrete-file-chooser>


    </div>
</template>

<script>
import ConcreteFileChooser from '../file-manager/Chooser'
export default {
    components: {
        ConcreteFileChooser
    },
    data() {
        return {
            isLoading: false,
            isChooserOpen: false,
            selectedFile: null /* json object */,
            selectedFileID: 0 /* integer */
        }
    },
    props: {
        inputName: {
            type: String,
            required: true
        },
        fileId: {
            type: Number
        },
        chooseText: {
            type: String
        },
    },
    watch: {
        selectedFileID: {
            immediate: true,
            handler(value) {
                if (value > 0) {
                    this.loadFile(value);
                } else {
                    this.selectedFile = null
                }
            }
        }
    },
    mounted() {
        if (this.fileId) {
            this.selectedFileID = this.fileId
        }
    },
    methods: {
        chooseFile: function(selectedFiles) {
            this.selectedFileID = selectedFiles[0]
        },
        loadFile(fileId) {
            var my = this
            my.isLoading = true
            ConcreteFileManager.getFileDetails(fileId, function (r) {
                my.selectedFile = r.files[0]
                my.isLoading = false
            })
        }

    }
}
</script>
