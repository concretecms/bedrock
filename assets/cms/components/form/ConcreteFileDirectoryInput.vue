<template>
    <div>
        <div class="ccm-directory-selector-container">
            <div class="form-group">
                <label class="form-label" v-if="inputLabel">
                    {{ inputLabel }}<template v-if="selectedDirectory">: {{ selectedDirectoryLabel }}</template>
                </label>
                <input type="hidden" :id="directorySelectInputId" :name="inputName"
                       :value="selectedDirectoryID" :disabled="disabled">

                <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-secondary"
                                :class="{'active': pickerMode === 'tree'}"
                                :aria-pressed="pickerMode === 'tree'"
                                @click="pickerMode = 'tree'" :disabled="disabled">
                            {{ i18n.browseFolders }}
                        </button>
                        <button type="button" class="btn btn-secondary"
                                :class="{'active': pickerMode === 'search'}"
                                :aria-pressed="pickerMode === 'search'"
                                @click="pickerMode = 'search'" :disabled="disabled">
                            {{ i18n.searchFolders }}
                        </button>
                    </div>
                    <button v-if="showAddDirectoryButton" type="button"
                            :class="{'btn': true, 'btn-secondary': true, 'btn-sm': true, 'ccm-create-new-directory-button': true}"
                            @click="toggleDirectoryInput" :disabled="disabled || selectedDirectoryID === 0">
                        {{ showAddDirectoryInput ? i18n.cancelFolderCreation : i18n.createNewFolder }}
                    </button>
                </div>

                <div v-show="pickerMode === 'tree'" ref="directoryTree"
                     class="ccm-directory-selector-tree border rounded p-2"></div>
                <div v-show="pickerMode === 'search'" class="border rounded p-3">
                    <input :id="directorySearchInputId" ref="directorySearchInput" :disabled="disabled">
                    <div v-if="hasMoreSearchResults" class="form-text mt-2">
                        {{ i18n.moreFoldersFound }}
                    </div>
                </div>

            </div>
        </div>
        <div v-if="showAddDirectoryButton" v-show="showAddDirectoryInput" class="ccm-new-directory-name-container">
            <div class="form-group">
                <div class="form-label">
                    {{ i18n.createInside }}: {{ selectedDirectoryLabel }}
                </div>
                <label class="form-label" :for="directoryInputId">{{ i18n.newFolderName }}</label>
                <div class="input-group">
                    <input type="text"
                           :id="directoryInputId"
                           ref="directoryNameInput"
                           maxlength="255"
                           :placeholder="i18n.specifyName" class="ccm-new-directory-name form-control"
                           v-model="newDirectoryName" @keyup.enter.stop.prevent="createDirectory" :disabled="disabled">
                    <button type="button" class="btn btn-secondary"
                            @click.stop.prevent="createDirectory" :disabled="disabled">
                        {{ i18n.add }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* global $, CCM_DISPATCHER_FILENAME, CCM_SECURITY_TOKEN, ConcreteAjaxRequest, _ */
export default {
    data: () => ({
        i18n: {
            add: 'Add',
            browseFolders: 'Browse Folders',
            cancelFolderCreation: 'Cancel Folder Creation',
            createInside: 'Create inside',
            createNewFolder: 'Create New Folder',
            fileManager: 'File Manager',
            moreFoldersFound: 'More folders found. Refine your search.',
            newFolderName: 'New folder name',
            searchFolders: 'Search Folders',
            specifyName: 'Please enter a name...'
        },
        directoryInputId: _.uniqueId('input-'),
        directorySearchInputId: _.uniqueId('input-'),
        directorySelectInputId: _.uniqueId('input-'),
        hasMoreSearchResults: false,
        newDirectoryName: '',
        pickerMode: 'tree',
        rootDirectoryID: 0,
        searchMenu: null,
        searchRequestID: 0,
        selectedDirectory: null,
        selectedDirectoryID: 0,
        showAddDirectoryInput: false,
        treeSelectionRequestID: 0
    }),
    props: {
        inputLabel: {
            type: String
        },
        inputName: {
            type: String,
            required: true
        },
        directoryId: {
            type: Number
        },
        showAddDirectoryButton: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        selectedDirectoryLabel() {
            if (!this.selectedDirectory) {
                return ''
            }

            return this.selectedDirectory.directoryPath === '/'
                ? this.i18n.fileManager
                : (this.selectedDirectory.directoryPath || this.selectedDirectory.directoryName)
        }
    },
    watch: {
        disabled() {
            this.updateDisabledState()
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

        this.initializeSearch()
        this.fetchInitialDirectory()
    },
    beforeDestroy() {
        $(this.$refs.directoryTree).off('.directoryPicker')
        if (this.searchMenu) {
            this.searchMenu.destroy()
        }
        if ($.ui.fancytree.getTree(this.$refs.directoryTree)) {
            $(this.$refs.directoryTree).fancytree('destroy')
        }
    },
    methods: {
        createDirectory() {
            if (!this.showAddDirectoryInput || this.disabled || !this.selectedDirectoryID) {
                return
            }

            const parentDirectoryID = this.selectedDirectoryID
            new ConcreteAjaxRequest({
                url: `${CCM_DISPATCHER_FILENAME}/ccm/system/file/create_directory?_=${Date.now()}`,
                data: {
                    ccm_token: CCM_SECURITY_TOKEN,
                    directoryName: this.newDirectoryName,
                    currentFolder: parentDirectoryID
                },
                success: r => {
                    this.loadDirectory(r.directoryId, directory => {
                        this.setSelectedDirectory(directory)
                        this.showAddDirectoryInput = false
                        this.newDirectoryName = ''
                        this.refreshTreeNode(parentDirectoryID, directory.directoryId)
                    })
                }
            })
        },
        fetchInitialDirectory() {
            const data = {
                ccm_token: CCM_SECURITY_TOKEN,
                mode: this.directoryId ? 'directory' : 'search'
            }
            if (this.directoryId) {
                data.directoryId = this.directoryId
            } else {
                data.query = ''
            }

            new ConcreteAjaxRequest({
                url: `${CCM_DISPATCHER_FILENAME}/ccm/system/file/fetch_directories?_=${Date.now()}`,
                loader: false,
                data,
                success: r => {
                    this.rootDirectoryID = parseInt(r.rootDirectory.directoryId)
                    const requestedDirectory = _.first(r.directories)
                    const directory = requestedDirectory || (r.rootDirectory.canAddFiles ? r.rootDirectory : null)
                    if (directory) {
                        this.setSelectedDirectory(directory)
                    }
                    this.$nextTick(() => this.initializeTree())
                }
            })
        },
        initializeSearch() {
            this.searchMenu = new window.TomSelect(this.$refs.directorySearchInput, {
                loadThrottle: 300,
                maxItems: 1,
                maxOptions: 50,
                placeholder: this.i18n.searchFolders,
                searchField: ['directoryName', 'directoryPath'],
                valueField: 'directoryId',
                load: (query, callback) => {
                    const requestID = ++this.searchRequestID
                    if (!query.length) {
                        this.hasMoreSearchResults = false
                        callback()
                        return
                    }
                    new ConcreteAjaxRequest({
                        url: `${CCM_DISPATCHER_FILENAME}/ccm/system/file/fetch_directories?_=${Date.now()}`,
                        loader: false,
                        data: {
                            ccm_token: CCM_SECURITY_TOKEN,
                            mode: 'search',
                            query
                        },
                        success: r => {
                            if (requestID === this.searchRequestID) {
                                this.hasMoreSearchResults = r.hasMoreDirectories === true
                            }
                            callback(r.directories)
                        },
                        error: () => {
                            if (requestID === this.searchRequestID) {
                                this.hasMoreSearchResults = false
                            }
                            callback()
                        }
                    })
                },
                render: {
                    option: (data, escape) => {
                        return `<div><i class="fa fa-folder me-2"></i><strong>${escape(data.directoryName)}</strong><div class="small text-muted">${escape(data.directoryPath)}</div></div>`
                    },
                    item: (data, escape) => {
                        return `<div><i class="fa fa-folder me-2"></i>${escape(data.directoryName)}</div>`
                    }
                },
                shouldLoad: query => query.length > 0
            })
            this.searchMenu.on('change', directoryID => {
                if (directoryID) {
                    const directory = this.searchMenu.options[directoryID]
                    if (directory) {
                        this.setSelectedDirectory(directory)
                        this.$nextTick(() => this.initializeTree())
                    }
                }
            })
            this.updateDisabledState()
        },
        initializeTree() {
            const selectedNodes = this.selectedDirectoryID ? [this.selectedDirectoryID] : []
            const $tree = $(this.$refs.directoryTree)
            $tree.off('.directoryPicker')
            if ($.ui.fancytree.getTree(this.$refs.directoryTree)) {
                $tree.fancytree('destroy')
            }
            $tree.on('fancytreebeforeselect.directoryPicker', (event, data) => {
                if (event.originalEvent && data.node.isSelected()) {
                    return false
                }
            })
            $tree.one('fancytreeinit.directoryPicker', () => {
                const tree = $.ui.fancytree.getTree(this.$refs.directoryTree)
                const rootNode = tree ? tree.getNodeByKey(String(this.rootDirectoryID)) : null
                if (rootNode) {
                    rootNode.setTitle(this.i18n.fileManager)
                }
            })
            $tree.concreteTree({
                ajaxData: {
                    displayOnly: 'file_folder',
                    requireFileUploadPermission: 1
                },
                treeNodeParentID: this.rootDirectoryID,
                selectNodesByKey: selectedNodes,
                onSelect: nodes => {
                    if (nodes.length) {
                        const requestID = ++this.treeSelectionRequestID
                        this.loadDirectory(nodes[0], directory => {
                            if (requestID === this.treeSelectionRequestID) {
                                this.setSelectedDirectory(directory)
                            }
                        })
                    }
                },
                chooseNodeInForm: 'single'
            })
            this.updateDisabledState()
        },
        loadDirectory(directoryID, callback) {
            new ConcreteAjaxRequest({
                url: `${CCM_DISPATCHER_FILENAME}/ccm/system/file/fetch_directories?_=${Date.now()}`,
                loader: false,
                data: {
                    ccm_token: CCM_SECURITY_TOKEN,
                    mode: 'directory',
                    directoryId: directoryID
                },
                success: r => {
                    const directory = _.first(r.directories)
                    if (directory) {
                        callback(directory)
                    }
                }
            })
        },
        refreshTreeNode(parentDirectoryID, selectedDirectoryID) {
            const tree = $.ui.fancytree.getTree(this.$refs.directoryTree)
            const parentNode = tree ? tree.getNodeByKey(String(parentDirectoryID)) : null
            if (!parentNode) {
                return
            }

            parentNode.resetLazy()
            parentNode.setExpanded(true).done(() => {
                const selectedNode = tree.getNodeByKey(String(selectedDirectoryID))
                if (selectedNode) {
                    selectedNode.setSelected(true)
                }
            })
        },
        setSelectedDirectory(directory) {
            const directoryID = parseInt(directory.directoryId)
            const changed = directoryID !== this.selectedDirectoryID
            this.hasMoreSearchResults = false
            this.selectedDirectory = directory
            this.selectedDirectoryID = directoryID
            if (this.searchMenu) {
                this.searchMenu.clear(true)
                this.searchMenu.clearOptions()
            }
            if (changed) {
                this.$emit('change', directoryID)
            }
        },
        toggleDirectoryInput() {
            if (!this.showAddDirectoryButton || this.disabled) {
                return
            }

            this.showAddDirectoryInput = !this.showAddDirectoryInput
            if (this.showAddDirectoryInput) {
                this.$nextTick(() => this.$refs.directoryNameInput.focus())
            } else {
                this.newDirectoryName = ''
            }
            this.$emit('toggleDirectoryInput', this.showAddDirectoryInput)
        },
        updateDisabledState() {
            if (this.searchMenu) {
                if (this.disabled) {
                    this.searchMenu.lock()
                } else {
                    this.searchMenu.unlock()
                }
            }
            if ($.ui.fancytree.getTree(this.$refs.directoryTree)) {
                $(this.$refs.directoryTree).fancytree(this.disabled ? 'disable' : 'enable')
            }
        }
    }
}
</script>

<style scoped>
.ccm-directory-selector-tree {
  max-height: 16rem;
  min-height: 10rem;
  overflow: auto;
}
</style>
