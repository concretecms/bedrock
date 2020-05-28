import '../search/base'

/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* global _, ccmi18n, ccmi18n_filemanager, CCM_DISPATCHER_FILENAME, ConcreteAlert, ConcreteAjaxRequest, ConcreteAjaxSearch, ConcreteEvent, ConcreteFileMenu, ConcreteTree */

function ConcreteFileManager($element, options) {
    var my = this
    options = $.extend({
        breadcrumbElement: 'div.ccm-search-results-breadcrumb.ccm-file-manager-breadcrumb',
        bulkParameterName: 'fID',
        searchMethod: 'get',
        selectMode: 'multiple' // Enables multiple advanced item selection, range click, etc
    }, options)

    my.currentFolder = 0
    my.interactionIsDragging = false
    my.$breadcrumb = $(options.breadcrumbElement)

    my._templateFileProgress = _.template('<div id="ccm-file-upload-progress" class="ccm-ui"><div id="ccm-file-upload-progress-bar">' +
        '<div class="progress progress-striped active"><div class="progress-bar" style="width: <%=progress%>%;"></div></div>' +
        '</div></div>')

    ConcreteAjaxSearch.call(my, $element, options)

    my.setupItemsPerPageOptions()
}

ConcreteFileManager.prototype = Object.create(ConcreteAjaxSearch.prototype)

ConcreteFileManager.prototype.setupBreadcrumb = function(result) {
    var my = this

    if (result.breadcrumb) {
        my.$breadcrumb.html('')
        if (result.breadcrumb.length) {
            var $nav = $('<ol data-search-navigation="breadcrumb" class="breadcrumb" />')
            $.each(result.breadcrumb, function(i, entry) {
                var activeClass = ''
                if (entry.active) {
                    activeClass = ' class="active"'
                }

                var $anchor = $($.parseHTML('<a data-file-manager-tree-node="' + entry.folder + '" href="' + entry.url + '"></a>'))
                $anchor.text(entry.name)
                $('<li' + activeClass + '><a data-file-manager-tree-node="' + entry.folder + '" href="' + entry.url + '"></a></li>').append($anchor).appendTo($nav)

                $nav.find('li.active a').on('click', function(e) {
                    e.stopPropagation()
                    e.preventDefault()
                    if (entry.menu) {
                        var $menu = $(entry.menu)
                        my.showMenu($nav, $menu, e)
                    }
                })
            })

            $nav.appendTo(my.$breadcrumb)
            $nav.on('click.concreteSearchBreadcrumb', 'a', function() {
                my.loadFolder($(this).attr('data-file-manager-tree-node'), $(this).attr('href'))
                return false
            })
        }
    }
}

ConcreteFileManager.prototype.refreshResults = function(files) {
    var my = this
    if (this.currentFolder) {
        my.loadFolder(this.currentFolder, false, true)
    } else {
        // re-trigger a file search
        $('div[data-header=file-manager] form').trigger('submit')
    }
}

ConcreteFileManager.prototype.setupFolders = function(result) {
    var my = this
    var $total = my.$element.find('tbody tr')
    if (result.folder) {
        my.currentFolder = result.folder.treeNodeID
    }
    my.$element.find('tbody tr').on('dblclick', function() {
        var index = $total.index($(this))
        if (index > -1) {
            var result = my.getResult().items[index]
            if (result) {
                if (result.isFolder) {
                    my.loadFolder(result.treeNodeID)
                }
            }
        }
    })
}

ConcreteFileManager.prototype.reloadFolder = function() {
    this.loadFolder(this.currentFolder)
}

ConcreteFileManager.prototype.hoverIsEnabled = function($element) {
    var my = this
    return !my.interactionIsDragging
}

ConcreteFileManager.prototype.setupItemsPerPageOptions = function() {
    var my = this
    my.$element.on('click', '.dropdown-menu li', function() {
        var action = $(this).parent().attr('data-action')
        var itemsPerPage = parseInt($(this).data('items-per-page'))
        if (action && itemsPerPage) {
            my.ajaxUpdate(action + '?fSearchItemsPerPage=' + itemsPerPage)
            $(this).parents('.input-group-btn').removeClass('open')
            my.updateActiveItemsPerPageOption(parseInt($(this).text()))
        }
        return false
    })
}

ConcreteFileManager.prototype.updateActiveItemsPerPageOption = function(itemsPerPage) {
    var my = this
    my.$element.find('.dropdown-menu li').removeClass('active')
    my.$element.find('.dropdown-menu li[data-items-per-page=' + itemsPerPage + ']').addClass('active')
    my.$element.find('.dropdown-toggle #selected-option').text(itemsPerPage)
}

