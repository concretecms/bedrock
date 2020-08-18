<template>
    <div>
        <div class="container-fluid h-100">
            <div class="row h-100">
                <div class="col-4 border-right p-3">
                    <ul class="nav flex-column">
                        <li class="nav-item" v-for="item in chooserNavItems" :key="item.key">
                            <hr v-if="item.key === 'horizontalrule'"/>
                            <a v-else :class="{'nav-link': true, 'active': activeNavItem.key === item.key}"
                               @click.prevent="activeNavItem = item"
                               href="javascript:void(0)">
                                {{item.title}}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-8 p-3">
                    <transition name="concrete-nav-tab-content-switch">
                        <component :is="activeNavItem.key"
                                   :title="activeNavItem.title"
                                   :selectedFiles.sync="selectedFiles"
                                   :resultsFormFactor.sync="resultsFormFactor"
                        />
                    </transition>
                </div>
            </div>
        </div>
        <div class="dialog-buttons">
            <button class="btn btn-secondary" data-dialog-action="cancel">Cancel</button>
            <button type="button" @click="chooseFiles" :disabled="selectedFiles.length === 0" class="btn btn-primary">Choose</button>
        </div>
    </div>
</template>

<script>
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
            activeNavItem: null,
            resultsFormFactor: 'grid',
            selectedFiles: [],
            chooserNavItems: [
                {
                    key: 'recent-uploads',
                    title: 'Recently Uploaded'
                },
                {
                    key: 'file-manager',
                    title: 'File Manager'
                },
                {
                    key: 'file-sets',
                    title: 'File Sets'
                },
                {
                    key: 'saved-search',
                    title: 'Saved Searches'
                },
                {
                    key: 'search',
                    title: 'Search'
                },
                {
                    key: 'horizontalrule'
                },
                {
                    key: 'file-upload',
                    title: 'Upload Files'
                }
            ],
            breadcrumbItems: []
        }
    },
    created() {
        this.activeNavItem = _.first(this.chooserNavItems)
    },
    methods: {
        chooseFiles() {
            const my = this
            window.ConcreteEvent.publish('FileManagerSelectFile', { fID: my.selectedFiles })
        }
    }
}
</script>
