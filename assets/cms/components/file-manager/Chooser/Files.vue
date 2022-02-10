<template>
    <div>
        <svg v-if="isLoading" class="ccm-loader-dots"><use xlink:href="#icon-loader-circles" /></svg>
        <div v-if="!isLoading">
            <div class="ccm-image-cell-grid container-fluid ps-0" v-if="resultsFormFactor === 'grid'">
                <div v-for="row in rows" class="row text-center" :key="row.index">
                    <div class="col-md-3" v-for="file in row" :key="(file.fID || file.treeNodeID) + 'grid'">
                        <div class="ccm-image-cell" @click="onItemClick(file)">
                            <label class="form-label" :data-bs-content="getGridHoverContent(file)" :for="'file-' + (file.fID || file.treeNodeID)"><span v-html="file.resultsThumbnailImg"></span></label>
                            <div class="ccm-image-cell-title pt-1">
                                <div class="form-check form-check-inline">
                                    <input :disabled="!canChooseFile(file)" class="form-check-input" type="checkbox" v-if="multipleSelection && !file.isFolder" v-model="selectedFiles" :id="'file-' + file.fID" :value="file.fID">
                                    <input :disabled="!canChooseFile(file)" class="form-check-input" type="radio" v-if="!multipleSelection && !file.isFolder" v-model="selectedFiles" :id="'file-' + file.fID" :value="file.fID">
                                    <label class="form-check-label" :for="'file-' + (file.fID || file.treeNodeID)">{{file.title}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="resultsFormFactor === 'list'">
                <table class="table align-middle ccm-image-chooser-list-view ccm-search-results-table">
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>{{ i18n.id }}</th>
                        <th :class="getSortColumnClassName('fv.fvTitle')">
                            <a v-if="enableSort" href="#" @click.prevent="sortBy('fv.fvTitle')">{{ i18n.name }}</a>
                            <span v-else>{{ i18n.name }}</span>
                        </th>
                        <th :class="getSortColumnClassName(dateSortColumn)">
                            <a v-if="enableSort" href="#" @click.prevent="sortBy(dateSortColumn)">{{ i18n.uploaded }}</a>
                            <span v-else>{{ i18n.uploaded }}</span>
                        </th>
                        <th>{{ i18n.size }}</th>
                        <th>{{ i18n.width }}</th>
                        <th>{{ i18n.height }}</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="file in fileList" :key="(file.fID || file.treeNodeID) + 'list'" @click="onItemClick(file)">
                            <td>
                                <input type="checkbox" :disabled="!canChooseFile(file)" v-if="multipleSelection && !file.isFolder" v-model="selectedFiles" :id="'file-' + file.fID" :value="file.fID">
                                <input type="radio" :disabled="!canChooseFile(file)" v-if="!multipleSelection && !file.isFolder" v-model="selectedFiles" :id="'file-' + file.fID" :value="file.fID">
                            </td>
                            <td class="ccm-image-chooser-icon"><div :data-bs-content="getListHoverContent(file)"><span v-html="file.resultsThumbnailImg" width="32" height="32"></span></div></td>
                            <td>{{file.fID}}</td>
                            <td>{{file.title}}</td>
                            <td>{{file.fvDateAdded}}</td>
                            <td>{{file.size}}</td>
                            <td>{{file.attributes ? file.attributes.width : ''}}</td>
                            <td>{{file.attributes ? file.attributes.height : ''}}</td>
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

.ccm-image-cell > label::v-deep i {
  font-size: 100px;
  margin: 2px;
  padding: 0.5rem;
}

.ccm-image-chooser-icon::v-deep i {
  font-size: 32px;
}
</style>
<script>
/* global CCM_DISPATCHER_FILENAME, bootstrap, ConcreteAjaxRequest */
/* eslint-disable no-new */
import Pagination from '../../Pagination'

export default {
    components: {
        Pagination
    },
    data: () => ({
        i18n: {
            id: 'ID',
            name: 'Name',
            uploaded: 'Uploaded',
            size: 'Size',
            width: 'Width',
            height: 'Height'
        },
        currentPage: 1,
        rows: false,
        fileList: [],
        selectedFiles: [],
        sortByColumn: '',
        sortByDirection: 'desc',
        pagination: null,
        queryParams: {
            pagination_page: 'ccm_paging_p',
            sort_column: 'ccm_order_by',
            sort_direction: 'ccm_order_by_direction'
        },
        viewIsLoading: false
    }),
    props: {
        filters: {
            type: Array
        },
        enableSort: {
            type: Boolean,
            required: false,
            default: false
        },
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
        additionalQueryParams: {
            type: Array,
            required: false
        },
        routePath: {
            type: String,
            required: true
        },
        multipleSelection: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        isLoading() {
            return this.rows === false
        },
        isFolderItemList() {
            if (this.fileList.length > 0) {
                const firstRow = _.first(this.fileList)

                return !_.isUndefined(firstRow.treeNodeID)
            }

            return false
        },
        dateSortColumn() {
            return this.isFolderItemList ? 'dateModified' : 'f.fDateAdded'
        },
        fetchRoute() {
            let routePath = CCM_DISPATCHER_FILENAME + this.$props.routePath
            let qs = '?'
            if (this.enableSort && this.sortByColumn !== '') {
                routePath += `${qs}${this.queryParams.sort_column}=${this.sortByColumn}&${this.queryParams.sort_direction}=${this.sortByDirection}`
                qs = '&'
            }

            if (this.enablePagination && this.pagination) {
                routePath += `${qs}${this.queryParams.pagination_page}=${this.currentPage}&itemsPerPage=${this.pagination.per_page}`
                qs = '&'
            }

            if (typeof this.$props.additionalQueryParams === 'object') {
                for (var item of this.$props.additionalQueryParams) {
                    routePath += qs + encodeURIComponent(item.key) + '=' + encodeURIComponent(item.value)
                    qs = '&'
                }
            }

            return routePath
        },
        haveToPaginate() {
            return this.enablePagination && this.pagination && this.pagination.total_pages > 1
        }
    },
    methods: {
        getGridHoverContent(file) {
            if (!file.isFolder) {
                var title = ''
                if (file.resultsThumbnailDetailImg) {
                    title += '<div>' + file.resultsThumbnailDetailImg + '</div>'
                }
                title += '<div class="text-center"><b>' + file.size + '</b></div>'
                if (file.attributes && file.attributes.width && file.attributes.height) {
                    title += '<div class="text-center text-muted"><small>' + file.attributes.width + 'x' + file.attributes.height + '</small></div>'
                }
                return title
            }
        },
        getListHoverContent(file) {
            if (!file.isFolder) {
                if (file.resultsThumbnailDetailImg) {
                    return '<div>' + file.resultsThumbnailDetailImg + '</div>'
                }
            }
        },
        setupHoverPreview() {
            var $cells = $(this.$el).find('[data-bs-content]')
            $cells.each(function(i) {
                return new bootstrap.Popover($cells.get(i), {
                    container: '#ccm-tooltip-holder',
                    customClass: 'ccm-image-chooser-popover',
                    placement: 'bottom',
                    delay: 500,
                    trigger: 'hover',
                    fallbackPlacements: ['top'],
                    html: true
                })
            })
        },
        canChooseFile(file) {
            var canChooseFile = -1
            if (this.filters) {
                var fileExtension = file.extension
                var fileType = file.genericType
                this.filters.forEach(function(filter) {
                    if (filter.filter === 'extension') {
                        if (filter.extensions.includes(fileExtension)) {
                            canChooseFile = true
                        } else {
                            canChooseFile = false
                        }
                    }
                    if (canChooseFile !== false) {
                        if (filter.filter === 'type') {
                            if (filter.type === fileType) {
                                canChooseFile = true
                            } else {
                                canChooseFile = false
                            }
                        }
                    }
                })
            }

            if (canChooseFile === -1) {
                return true
            } else {
                return canChooseFile
            }
        },
        getFiles() {
            const my = this
            my.rows = false
            my.fileList = []
            my.selectedFiles = [] // Reset Selected Files
            my.viewIsLoading = true

            new ConcreteAjaxRequest({
                url: this.fetchRoute,
                success: r => {
                    my.rows = []
                    r.data = r.data || {}
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

                    if (r.meta) {
                        if (r.meta.pagination) {
                            my.pagination = r.meta.pagination
                        }

                        if (r.meta.query_params) {
                            my.queryParams = r.meta.query_params
                        }
                    }

                    // Prevent re-fetching data
                    // as changing pagination & queryParams data will fire `fetchRoute` watcher
                    my.$nextTick(() => {
                        my.viewIsLoading = false
                    })
                }
            })
        },
        sortBy(column) {
            if (column === this.sortByColumn || (this.sortByColumn === '' && column === this.dateSortColumn)) {
                this.sortByDirection = this.sortByDirection === 'asc' ? 'desc' : 'asc'
            }

            this.sortByColumn = column
        },
        getSortColumnClassName(column) {
            let className = ''
            if (this.enableSort) {
                if (column === this.sortByColumn || (this.sortByColumn === '' && column === this.dateSortColumn)) {
                    className = `ccm-results-list-active-sort-${this.sortByDirection}`
                }
            }

            return className
        },
        onItemClick(file) {
            if (file.isFolder) {
                this.$emit('folderClick', file.treeNodeID)
            }
        }
    },
    mounted: function() {
        if (window.ccmi18n_filemanager) {
            for (const key in this.i18n) {
                if (window.ccmi18n_filemanager[key]) {
                    this.i18n[key] = window.ccmi18n_filemanager[key]
                }
            }
        }
    },
    watch: {
        resultsFormFactor(value) {
            var my = this
            setTimeout(function() {
                my.setupHoverPreview()
            }, 5)
        },
        viewIsLoading(value) {
            if (!value) {
                this.setupHoverPreview()
            }
        },
        selectedFiles(value) {
            this.$emit('update:selectedFiles', Array.isArray(value) ? value : [value])
        },
        routePath() {
            // Reset Pagination if base route has changed
            this.currentPage = 1
        },
        fetchRoute: {
            immediate: true,
            handler() {
                if (!this.viewIsLoading) {
                    this.getFiles()
                }
            }
        }
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
