<template>
    <div>
    <div class="container-fluid h-100">
        <div class="row h-100">
            <div class="col-4 border-right p-3">
                <ul class="nav flex-column">
                    <li class="nav-item" v-for="item in chooserNavItems" :key="item.key">
                        <hr v-if="item.key === 'horizontalrule'"/>
                        <a v-if="item.key !== 'horizontalrule'"
                           :class="{'nav-link': true, 'active': activeNavItem === item.key}"
                           @click="activeNavItem = item.key"
                           href="javascript:void(0)">
                            {{item.title}}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-8 p-3">

                <transition name="concrete-nav-tab-content-switch">
                    <div key="recent" v-if="activeNavItem === 'recent'">
                        <chooser-header v-bind:resultsFormFactor.sync="resultsFormFactor"
                                        title="Recently Uploaded"></chooser-header>
                        <recent-files v-bind:selectedFiles.sync="selectedFiles"
                                      v-bind:resultsFormFactor.sync="resultsFormFactor"
                                      v-if="activeNavItem === 'recent'" />
                    </div>

                    <div key="filemanager" v-if="activeNavItem === 'filemanager'">
                        <chooser-header v-bind:resultsFormFactor.sync="resultsFormFactor"
                                        title="File Manager"></chooser-header>
                        Coming Soon
                    </div>
                    <div key="sets" v-if="activeNavItem === 'sets'">
                        <chooser-header v-bind:resultsFormFactor.sync="resultsFormFactor"
                                        title="File Sets"></chooser-header>
                        Coming Soon
                    </div>
                    <div key="presets" v-if="activeNavItem === 'presets'">
                        <chooser-header v-bind:resultsFormFactor.sync="resultsFormFactor"
                                        title="Saved Searches"></chooser-header>
                        Coming Soon
                    </div>
                    <div key="search" v-if="activeNavItem === 'search'">
                        <chooser-header v-bind:resultsFormFactor.sync="resultsFormFactor"
                                        title="Search"></chooser-header>
                        Coming Soon
                    </div>
                    <div key="upload" v-if="activeNavItem === 'upload'">
                        <chooser-header title="File Manager" :showListSelector="false"></chooser-header>
                        Coming Soon
                    </div>

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
import ChooserHeader from './Chooser/Header'
import RecentFiles from './Chooser/RecentFiles'
export default {
    components: {
        ChooserHeader,
        RecentFiles
    },
    props: {
    },
    data() {
        return {
            activeNavItem: 'recent',
            resultsFormFactor: 'grid',
            selectedFiles: [],
            chooserNavItems: [
                {
                    key: 'recent',
                    title: 'Recently Uploaded'
                },
                {
                    key: 'filemanager',
                    title: 'File Manager'
                },
                {
                    key: 'sets',
                    title: 'Sets'
                },
                {
                    key: 'presets',
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
                    key: 'upload',
                    title: 'Upload Files'
                }
            ]
        }
    },
    methods: {
        chooseFiles() {
            var my = this
            window.ConcreteEvent.publish('FileManagerSelectFile', { fID: my.selectedFiles })
        }
    }
}
</script>
