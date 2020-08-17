<template>
    <div>
        <chooser-header :resultsFormFactor.sync="resultsFormFactor"
                        :breadcrumb-items="breadcrumbItems"
                        @breadcrumbItemClick="activeFolder = $event.folderId"
                        title="Saved Searches"/>

        <div class="form-inline">
            <div class="form-group ml-auto">
                <label class="mr-2">Search Presets</label>
                <select class="form-control search-presets-menu" v-model="activeSearchPreset">
                    <option value="" selected>Select a Preset</option>
                    <option v-for="searchPreset in searchPresets" :key="searchPreset.id" :value="searchPreset.id">
                        {{searchPreset.presetName}}
                    </option>
                </select>
            </div>
        </div>
        <div class="mt-3" v-show="activeSearchPreset">
            <files v-if="activeSearchPreset"
                :selectedFiles.sync="selectedFiles"
                :resultsFormFactor="resultsFormFactor"
                :routePath="routePath + activeSearchPreset"
                @folderClick="activeFolder = $event"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.search-presets-menu {
  width: 300px !important;
}
</style>

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
        searchPresets: [],
        activeSearchPreset: '',
        selectedFiles: [],
        breadcrumbItems: [],
        routePath: '/ccm/system/file/chooser/get_search_preset/'
    }),
    props: {
        resultsFormFactor: {
            type: String,
            required: false,
            default: 'grid' // grid | list
        }
    },
    methods: {
        fetchSearchPresets() {
            new ConcreteAjaxRequest({
                url: `${CCM_DISPATCHER_FILENAME}/ccm/system/file/chooser/get_search_presets`,
                success: (r) => {
                    this.searchPresets = r
                }
            })
        }
    },
    watch: {
        selectedFiles(value) {
            this.$emit('update:selectedFiles', value)
        },
        resultsFormFactor(value) {
            this.$emit('update:resultsFormFactor', value)
        }
    },
    mounted() {
        this.fetchSearchPresets()
    }
}
</script>
