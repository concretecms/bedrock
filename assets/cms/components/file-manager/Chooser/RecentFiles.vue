<template>
    <div>
        <svg v-if="isLoading" class="ccm-loader-dots"><use xlink:href="#icon-loader-circles" /></svg>
        <div v-if="!isLoading">
            <div class="ccm-image-cell-grid container-fluid pl-0" v-if="resultsFormFactor === 'grid'">
                <div v-for="row in rows" class="row text-center">
                    <div class="col-md-3" v-for="file in row" :key="file.fID + 'grid'">
                        <div class="ccm-image-cell">
                            <label :for="'file-' + file.fID"><span v-html="file.resultsThumbnailImg"></span></label>
                            <div class="ccm-image-cell-title">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" v-model="selectedFiles" type="checkbox" :id="'file-' + file.fID" :value="file.fID">
                                    <label class="form-check-label" :for="'file-' + file.fID">{{file.title}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="resultsFormFactor === 'list'">
                <table class="table ccm-image-chooser-list-view">
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Uploaded</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="file in fileList" :key="file.fID + 'list'">
                            <td><input v-model="selectedFiles" type="checkbox" :id="'file-' + file.fID" :value="file.fID"></td>
                            <td><span v-html="file.resultsThumbnailImg" width="32" height="32"></span></td>
                            <td>{{file.fID}}</td>
                            <td>{{file.title}}</td>
                            <td>{{file.fvDateAdded}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
export default {
    data() {
        return {
            rows: false,
            fileList: [],
            selectedFiles: []
        }
    },
    props: {
        resultsFormFactor: {
            type: String,
            required: false,
            default: 'grid' // grid | list
        }
    },
    computed: {
        isLoading() {
            return this.rows === false
        }
    },
    watch: {
        selectedFiles: function(value) {
            this.$emit('update:selectedFiles', value)
        }
    },
    mounted() {
        var my = this
        new ConcreteAjaxRequest({
            url: CCM_DISPATCHER_FILENAME + '/ccm/system/file/chooser/recent',
            success: function (r) {
                my.rows = []
                my.fileList = r.data
                let currentRow = []
                r.data.forEach(function(image, i) {
                    currentRow.push(image)
                    if ((i + 1) % 4 === 0) {
                        my.rows.push(currentRow)
                        currentRow = []
                    }
                })
                if (currentRow.length) {
                    my.rows.push(currentRow)
                }
            }
        })
    }
}
</script>

<style lang="scss" scoped>
  button {
    .label {
      margin: 0 10px;
    }
  }
</style>
