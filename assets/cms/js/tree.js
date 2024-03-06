/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */

/* global ccmi18n, ccmi18n_tree, CCM_DISPATCHER_FILENAME, ConcreteAlert, ConcreteEvent, ConcreteMenu */

function ConcreteTree($element, options) {
    var my = this
    options = options || {}
    options = $.extend({
        readOnly: false,
        chooseNodeInForm: false,
        onSelect: false,
        treeID: false,
        onClick: false,
        allowFolderSelection: true,
        selectNodesByKey: [],
        removeNodesByKey: [],
        removeNodesByCallback: false,
        ajaxData: {} // additional to be sent up
    }, options)
    my.options = options
    my.$element = $element
    my.setupTree()
    if (!options.chooseNodeInForm && !options.onClick) {
        ConcreteTree.setupTreeEvents(my)
    }
    return my.$element
}

ConcreteTree.prototype = {

    dragRequest: function (sourceNode, node, hitMode, onSuccess) {
        var treeNodeParentID = node.parent.data.treeNodeID
        if (hitMode == 'over') {
            treeNodeParentID = node.data.treeNodeID
        }
        jQuery.fn.dialog.showLoader()
        var params = [
            {
                name: 'sourceTreeNodeID', value: sourceNode.data.treeNodeID
            },
            {
                name: 'treeNodeParentID', value: treeNodeParentID
            }
        ]

        $.concreteAjax({
            data: params,
            url: CCM_DISPATCHER_FILENAME + '/ccm/system/tree/node/drag_request',
            success: function (r) {
                if (onSuccess) {
                    onSuccess()
                }
            }
        })
    },

    setupTree: function () {
        var my = this
        var options = my.options
        var classNames = {}
        var checkbox = false
        var ajaxData = {}

        if (my.options.ajaxData != false) {
            ajaxData = my.options.ajaxData
        }

        if (!options.treeNodeParentID) {
            ajaxData.treeID = options.treeID
        } else {
            ajaxData.treeNodeParentID = options.treeNodeParentID
        }

        if (options.allowFolderSelection) {
            ajaxData.allowFolderSelection = 1
        }

        if (typeof CCM_CID !== 'undefined') {
            ajaxData.cID = CCM_CID
        } else {
            ajaxData.cID = 0
        }

        var persist = true

        if (options.chooseNodeInForm) {
            checkbox = true
            persist = false
            classNames = {
                checkbox: 'fancytree-radio'
            }
            if (options.selectNodesByKey.length) {
                ajaxData.treeNodeSelectedIDs = options.selectNodesByKey
            }
        }

        if (options.chooseNodeInForm === 'multiple') {
            checkbox = true
            persist = false
            classNames = {
                checkbox: 'fancytree-checkbox'
            }
            if (options.selectNodesByKey.length) {
                ajaxData.treeNodeSelectedIDs = options.selectNodesByKey
            }
        }

        var selectMode = 1
        if (options.selectMode) {
            selectMode = options.selectMode
        }
        var minExpandLevel = 2
        if (options.minExpandLevel) {
            minExpandLevel = options.minExpandLevel
        }

        var ajaxURL
        if (!options.treeNodeParentID) {
            ajaxURL = CCM_DISPATCHER_FILENAME + '/ccm/system/tree/load'
        } else {
            ajaxURL = CCM_DISPATCHER_FILENAME + '/ccm/system/tree/node/load_starting'
        }

        $(my.$element).fancytree({
            tabindex: null,
            titlesTabbable: false,
            extensions: ['glyph', 'dnd'],
            glyph: {
                preset: 'awesome5'
            },
            source: {
                url: ajaxURL,
                method: 'POST',
                data: ajaxData
            },
            lazyLoad: function (event, data) {
                data.result = my.getLoadNodePromise(data.node)
            },
            select: function (select, data) {
                if (options.chooseNodeInForm) {
                    const keys = my.getSelectedNodeKeys(data.tree.getRootNode(), ajaxData.treeNodeSelectedIDs)
                    if (keys.length) {
                    options.onSelect(keys)
                }
                }
            },

            selectMode: selectMode,
            checkbox: checkbox,
            minExpandLevel: minExpandLevel,
            clickFolderMode: 1,
            init: function () {
                var $tree = my.$element

                if (options.removeNodesByKey.length) {
                    for (var i = 0; i < options.removeNodesByKey.length; i++) {
                        var nodeID = options.removeNodesByKey[i]
                        var node = $.ui.fancytree.getTree($tree).getNodeByKey(String(nodeID))
                        if (node) {
                            node.remove()
                        }
                    }
                }

                if (options.readOnly) {
                    $tree.fancytree('disable')
                }

                var selectedNodes
                if (options.chooseNodeInForm) {
                    const tree = $.ui.fancytree.getTree($tree)
                    const keys = my.getSelectedNodeKeys(tree.getRootNode(), ajaxData.treeNodeSelectedIDs)
                    if (keys.length) {
                        options.onSelect(keys)
                    }
                }
                if (selectedNodes) {
                    $.map(selectedNodes, function (node) {
                        node.makeVisible({ scrollIntoView: false })
                    })
                }
            },

            click: function (e, data) {
                if (data.targetType == 'expander') {
                    return true
                }

                if (data.targetType == 'icon') {
                    return false
                }

                if (options.onClick) {
                    return options.onClick(data.node, e)
                }

                if (options.chooseNodeInForm && data.targetType != 'checkbox') {
                    return false
                }

                if (!data.targetType) {
                    return false
                }

                if (!options.chooseNodeInForm && e.originalEvent.target && $(e.originalEvent.target).hasClass('fancytree-title')) {
                    var $menu = data.node.data.treeNodeMenu
                    if ($menu) {
                        var menu = new ConcreteMenu($(data.node.span), {
                            menu: $menu,
                            handle: 'none'
                        })
                        menu.show(e)
                    }
                }

                return true
            },
            expand: function(event, data) {
                // only if 'selected' array is available execute code.
                if (options.ajaxData.selected) {
                    // since the expand options is triggered we can asume that there are children.
                    data.node.children.forEach(function(nodeChild) {
                        if (options.ajaxData.selected.includes(parseInt(nodeChild.key))) {
                            nodeChild.setSelected(true)
                        }
                    })
                }
            },
            collapse: function(event, data) {
                // loop over child nodes and check if node is still selected. If not remove it from the 'options.ajaxData.selected' array.
                data.node.children.forEach(function(nodeChild) {
                    if (options.ajaxData.selected.includes(parseInt(nodeChild.key)) && !nodeChild.isSelected()) {
                        options.ajaxData.selected.splice(options.ajaxData.selected.indexOf(nodeChild.key), 1)
                    }
                })
            },
            dnd: {
                preventRecursiveMoves: true, // Prevent dropping nodes on own descendants,
                focusOnClick: true,
                preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                dragStart: function (sourceNode, data) {
                    if (!options.chooseNodeInForm) {
                        return true
                    } else {
                        return false
                    }
                },
                dragStop: function (sourceNode, data) {
                    return true
                },

                dragEnter: function (targetNode, data) {
                    var sourceNode = data.otherNode
                    var hitMode = data.hitMode

                    if ((!targetNode.parent.data.treeNodeID) && (targetNode.data.treeNodeID !== '1')) { // Home page has no parents, but we still want to be able to hit it.
                        return false
                    }

                    if ((hitMode != 'over') && (targetNode.data.treeNodeID == 1)) { // Home gets no siblings
                        return false
                    }

                    if (sourceNode.data.treeNodeID == targetNode.data.treeNodeID) {
                        return false // can't drag node onto itself.
                    }

                    if (!targetNode.data.treeNodeID && hitMode == 'after') {
                        return false
                    }

                    // Prevent dropping a parent below it's own child
                    if (targetNode.isDescendantOf(sourceNode)) {
                        return false
                    }
                    return true
                },
                dragDrop: function (targetNode, data) {
                    my.dragRequest(data.otherNode, targetNode, data.hitMode, function () {
                        data.otherNode.moveTo(targetNode, data.hitMode)
                        var treeNodeParentID = data.otherNode.parent.data.treeNodeID
                        if (data.hitMode == 'over') {
                            treeNodeParentID = targetNode.data.treeNodeID
                        }
                        var params = [{
                            name: 'sourceTreeNodeID',
                            value: data.otherNode.data.treeNodeID
                        }, {
                            name: 'treeNodeParentID', value: treeNodeParentID
                        }]
                        var childNodes = targetNode.parent.getChildren()
                        if (childNodes) {
                            for (var i = 0; i < childNodes.length; i++) {
                                var childNode = childNodes[i]
                                params.push({
                                    name: 'treeNodeID[]', value: childNode.data.treeNodeID
                                })
                            }
                        }
                        $.concreteAjax({
                            data: params,
                            url: CCM_DISPATCHER_FILENAME + '/ccm/system/tree/node/update_order'
                        })
                    })
                }
            }
        })
    },

    getSelectedNodeKeys: function (node, selected) {
        var my = this

        // Initialize selected and deselected arrays
        selected = selected || []
        // Walk through all child nodes
        if (node.hasChildren()) {
            node.getChildren().forEach(function (child) {
                // If the node is selected and not already in the selected array, add it
                if (child.isSelected() && !selected.includes(parseInt(child.key))) {
                    selected.push(parseInt(child.key))
                }
                // If the node is not selected and is in the selected array, remove it
                if (!child.isSelected() && selected.includes(parseInt(child.key))) {
                    selected.splice(selected.indexOf(parseInt(child.key)), 1)
                }
                // call the function recursively and merge the result with the selected array
                selected = my.getSelectedNodeKeys(child, selected)
            })
        }

        return selected
    },

    getLoadNodePromise: function (node) {
        var my = this
        var ajaxData = my.options.ajaxData != false ? my.options.ajaxData : {}

        ajaxData.treeNodeParentID = node.data.treeNodeID

        return $.when($.getJSON(CCM_DISPATCHER_FILENAME + '/ccm/system/tree/node/load',
            ajaxData
        ))
    },

    reloadNode: function (node, onComplete) {
        this.getLoadNodePromise(node).done(function (data) {
            node.removeChildren()
            node.addChildren(data)
            node.setExpanded(true, {
                noAnimation: true
            })
            if (onComplete) {
                onComplete()
            }
        })
    },

    cloneNode: function (treeNodeID) {
        var my = this
        var $tree = $('[data-tree=' + my.options.treeID + ']')
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: {
                treeNodeID: treeNodeID,
                token: CCM_SECURITY_TOKEN
            },
            url: CCM_DISPATCHER_FILENAME + '/ccm/system/tree/node/duplicate',
            success: function (r) {
                if (r.error == true) {
                    ConcreteAlert.dialog(ccmi18n.error, r.errors.join('<br>'))
                } else {
                    jQuery.fn.dialog.closeTop()
                    var node = $.ui.fancytree.getTree($tree).getNodeByKey(String(r.treeNodeParentID))
                    jQuery.fn.dialog.showLoader()
                    my.reloadNode(node, function () {
                        jQuery.fn.dialog.hideLoader()
                    })
                }
            },
            error: function (r) {
                ConcreteAlert.dialog(ccmi18n.error, '<div class="alert alert-danger">' + r.responseText + '</div>')
            },
            complete: function () {
                jQuery.fn.dialog.hideLoader()
            }
        })
        return false
    }

}

