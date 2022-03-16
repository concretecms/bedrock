<template>
    <li class="ccm-inline-toolbar-icon-cell">
            <button type="button" :id="toolbarName" data-placement="top" data-custom-class="light-tooltip" class="btn btn-sm ccm-input-button" :class="{'btn-success':isActive,'btn-secondary-outline':!isActive}"
                    :title="title" @click="$emit('dropdown', toolbarName)">
                <i :class="icon"></i>
            </button>
            <div class="ccm-dropdown-menu" :class="{'active':isActive,'ccm-inline-design-dropdown-menu-doubled':isDouble}">
                <slot></slot>
            </div>
    </li>
</template>

<script>
/* eslint-disable no-new */
/* global bootstrap */
export default {
    props: {
        isDouble: {
            type: Boolean,
            default: false
        },
        toolbarName: {
            type: String,
            default: 'toolbarButton'
        },
        icon: {
            type: String,
            default: 'fas fa-cog'
        },
        title: {
            type: String,
            default: 'Toolbar'
        },
        activeToolbar: null
    },
    methods: {

        showTooltip() {
            $('#' + this.toolbarName).tooltip('show')
        },
        hideTooltip() {
            $('#' + this.toolbarName).tooltip('hide')
        }
    },
    mounted() {
        new bootstrap.Tooltip(document.querySelector('button#' + this.toolbarName), { customClass: 'light-tooltip' })
    },
    computed: {
        isActive() {
            return this.activeToolbar === this.toolbarName
        }
    }
}
</script>
