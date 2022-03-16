
<template>
    <li class="ccm-inline-toolbar-icon-cell">
            <button type="button" :id="toolbarName" data-placement="top" data-custom-class="light-tooltip" class="btn btn-sm ccm-input-button" @click="action" :class="secondaryClass"
                    :title="title">
                <i :class="icon"></i>
            </button>
    </li>
</template>

<script>
/* eslint-disable no-new */
/* global bootstrap */
export default {
    props: {
        action: {
            type: Function,
            default: function (e) {
                this.$emit(this.toolbarName + '-click', e)
            }
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
        secondaryClass: {
            type: String,
            default: 'btn-secondary-outline'
        }
    },
    mounted() {
        new bootstrap.Tooltip(document.querySelector('button#' + this.toolbarName), { customClass: 'light-tooltip' })
    }
}
</script>
