<template>
    <div>
        <chooser-header :resultsFormFactor.sync="resultsFormFactor"
                        :breadcrumb-items="breadcrumbItems"
                        @breadcrumbItemClick="activeFolder = $event.folderId"
                        title="File Manager"/>

        <files :selectedFiles.sync="selectedFiles"
               :resultsFormFactor="resultsFormFactor"
               :routePath="routePath + activeFolder"
               :enable-pagination="true"
               @folderClick="activeFolder = $event"/>
    </div>
</template>

<script>
/* global CCM_DISPATCHER_FILENAME */
/* eslint-disable no-new */
import ChooserHeader from '../Chooser/Header'
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
        routePath: '/ccm/system/file/chooser/get_folder_files/'
    }),
    props: {
        resultsFormFactor: {
            type: String,
            required: false,
            default: 'grid', // grid | list
            validator: value => ['grid', 'list'].indexOf(value) !== -1
        },
    },
    created() {
        this.fetchBreadcrumb(this.activeFolder)
    },
    methods: {
        fetchBreadcrumb(folderId = '') {
            new ConcreteAjaxRequest({
                url: `${CCM_DISPATCHER_FILENAME}/ccm/system/file/chooser/get_breadcrumb/${folderId}`,
                success: (r) => {
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
        resultsFormFactor(value) {
            this.$emit('update:resultsFormFactor', value)
        }
    }
}
</script>
