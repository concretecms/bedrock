<template>
    <div>
        <div class="container-fluid h-100">
            <div class="row h-100">
                <div class="col-4 border-right p-3">
                    <ul class="nav flex-column">
                        <li class="nav-item" v-for="item in choosers" :key="item.key">
                            <a :class="{'nav-link': true, 'active': activeNavItem.key === item.key}"
                               @click.prevent="activateTab(item)"
                               href="javascript:void(0)">
                                {{item.title}}
                            </a>
                        </li>
                    </ul>
                    <hr>
                    <ul class="nav flex-column">
                        <li class="nav-item" v-for="item in uploaders" :key="item.key">
                            <a :class="{'nav-link': true, 'active': activeNavItem.key === item.key}"
                               @click.prevent="activateTab(item)"
                               href="javascript:void(0)">
                                {{item.title}}
                            </a>
                        </li>
                    </ul>
                </div>
                <hr>
                <div class="col-8 p-3">
                    <transition name="concrete-nav-tab-content-switch">
                        <component :is="activeNavItem.key"
                                   :title="activeNavItem.title"
                                   :multipleSelection="multipleSelection"
                                   :selectedFiles.sync="selectedFiles"
                                   :resultsFormFactor.sync="resultsFormFactor"
                                   :filesReadyToUpload.sync="filesReadyToUpload"
                        />
                    </transition>
                </div>
            </div>
        </div>
        <div class="dialog-buttons">
            <button class="btn btn-secondary" data-dialog-action="cancel">Cancel</button>
            <button type="button" v-show="!isAddNewFilesMode()" @click="chooseFiles" :disabled="selectedFiles.length === 0" class="btn btn-primary">Choose</button>
            <button type="button" v-show="isAddNewFilesMode()" @click="uploadFiles" :disabled="uploadReady === false" class="btn btn-primary">Upload</button>
        </div>
    </div>
</template>

<script>
/* global ConcreteEvent */
import RecentUploads from './Chooser/RecentUploads'
import FileManager from './Chooser/FileManager'
import FileSets from './Chooser/FileSets'
import SavedSearch from './Chooser/SavedSearch'
import Search from './Chooser/Search'
import FileUpload from './Chooser/FileUpload'

export default {
    components: {
        RecentUploads,
        FileManager,
        FileSets,
        SavedSearch,
        Search,
        FileUpload
    },
    data() {
        return {
            filesReadyToUpload: 0,
            activeNavItem: null,
            resultsFormFactor: 'grid',
            selectedFiles: []
        }
    },
    computed: {
        uploadReady() {
            return this.filesReadyToUpload > 0
        }
    },
    props: {
        choosers: {
            type: Array,
            default: [
                {
                    key: 'recent-uploads',
                    title: 'Recently Uploaded'
                },
                {
                    key: 'file-manager',
                    title: 'File Manager'
                },
                {
                    key: 'search',
                    title: 'Search'
                }
            ]
        },
        uploaders: {
            type: Array,
            default: [
                {
                    key: 'file-upload',
                    title: 'Upload Files'
                }
            ]
        },
        multipleSelection: {
            type: Boolean,
            default: true
        }
    },
    created() {
        this.activeNavItem = _.first(this.choosers)
    },
    mounted() {
        var my = this
        ConcreteEvent.subscribe('FileUploaderFilesReadyToUpload', function(e, filesReadyToUpload) {
            my.filesReadyToUpload = filesReadyToUpload
        })
    },
    methods: {
        isAddNewFilesMode() {
            return this.activeNavItem.key === 'file-upload'
        },
        activateTab(item) {
            this.activeNavItem = item

            // Reset Selected Files because the component always rerender after Tab switch
            // Otherwise we have to use keep-alive built-in component [@see https://vuejs.org/v2/api/#keep-alive]
            // to keep selection from different Tabs
            this.selectedFiles = []
        },
        chooseFiles() {
            ConcreteEvent.publish('FileManagerSelectFile', { fID: this.selectedFiles })
        },
        uploadFiles() {
            ConcreteEvent.publish('FileUploaderUploadSelectedFiles')
        }
    }
}
</script>