ConcreteFileManager.prototype.updateResults = function(result) {
    var my = this
    ConcreteAjaxSearch.prototype.updateResults.call(my, result)
    my.setupFolders(result)
    my.setupBreadcrumb(result)
    if (result.itemsPerPage) {
        my.updateActiveItemsPerPageOption(parseInt(result.itemsPerPage))
    }
    if (result.baseUrl) {
        my.$element.find('.dropdown-menu').attr('data-action', result.baseUrl)
    }
    if (my.options.selectMode == 'choose') {
        my.$element.unbind('.concreteFileManagerHoverFile')
        my.$element.on('mouseover.concreteFileManagerHoverFile', 'tr[data-file-manager-tree-node-type]', function() {
            $(this).addClass('ccm-search-select-hover')
        })
        my.$element.on('mouseout.concreteFileManagerHoverFile', 'tr[data-file-manager-tree-node-type]', function() {
            $(this).removeClass('ccm-search-select-hover')
        })
        my.$element.unbind('.concreteFileManagerChooseFile').on('click.concreteFileManagerChooseFile', 'tr[data-file-manager-tree-node-type=file]', function(e) {
            ConcreteEvent.publish('FileManagerBeforeSelectFile', { fID: $(this).attr('data-file-manager-file') })
            ConcreteEvent.publish('FileManagerSelectFile', { fID: $(this).attr('data-file-manager-file') })
            my.$downloadTarget.remove()
            return false
        })
        my.$element.unbind('.concreteFileManagerOpenFolder').on('click.concreteFileManagerOpenFolder', 'tr[data-file-manager-tree-node-type=search_preset],tr[data-file-manager-tree-node-type=file_folder]', function(e) {
            e.preventDefault()
            my.loadFolder($(this).attr('data-file-manager-tree-node'))
        })
    }
}

ConcreteFileManager.prototype.loadFolder = function(folderID, url, showRecentFirst) {
    var my = this
    var data = my.getSearchData()
    if (!url) {
        url = my.options.result.baseUrl
    } else {
        // dynamically update baseUrl because we're coming to this folder via
        // something like the breadcrumb
        my.options.result.baseUrl = url // probably a nicer way to do this
    }
    data.push({ name: 'folder', value: folderID })

    if (my.options.result.filters) {
        // We are loading a folder with a filter. So we loop through the fields
        // and add them to data.
        $.each(my.options.result.filters, function(i, field) {
            var fieldData = field.data
            data.push({ name: 'field[]', value: field.key })
            for (var key in fieldData) {
                data.push({ name: key, value: fieldData[key] })
            }
        })
    }

    if (showRecentFirst) {
        data.push({ name: 'ccm_order_by', value: 'folderItemModified' })
        data.push({ name: 'ccm_order_by_direction', value: 'desc' })
    }

    my.currentFolder = folderID
    my.ajaxUpdate(url, data)

    my.$element.find('#ccm-file-manager-upload input[name=currentFolder]').val(my.currentFolder)
}

ConcreteFileManager.prototype.getResultMenu = function(results) {
    var my = this
    var $menu = ConcreteAjaxSearch.prototype.getResultMenu.call(this, results)
    if ($menu) {
        my.activateMenu($menu)
    }
    return $menu
}

/**
 * Static Methods
 */
ConcreteFileManager.launchDialog = function(callback, opts) {
    var w = 720
    var h = 580
    var data = {}
    var i

    var options = {
        filters: [],
        multipleSelection: false // Multiple selection switch
    }

    $.extend(options, opts)

    if (options.filters.length > 0) {
        data['field[]'] = []

        for (i = 0; i < options.filters.length; i++) {
            var filter = $.extend(true, {}, options.filters[i]) // clone
            data['field[]'].push(filter.field)
            delete (filter.field)
            $.extend(data, filter) // add all remaining fields to the data
        }
    }

    $.fn.dialog.open({
        width: w,
        height: h,
        href: CCM_DISPATCHER_FILENAME + '/ccm/system/dialogs/file/search',
        modal: true,
        data: data,
        title: ccmi18n_filemanager.chooseFile,
        onOpen: function(dialog) {
            ConcreteEvent.unsubscribe('FileManagerSelectFile')
            ConcreteEvent.subscribe('FileManagerSelectFile', function(e, data) {
                var multipleItemsSelected = (Object.prototype.toString.call(data.fID) === '[object Array]')
                if (options.multipleSelection && !multipleItemsSelected) {
                    data.fID = [data.fID]
                } else if (!options.multipleSelection && multipleItemsSelected) {
                    if (data.fID.length > 1) {
                        $('.ccm-search-bulk-action option:first-child').prop('selected', 'selected')
                        window.alert(ccmi18n_filemanager.chosenTooMany)
                        return
                    }
                    data.fID = data.fID[0]
                }
                $.fn.dialog.closeTop()
                callback(data)
            })
        }
    })
}

ConcreteFileManager.getFileDetails = function(fID, callback) {
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: CCM_DISPATCHER_FILENAME + '/ccm/system/file/get_json',
        data: { fID: fID },
        error: function(r) {
            ConcreteAlert.dialog(ccmi18n.error, r.responseText)
        },
        success: function(r) {
            callback(r)
        }
    })
}

ConcreteFileManager.launchUploadCompleteDialog = function(files, my) {
    if (files && files.length && files.length > 0) {
        var data = ''
        _.each(files, function(file) {
            data += 'fID[]=' + file.fID + '&'
        })
        data = data.substring(0, data.length - 1)
        $.fn.dialog.open({
            width: '660',
            height: '500',
            href: CCM_DISPATCHER_FILENAME + '/ccm/system/dialogs/file/upload_complete',
            modal: true,
            data: data,
            onClose: function() {
                var data = { filemanager: my }
                ConcreteEvent.publish('FileManagerUploadCompleteDialogClose', data)
            },
            onOpen: function() {
                var data = { filemanager: my }
                ConcreteEvent.publish('FileManagerUploadCompleteDialogOpen', data)
            },
            title: ccmi18n_filemanager.uploadComplete
        })
    }
}

$.fn.concreteFileManager = function(options) {
    return $.each($(this), function(i, obj) {
        new ConcreteFileManager($(this), options)
    })
}

global.ConcreteFileManager = ConcreteFileManager
// global.ConcreteFileManagerMenu = ConcreteFileManagerMenu;
