<template>
    <div class="ccm-file-selector">
        <input type="hidden" :name="inputName" :value="fileId" />

        <div class="ccm-file-selector-choose" v-if="!selectedFile && !isLoading">
            <button type="button" @click="isChooserOpen = true" class="btn btn-secondary">
                {{chooseText}}
            </button>
        </div>

        <div class="ccm-file-selector-loading" v-if="isLoading">
            <div class="btn-group">
                <div class="btn btn-secondary"><svg><use xlink:href="#icon-loader-circles" /></svg></div>
                <button type="button" @click="selectedFile = null" class="ccm-file-selector-reset btn btn-secondary">
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
                <button type="button" @click="selectedFile = null" class="ccm-file-selector-reset btn btn-secondary">
                    <i class="fa fa-times-circle"></i>
                </button>
            </div>
        </div>

        <concrete-file-chooser @onChooserClose="isChooserOpen = false"
                               :is-open="isChooserOpen"></concrete-file-chooser>


    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            file: null,
            isChooserOpen: false,
            selectedFile: null
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
        fileId: {
            immediate: true,
            handler(value) {
                if (value > 0) {
                    this.loadFile(value);
                } else {
                    this.file = null;
                }
            }
        }
    },
    methods: {
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
