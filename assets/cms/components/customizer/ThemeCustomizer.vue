<template>
    <div class="ccm-theme-customizer">
        <div v-for="set in styleList.sets">
            <h5>{{ set.name }}</h5>
            <div class="card mb-4">
                <ul class="list-group list-group-flush">
                    <li v-for="style in set.styles" class="list-group-item">
                        <div class="d-flex" v-if="style.style.type == 'color' || style.style.type == 'type' || style.style.type == 'image'">
                            <label class="my-0 form-label align-self-center me-auto">{{ style.style.name }}</label>
                            <component @update="updateStyles" :style-value="style"
                                       :is="style.style.type.replace('_','-') + '-page-customizer-widget'"></component>
                        </div>
                        <div v-else>
                            <label class="form-label">{{ style.style.name }}</label>
                            <component @update="updateStyles" :style-value="style"
                                       :is="style.style.type.replace('_','-') + '-page-customizer-widget'"></component>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div>
            <h5>{{ i18n.customCSS }}</h5>
            <div class="card mb-4">
                <div class="list-group list-group-flush">
                    <div class="list-group-item">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="addCustomCSS" v-model="addCustomCss">
                            <label class="form-check-label" for="addCustomCSS">{{ i18n.addCustomCSS }}</label>
                        </div>
                        <div v-if="addCustomCss" class="d-grid mt-2">
                            <button class="btn btn-secondary btn-sm" @click="showCustomCssDialog">{{ i18n.editCSS }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-none">
            <div data-dialog="save-theme-customizer-changes">

                <div class="form-group">
                    <label class="form-label" for="newSkinName">{{ i18n.skinName }}</label>
                    <input type="text" :class='{"form-control": true, "is-invalid": invalidSkinName}' name="newSkinName"
                           id="newSkinName" v-model="newSkinName">
                </div>

                <div class="dialog-buttons">
                    <button class="btn btn-primary float-end" @click="createNewSkin" type="button">{{ i18n.create }}</button>
                </div>

            </div>
        </div>

        <div class="d-none">
            <div data-dialog="save-theme-customizer-styles">

                <div class="form-group">
                    <p>{{ i18n.applyCustomizations }}</p>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="applyToThisPage" v-model="applyTo" value="page">
                        <label class="form-check-label" for="applyToThisPage">{{ i18n.thisPage }}</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="applyToEntireSite" v-model="applyTo" value="site">
                        <label class="form-check-label" for="applyToEntireSite">{{ i18n.entireSite }}</label>
                    </div>

                </div>

                <div class="dialog-buttons">
                    <button class="btn btn-primary float-end" @click="saveStyles" type="button">{{ i18n.confirm }}</button>
                </div>

            </div>
        </div>

        <div class="d-none">
            <div data-dialog="delete-theme-customizer-skin">

                <p>{{ i18n.confirmSkinDeletion }}</p>

                <div class="dialog-buttons">
                    <button class="btn btn-primary float-end" @click="deleteSkin" type="button">{{ i18n.delete }}</button>
                </div>

            </div>
        </div>

        <div class="d-none">
            <div data-dialog="theme-customizer-custom-css">

                <div id="theme-customizer-custom-css-editor" class="h-100"></div>

            </div>
        </div>

    </div>
</template>

<script>
/* eslint-disable no-new */
/* global ConcreteEvent ConcretePanelManager ace */
import ColorPageCustomizerWidget from './ColorPageCustomizerWidget'
import FontFamilyPageCustomizerWidget from './FontFamilyPageCustomizerWidget'
import SizePageCustomizerWidget from './SizePageCustomizerWidget'
import FontWeightPageCustomizerWidget from './FontWeightPageCustomizerWidget'
import FontStylePageCustomizerWidget from './FontStylePageCustomizerWidget'
import TextTransformPageCustomizerWidget from './TextTransformPageCustomizerWidget'
import TextDecorationPageCustomizerWidget from './TextDecorationPageCustomizerWidget'
import ImagePageCustomizerWidget from './ImagePageCustomizerWidget'
import TypePageCustomizerWidget from './TypePageCustomizerWidget'

export default {
    components: {
        ColorPageCustomizerWidget,
        FontFamilyPageCustomizerWidget,
        SizePageCustomizerWidget,
        FontWeightPageCustomizerWidget,
        FontStylePageCustomizerWidget,
        TextTransformPageCustomizerWidget,
        TextDecorationPageCustomizerWidget,
        ImagePageCustomizerWidget,
        TypePageCustomizerWidget
    },
    methods: {
        goBack() {
            jQuery.fn.dialog.closeTop()
            var panel = ConcretePanelManager.getByIdentifier('customize-theme')
            panel.goBack(true)
            $('div[data-dialog=save-theme-customizer-changes]').remove()
            $('div[data-dialog=delete-theme-customizer-skin]').remove()
        },
        deleteSkin() {
            var my = this
            new ConcreteAjaxRequest({
                url: my.deleteAction,
                data: {
                    ccm_token: CCM_SECURITY_TOKEN
                },
                success: function (r) {
                    my.goBack()
                }
            })
        },
        saveStyles() {
            var my = this
            new ConcreteAjaxRequest({
                url: my.saveStylesAction,
                data: {
                    styles: my.customizerStyles,
                    customCss: my.customizerCustomCss,
                    applyTo: my.applyTo,
                    ccm_token: CCM_SECURITY_TOKEN
                },
                success: function (r) {
                    ConcreteAlert.notify({
                        message: r.message,
                        title: r.title
                    })
                    setTimeout(function() {
                        window.location.reload()
                    }, 1000)
                }
            })
        },
        createNewSkin() {
            var my = this
            if (!my.newSkinName) {
                my.invalidSkinName = true
            } else {
                my.invalidSkinName = false
            }
            if (!my.invalidSkinName) {
                new ConcreteAjaxRequest({
                    url: my.createNewSkinAction,
                    data: {
                        skinName: my.newSkinName,
                        styles: JSON.stringify(my.customizerStyles),
                        customCss: my.customizerCustomCss,
                        ccm_token: CCM_SECURITY_TOKEN
                    },
                    success: function (r) {
                        my.goBack()
                    }
                })
            }
        },
        showCustomCssDialog() {
            var my = this
            jQuery.fn.dialog.open({
                element: 'div[data-dialog=theme-customizer-custom-css]',
                modal: true,
                width: '800px',
                height: '70%',
                title: my.i18n.customCSS,
                onOpen: function() {
                    var editor = ace.edit('theme-customizer-custom-css-editor')
                    editor.setTheme('ace/theme/eclipse')
                    editor.getSession().setMode('ace/mode/css')
                    editor.setValue(my.customizerCustomCss)
                    editor.getSession().on('change', function() {
                        my.customizerCustomCss = editor.getValue()
                    })
                },

                onClose: function() {
                    my.reloadPreview()
                }
            })
        },
        reloadPreview() {
            // submit to the preview action
            // We have to build a temporary form and submit to the iframe - it's pretty stupid. This is ugly and it's
            // not really how we pass data anywhere else but I haven't found a way to post programmatic data to an iframe
            // any other way :shrug:
            var $form = $('<form />')
            var $input = $('<input />')
            var $cssInput = $('<input />')
            var $token = $('<input />')
            $form.attr('method', 'post')
            $form.attr('target', 'ccm-theme-preview-frame')
            $form.attr('action', this.previewAction)
            $input.attr('type', 'hidden')
            $input.attr('name', 'styles')
            $input.attr('value', JSON.stringify(this.customizerStyles))
            $input.appendTo($form)
            $cssInput.attr('type', 'hidden')
            $cssInput.attr('name', 'customCss')
            $cssInput.attr('value', this.customizerCustomCss)
            $cssInput.appendTo($form)
            $token.attr('type', 'hidden')
            $token.attr('name', 'ccm_token')
            $token.attr('value', CCM_SECURITY_TOKEN)
            $token.appendTo($form)
            $form.appendTo($('body'))
            $form.submit()
            ConcreteEvent.publish('ThemeCustomizerReloadPreview')
        },
        updateStyles(styleValue) {
            var my = this
            var styles = []
            this.customizerStyles.forEach(function (style) {
                if (style.variable === styleValue.variable) {
                    style.value = styleValue.value // This handles keeping the source of truth in sync with the child components
                }
                styles.push(style)
            })
            this.customizerStyles = styles
            my.reloadPreview()
        }
    },
    data: function () {
        return {
            i18n: {
                addCustomCSS: 'Add Custom CSS',
                editCSS: 'Edit CSS',
                skinName: 'Skin Name',
                create: 'Create',
                applyCustomizations: 'Apply customizations to:',
                thisPage: 'This Page',
                entireSite: 'Entire Site',
                confirm: 'Confirm',
                confirmSkinDeletion: 'Are you sure you want to delete this custom skin? This cannot be undone.',
                delete: 'Delete',
                customCSS: 'Custom CSS',
                save: 'Save'
            },
            invalidSkinName: false,
            newSkinName: '',
            addCustomCss: false,
            customizerStyles: [],
            customizerCustomCss: '',
            applyTo: 'site'
        }
    },
    mounted() {
        if (window.ccmi18n_styleCustomizer) {
            for (const key in this.i18n) {
                if (window.ccmi18n_styleCustomizer[key]) {
                    this.i18n[key] = window.ccmi18n_styleCustomizer[key]
                }
            }
        }
        if (this.customCss) {
            this.addCustomCss = true
            this.customizerCustomCss = this.customCss
        }

        this.customizerStyles = this.styles

        var my = this

        ConcreteEvent.unsubscribe('ThemeCustomizerSaveSkin')
        ConcreteEvent.unsubscribe('ThemeCustomizerDeleteSkin')
        ConcreteEvent.unsubscribe('ThemeCustomizerCreateSkin')
        ConcreteEvent.unsubscribe('ThemeCustomizerSaveStyles')
        ConcreteEvent.on('ThemeCustomizerSaveSkin', function () {
            new ConcreteAjaxRequest({
                url: my.saveSkinAction,
                data: {
                    styles: JSON.stringify(my.customizerStyles),
                    customCss: my.customizerCustomCss,
                    ccm_token: CCM_SECURITY_TOKEN
                },
                success: function (r) {
                    my.goBack()
                }
            })
        })

        ConcreteEvent.on('ThemeCustomizerDeleteSkin', function () {
            jQuery.fn.dialog.open({
                element: 'div[data-dialog=delete-theme-customizer-skin]',
                modal: true,
                width: '400',
                title: my.i18n.save,
                height: 'auto'
            })
        })

        ConcreteEvent.on('ThemeCustomizerCreateSkin', function () {
            jQuery.fn.dialog.open({
                element: 'div[data-dialog=save-theme-customizer-changes]',
                modal: true,
                width: '400',
                title: my.i18n.save,
                height: 'auto'
            })
        })

        ConcreteEvent.on('ThemeCustomizerSaveStyles', function () {
            jQuery.fn.dialog.open({
                element: 'div[data-dialog=save-theme-customizer-styles]',
                modal: true,
                width: '400',
                title: my.i18n.save,
                height: 'auto'
            })
        })
    },
    props: {
        previewAction: {
            type: String
        },
        deleteAction: {
            type: String
        },
        saveSkinAction: {
            type: String
        },
        saveStylesAction: {
            type: String
        },
        createNewSkinAction: {
            type: String
        },
        customCss: {
            type: String
        },
        styleList: {
            type: Object
        },
        styles: {
            type: Array
        }
    }
}
</script>