ConcreteTree.activateMenu = function ($menu, my) {
    $menu.find('a[data-tree-action]').on('click.concreteMenu', function (e) {
        e.preventDefault()
        var url = $(this).attr('data-tree-action-url')
        var action = $(this).attr('data-tree-action')
        var title = $(this).attr('dialog-title')
        var width = $(this).attr('dialog-width')
        var height = $(this).attr('dialog-height')

        switch (action) {
        case 'clone-node':
            my.cloneNode($(this).attr('data-tree-node-id'))
            break
        default:
            if (!title) {
                switch (action) {
                case 'add-node':
                    title = ccmi18n_tree.add
                    break
                case 'edit-node':
                    title = ccmi18n_tree.edit
                    break
                case 'delete-node':
                    title = ccmi18n_tree.delete
                    break
                }
            }
            if (!width) {
                width = 550
            }

            if (!height) {
                height = 'auto'
            }

            jQuery.fn.dialog.open({
                title: title,
                href: url,
                width: width,
                modal: true,
                height: height
            })
            break
        }
    })
}

ConcreteTree.setupTreeEvents = function (my) {
    ConcreteEvent.unsubscribe('ConcreteMenuShow')
    ConcreteEvent.subscribe('ConcreteMenuShow', function (e, data) {
        var $menu = data.menuElement
        ConcreteTree.activateMenu($menu, my)
    })

    ConcreteEvent.subscribe('ConcreteTreeAddTreeNode.concreteTree', function (e, r) {
        var $tree = $('[data-tree=' + my.options.treeID + ']')
        var nodes = r.node
        var node
        if (nodes.length) {
            for (var i = 0; i < nodes.length; i++) {
                node = $.ui.fancytree.getTree($tree).getNodeByKey(String(nodes[i].treeNodeParentID))
                node.addChildren(nodes)
            }
        } else {
            node = $.ui.fancytree.getTree($tree).getNodeByKey(String(nodes.treeNodeParentID))
            node.addChildren(nodes)
        }
    })
    ConcreteEvent.subscribe('ConcreteTreeUpdateTreeNode.concreteTree', function (e, r) {
        var $tree = $('[data-tree=' + my.options.treeID + ']')
        var node = $.ui.fancytree.getTree($tree).getNodeByKey(String(r.node.key))
        node.fromDict(r.node)
        node.render()
    })
    ConcreteEvent.subscribe('ConcreteTreeDeleteTreeNode.concreteTree', function (e, r) {
        var $tree = $('[data-tree=' + my.options.treeID + ']')
        var node = $.ui.fancytree.getTree($tree).getNodeByKey(String(r.node.treeNodeID))
        node.remove()
    })
}

// jQuery Plugin
$.fn.concreteTree = function (options) {
    return $.each($(this), function (i, obj) {
        /* eslint-disable no-new */
        new ConcreteTree($(this), options)
    })
}

global.ConcreteTree = ConcreteTree
