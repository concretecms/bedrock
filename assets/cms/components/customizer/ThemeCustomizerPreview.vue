<template>
    <div id="ccm-theme-preview-frame-wrapper" data-view="preview-preset">
        <div v-show="!loadingPreview">
            <iframe class="ccm-page-preview-frame" name="ccm-theme-preview-frame" :src="previewAction">
            </iframe>
        </div>
        <div v-if="loadingPreview">
            <div class="text-center mt-5 display-4 text-secondary">
                <i class="fa fa-cog fa-spin"></i>
                {{ i18n.loading }}
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* global ConcreteEvent */

export default {
    components: {
    },
    data: function () {
        return {
            i18n: {
                loading: 'Loading...'
            },
            loadingPreview: true
        }
    },
    mounted() {
        var my = this
        if (window.ccmi18n_styleCustomizer) {
            for (let key in my.i18n) {
                if (window.ccmi18n_styleCustomizer[key]) {
                    my.i18n[key] = window.ccmi18n_styleCustomizer[key];
                }
            }
        }
        $('iframe[name=ccm-theme-preview-frame]').on('load', function() {
            my.loadingPreview = false
        })
        ConcreteEvent.on('ThemeCustomizerReloadPreview', function () {
            my.loadingPreview = true
        })
    },
    props: {
        previewAction: {
            type: String
        }
    }
}
</script>
