<template>
    <div>
        <div class="container-fluid h-100">
            <div class="row h-100">
                <div class="col-4 border-end p-3">
                    <ul class="nav flex-column">
                        <li class="nav-item" v-for="item in choosers" :key="item.id">
                            <a :class="{'nav-link': true, 'active': activeNavItem.id === item.id}"
                               @click.prevent="activateTab(item)"
                               href="javascript:void(0)">
                                {{item.title}}
                            </a>
                        </li>
                    </ul>
                    <hr>
                    <ul class="nav flex-column">
                        <li class="nav-item" v-for="item in uploaders" :key="item.id">
                            <a :class="{'nav-link': true, 'active': activeNavItem.id === item.id}"
                               @click.prevent="activateTab(item)"
                               href="javascript:void(0)">
                                {{item.title}}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-8 p-3">
                    <transition name="concrete-nav-tab-content-switch">
                        <component :is="activeNavItem.componentKey"
                                   :title="activeNavItem.title"
                                   :id="activeNavItem.id"
                                   :startFolder="activeNavItem.id"
                                   :extraData="activeNavItem.data || {}"
                                   :multipleSelection="multipleSelection"
                                   :selectedFiles.sync="selectedFiles"
                                   :resultsFormFactor.sync="resultsFormFactor"
                                   :filesReadyToUpload.sync="filesReadyToUpload"
                                   :filters="filters"
                                   @upload-complete="activateTabByKey('recent-uploads')"
                                   ref="c"
                        />
                    </transition>
                </div>
            </div>
        </div>
        <div class="dialog-buttons">
            <button class="btn btn-secondary" data-dialog-action="cancel">{{ i18n.cancel }}</button>

            <button type="button" v-show="isImportExternalFilesMode()" @click="importExternalFiles" :disabled="selectedFiles.length === 0" class="btn btn-primary">{{ i18n.import }}</button>
            <button type="button" v-show="isChooseFilesMode()" @click="chooseFiles" :disabled="selectedFiles.length === 0" class="btn btn-primary">{{ i18n.choose }}</button>
            <button type="button" v-show="isAddNewFilesMode()" @click="uploadFiles" :disabled="uploadReady === false" class="btn btn-primary">{{ i18n.upload }}</button>
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
import ExternalFileProvider from './Chooser/ExternalFileProvider'
import FileUpload from './Chooser/FileUpload'
import FolderBookmark from './Chooser/FolderBookmark'

export default {
    components: {
        RecentUploads,
        FileManager,
        FileSets,
        SavedSearch,
        Search,
        ExternalFileProvider,
        FileUpload,
        FolderBookmark
    },
    data() {
        return {
            i18n: {
                cancel: 'Cancel',
                import: 'Import',
                choose: 'Choose',
                upload: 'Upload',
                recentlyUploaded: 'Recently Uploaded',
                fileManager: 'File Manager',
                search: 'Search',
                uploadFiles: 'Upload Files'
            },
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
                    title: null // use the detault one if null
                },
                {
                    key: 'file-manager',
                    title: null // use the detault one if null
                },
                {
                    key: 'search',
                    title: null // use the detault one if null
                }
            ]
        },
        uploaders: {
            type: Array,
            default: [
                {
                    key: 'file-upload',
                    title: null // use the detault one if null
                }
            ]
        },
        multipleSelection: {
            type: Boolean,
            default: true
        },
        filters: {
            type: Array
        }
    },
    created() {
        this.activeNavItem = _.first(this.choosers)
    },
    mounted() {
        var my = this
        if (window.ccmi18n_filemanager) {
            for (const key in my.i18n) {
                if (window.ccmi18n_filemanager[key]) {
                    my.i18n[key] = window.ccmi18n_filemanager[key]
                }
            }
        }
        this.applyLocalization()
        ConcreteEvent.subscribe('FileUploaderFilesReadyToUpload', function(e, filesReadyToUpload) {
            my.filesReadyToUpload = filesReadyToUpload
        })
    },
    watch: {
        choosers() {
            this.applyLocalization()
        },
        uploaders() {
            this.applyLocalization()
        }
    },
    methods: {
        applyLocalization() {
            if (this.choosers) {
                for (const chooser of this.choosers) {
                    if (typeof chooser.title !== 'string') {
                        switch (chooser.key) {
                        case 'recent-uploads':
                            chooser.title = this.i18n.recentlyUploaded
                            break
                        case 'file-manager':
                            chooser.title = this.i18n.fileManager
                            break
                        case 'search':
                            chooser.title = this.i18n.search
                            break
                        }
                    }
                }
            }
            if (this.uploaders) {
                for (const uploader of this.uploaders) {
                    if (typeof uploader.title !== 'string') {
                        switch (uploader.key) {
                        case 'file-upload':
                            uploader.title = this.i18n.uploadFiles
                            break
                        }
                    }
                }
            }
        },
        isImportExternalFilesMode() {
            return this.activeNavItem.componentKey === 'external-file-provider'
        },
        isAddNewFilesMode() {
            return this.activeNavItem.componentKey === 'file-upload'
        },
        isChooseFilesMode() {
            return this.activeNavItem.componentKey !== 'file-upload' && this.activeNavItem.componentKey !== 'external-file-provider'
        },
        activateTabByKey(key) {
            var my = this
            this.choosers.forEach(function(chooser) {
                if (chooser.id === key) {
                    my.activateTab(chooser)
                }
            })
            this.uploaders.forEach(function(uploader) {
                if (uploader.id === key) {
                    my.activateTab(uploader)
                }
            })
        },
        activateTab(item) {
            this.activeNavItem = item

            // Reset Selected Files because the component always rerender after Tab switch
            // Otherwise we have to use keep-alive built-in component [@see https://vuejs.org/v2/api/#keep-alive]
            // to keep selection from different Tabs
            this.selectedFiles = []
        },
        importExternalFiles() {
            if (this.activeNavItem.data.hasCustomImportHandler) {
                ConcreteEvent.publish('ExternalFileProvider.SelectFile', {
                    externalFileProviderTypeHandle: this.activeNavItem.data.typeHandle,
                    externalFileProviderName: this.activeNavItem.data.name,
                    externalFileProviderId: this.activeNavItem.id,
                    externalFileProviderUploadDirectoryId: this.$refs.c.$refs.folderSelector.selectedDirectoryID,
                    selectedFile: {
                        fID: this.selectedFiles[0]
                    }
                })
            } else {
                return new ConcreteAjaxRequest({
                    url: CCM_DISPATCHER_FILENAME + '/ccm/system/file/chooser/external_file_provider/' + this.activeNavItem.id + '/import_file/' + this.selectedFiles[0],
                    data: {
                        uploadDirectoryId: this.$refs.c.$refs.folderSelector.selectedDirectoryID
                    },
                    success: r => {
                        ConcreteEvent.publish('FileManagerSelectFile', {
                            fID: [r.importedFileId]
                        })
                    }
                })
            }
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
