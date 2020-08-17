<template>
    <div>
        <svg v-if="isLoading" class="ccm-loader-dots"><use xlink:href="#icon-loader-circles" /></svg>
        <div v-if="!isLoading">
            <div class="ccm-image-cell-grid container-fluid pl-0" v-if="resultsFormFactor === 'grid'">
                <div v-for="row in rows" class="row text-center" :key="row.index">
                    <div class="col-md-3" v-for="file in row" :key="(file.fID || file.treeNodeID) + 'grid'">
                        <div class="ccm-image-cell" @click="onItemClick(file)">
                            <label :for="'file-' + (file.fID || file.treeNodeID)"><span v-html="file.resultsThumbnailImg"></span></label>
                            <div class="ccm-image-cell-title">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" v-if="!file.isFolder" v-model="selectedFiles" type="checkbox" :id="'file-' + file.fID" :value="file.fID">
                                    <label class="form-check-label" :for="'file-' + (file.fID || file.treeNodeID)">{{file.title}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="resultsFormFactor === 'list'">
                <table class="table ccm-image-chooser-list-view ccm-search-results-table">
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>ID</th>
                        <th :class="getSortColumnClassName('title')"><a href="#" @click.prevent="sortBy('title')">Name</a></th>
                        <th :class="getSortColumnClassName('fvDateAdded')"><a href="#" @click.prevent="sortBy('fvDateAdded')">Uploaded</a></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="file in fileList" :key="(file.fID || file.treeNodeID) + 'list'" @click="onItemClick(file)">
                            <td><input v-if="!file.isFolder" v-model="selectedFiles" type="checkbox" :id="'file-' + file.fID" :value="file.fID"></td>
                            <td class="ccm-image-chooser-icon"><span v-html="file.resultsThumbnailImg" width="32" height="32"></span></td>
                            <td>{{file.fID}}</td>
                            <td>{{file.title}}</td>
                            <td>{{file.fvDateAdded}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination
                v-if="haveToPaginate"
                v-model="currentPage"
                :total-rows="pagination.total"
                :per-page="pagination.per_page"/>
        </div>
    </div>
</template>
<style lang='scss' scoped>
/* stylelint-disable selector-pseudo-element-no-unknown */
@import '../../../../../assets/cms/scss/bootstrap-overrides';

.ccm-image-cell > label::v-deep i {
  color: $gray-400;
  font-size: 100px;
  margin: 2px;
  padding: 0.5rem;
}

.ccm-image-chooser-icon::v-deep i {
  color: $gray-400;
  font-size: 32px;
}
</style>
<script>
/* global CCM_DISPATCHER_FILENAME */
/* eslint-disable no-new */
import Pagination from '../../Pagination'

export default {
    components: {
        Pagination
    },
    data() {
        return {
            currentPage: 1,
            rows: false,
            fileList: [],
            selectedFiles: [],
            sortByColumn: '',
            sortByDirection: 'desc',
            pagination: {
                total: 0,
                count: 0,
                per_page: 10,
                current_page: 1,
                total_pages: 0
            }
        }
    },
    props: {
        enablePagination: {
            type: Boolean,
            required: false,
            default: false
        },
        resultsFormFactor: {
            type: String,
            required: false,
            default: 'grid' // grid | list
        },
        routePath: {
            type: String,
            required: true
        }
    },
    computed: {
        isLoading() {
            return this.rows === false
        },
        fetchRoute() {
            let routePath = CCM_DISPATCHER_FILENAME + this.$props.routePath
            let qs = '?'
            if (this.sortByColumn !== '') {
                routePath += `${qs}ccm_order_by=${this.sortByColumn}&ccm_order_by_direction=${this.sortByDirection}`
                qs = '&'
            }

            if (this.enablePagination) {
                routePath += `${qs}ccm_paging_p=${this.currentPage}&itemsPerPage=${this.pagination.per_page}`
                qs = '&'
            }

            return routePath
        },
        haveToPaginate() {
            return this.pagination.total_pages > 1
        }
    },
    methods: {
        getFiles() {
            const my = this
            my.rows = false
            my.fileList = []

            new ConcreteAjaxRequest({
                url: this.fetchRoute,
                success: function (r) {
                    my.rows = []
                    if (r.data.length) {
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
                }
            })
        },
        sortBy(column) {
            if (column === this.sortByColumn) {
                this.sortByDirection = this.sortByDirection === 'asc' ? 'desc' : 'asc'
            }

            this.sortByColumn = column
        },
        getSortColumnClassName(column) {
            let className = ''
            if (column === this.sortByColumn) {
                className = `ccm-results-list-active-sort-${this.sortByDirection}`
            }

            return className
        },
        onItemClick(file) {
            if (file.isFolder) {
                this.$emit('folderClick', file.treeNodeID)
            } else if (this.resultsFormFactor === 'list') {
                const fileIndex = this.selectedFiles.indexOf(file.fID)
                if (fileIndex === -1) {
                    this.selectedFiles.push(file.fID)
                } else {
                    this.selectedFiles.splice(fileIndex, 1)
                }
            }
        }
    },
    watch: {
        selectedFiles: function(value) {
            this.$emit('update:selectedFiles', value)
        },
        routePath: function() {
            this.getFiles()
        }
    },
    mounted() {
        this.getFiles()
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
