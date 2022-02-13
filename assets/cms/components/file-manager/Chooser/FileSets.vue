<template>
    <div>
        <chooser-header :resultsFormFactor.sync="formFactor" :title="title"/>

        <div class="form-group row row-cols-auto g-0 align-items-center justify-content-end">
            <div class="col-auto">
                <label for="fileSetSelector" class="me-2">{{ i18n.fileSet }}</label>
            </div>
            <div class="col-auto">
                <select id="fileSetSelector" class="form-select file-set-menu" v-model="activeSet">
                    <option value="" selected>{{ i18n.selectFileSet }}</option>
                    <option v-for="set in sets" :key="set.id" :value="set.id">
                        {{ set.name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="mt-3" v-show="activeSet">
            <files v-if="activeSet"
                   key-prefix="file-sets"
                   :selectedFiles.sync="selectedFiles"
                   :resultsFormFactor="formFactor"
                   :routePath="routePath + activeSet"
                   :enable-pagination="true"
                   :enable-sort="true"
                   :filters="filters"
                   :multipleSelection="multipleSelection"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.file-set-menu {
  width: 300px !important;
}
</style>

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
        i18n: {
            fileSet: 'File Set',
            selectFileSet: 'Select a Set'
        },
        sets: [],
        activeSet: '',
        selectedFiles: [],
        routePath: '/ccm/system/file/chooser/get_file_set/',
        formFactor: 'grid'
    }),
    props: {
        resultsFormFactor: {
            type: String,
            required: false,
            default: 'grid', // grid | list
            validator: value => ['grid', 'list'].indexOf(value) !== -1
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
    methods: {
        getSets() {
            new ConcreteAjaxRequest({
                url: `${CCM_DISPATCHER_FILENAME}/ccm/system/file/chooser/get_file_sets`,
                success: r => {
                    this.sets = r
                }
            })
        }
    },
    watch: {
        selectedFiles(value) {
            this.$emit('update:selectedFiles', value)
        },
        formFactor(value) {
            this.$emit('update:resultsFormFactor', value)
        }
    },
    mounted() {
        if (window.ccmi18n_filemanager) {
            for (const key in this.i18n) {
                if (window.ccmi18n_filemanager[key]) {
                    this.i18n[key] = window.ccmi18n_filemanager[key]
                }
            }
        }
        this.formFactor = this.resultsFormFactor

        this.getSets()
    }
}
</script>
