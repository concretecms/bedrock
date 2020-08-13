<template>
    <div>
        <div class="form-inline">
            <div class="form-group ml-auto">
                <label class="mr-2">File Set</label>
                <select class="form-control file-set-menu" v-model="activeSet">
                    <option value="" selected>Select a Set</option>
                    <option v-for="set in sets" :key="set.id" :value="set.id">
                        {{set.name}}
                    </option>
                </select>
            </div>
        </div>
        <div class="mt-3" v-show="this.activeSet">
            <files v-if="this.activeSet"
                :selectedFiles.sync="selectedFiles"
                :resultsFormFactor="this.$props.resultsFormFactor"
                :routePath="this.routePath + this.activeSet"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.file-set-menu {
  width: 300px !important;
}
</style>

<script>
/* eslint-disable no-new */
import Files from './Files'

export default {
    components: {
        Files
    },
    data: () => ({
        sets: [],
        activeSet: '',
        selectedFiles: [],
        routePath: '/ccm/system/file/chooser/get_file_set/'
    }),
    props: {
        resultsFormFactor: {
            type: String,
            required: false,
            default: 'grid' // grid | list
        }
    },
    methods: {
        getSets() {
            new ConcreteAjaxRequest({
                url: CCM_DISPATCHER_FILENAME + '/ccm/system/file/chooser/get_file_sets',
                success: (e) => {
                    this.sets = e
                }
            })
        }
    },
    watch: {
        selectedFiles: function(value) {
            this.$emit('update:selectedFiles', value)
        }
    },
    mounted() {
        this.getSets()
    }
}
</script>
