<template>
    <div>
        <chooser-header :resultsFormFactor.sync="formFactor"
                        :resultsSearchQuery.sync="searchQuery"
                        :breadcrumb-items="breadcrumbItems"
                        :enable-search="searchChooserIsEnabled"
                        @breadcrumbItemClick="activeFolder = $event.folderId"
                        :title="title"/>

        <files :selectedFiles.sync="selectedFiles"
               :resultsFormFactor="formFactor"
               :routePath="routePath + activeFolder"
               :enable-pagination="true"
               :enable-sort="true"
               :filters="filters"
               :multipleSelection="multipleSelection"
               @folderClick="activeFolder = $event"/>
    </div>
</template>

<script>
/* global CCM_DISPATCHER_FILENAME, ConcreteAjaxRequest */
/* eslint-disable no-new */
import ChooserHeader from './Header'
import Files from './Files'

export default {
    components: {
        ChooserHeader,
        Files
    },
    data: () => ({
        activeFolder: '',
        selectedFiles: [],
        breadcrumbItems: [],
        routePath: '/ccm/system/file/chooser/get_folder_files/',
        formFactor: 'grid',
        searchQuery: ''
    }),
    props: {
        searchChooserIsEnabled: {
            type: Boolean,
            required: false,
            default: true
        },
        resultsFormFactor: {
            type: String,
            required: false,
            default: 'grid', // grid | list
            validator: value => ['grid', 'list'].indexOf(value) !== -1
        },
        startFolder: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
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
        this.activeFolder = this.$props.startFolder
        //this.fetchBreadcrumb(this.activeFolder) // Not sure why this is here, it leads to duplicate requests and I don't think it needs to be
    },
    methods: {
        fetchBreadcrumb(folderId = '') {
            new ConcreteAjaxRequest({
                url: `${CCM_DISPATCHER_FILENAME}/ccm/system/file/chooser/get_breadcrumb/${folderId}`,
                success: r => {
                    this.breadcrumbItems = r.data
                }
            })
        }
    },
    watch: {
        activeFolder(value) {
            this.fetchBreadcrumb(value)
        },
        selectedFiles(value) {
            this.$emit('update:selectedFiles', value)
        },
        formFactor(value) {
            this.$emit('update:resultsFormFactor', value)
        },
        searchQuery(value) {
            this.$emit('update:resultsSearchQuery', value)
        },
        startFolder(value) {
            this.activeFolder = value
            //this.fetchBreadcrumb(value) // Not sure why this is here, it leads to duplicate requests and I don't think it needs to be
        }
    },
    mounted() {
        this.formFactor = this.resultsFormFactor
        this.searchQuery = this.resultsSearchQuery
        this.activeFolder = this.$props.startFolder
        //this.fetchBreadcrumb(this.activeFolder) // Not sure why this is here, it leads to duplicate requests and I don't think it needs to be
    }
}
</script>
