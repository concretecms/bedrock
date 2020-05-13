<template>
    <div class="modal fade">
        <div class="modal-xl modal-dialog-centered modal-dialog">
            <div class="modal-content h-75">
                <div class="modal-header">
                    <h5 class="modal-title">Choose Files</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <svg>
                            <use xlink:href="#icon-dialog-close"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body p-0 h-100 border-bottom">
                    <div class="container-fluid h-100">
                        <div class="row h-100">
                            <div class="col-4 border-right p-3">
                                <ul class="nav flex-column">
                                    <li class="nav-item" v-for="item in chooserNavItems" :key="item.key">
                                        <hr v-if="item.key === 'horizontalrule'" />
                                        <a v-if="item.key !== 'horizontalrule'"
                                           :class="{'nav-link': true, 'active': activeNavItem === item.key}"
                                           @click="activeNavItem = item.key"
                                           href="javascript:void(0)">
                                            {{item.title}}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-8 p-3">

                                <transition name="concrete-nav-tab-content-switch">
                                    <div key="recent" v-if="activeNavItem === 'recent'">
                                        <chooser-header v-bind:resultsFormFactor.sync="resultsFormFactor"
                                                title="My Recent"></chooser-header>
                                    </div>

                                    <div key="filemanager" v-if="activeNavItem === 'filemanager'">
                                        <chooser-header v-bind:resultsFormFactor.sync="resultsFormFactor"
                                                        title="File Manager"></chooser-header>
                                        Coming Soon
                                    </div>
                                    <div key="sets" v-if="activeNavItem === 'sets'">
                                        <chooser-header v-bind:resultsFormFactor.sync="resultsFormFactor"
                                                        title="File Sets"></chooser-header>
                                        Coming Soon
                                    </div>
                                    <div key="presets" v-if="activeNavItem === 'presets'">
                                        <chooser-header v-bind:resultsFormFactor.sync="resultsFormFactor"
                                                        title="Saved Searches"></chooser-header>
                                        Coming Soon
                                    </div>
                                    <div key="search" v-if="activeNavItem === 'search'">
                                        <chooser-header v-bind:resultsFormFactor.sync="resultsFormFactor"
                                                        title="Search"></chooser-header>
                                        Coming Soon
                                    </div>
                                    <div key="upload" v-if="activeNavItem === 'upload'">
                                        <chooser-header title="File Manager" :showListSelector="false"></chooser-header>
                                        Coming Soon
                                    </div>

                                </transition>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Choose</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import ChooserHeader from './Chooser/Header'

    export default {
        components: {
            ChooserHeader
        },
        props: {
            isOpen: {
                type: Boolean,
                required: true,
                default: false
            },
        },
        data() {
            return {
                activeNavItem: 'recent',
                resultsFormFactor: 'icons',
                chooserNavItems: [
                    {
                        key: 'recent',
                        title: 'My Recent'
                    },
                    {
                        key: 'filemanager',
                        title: 'File Manager'
                    },
                    {
                        key: 'sets',
                        title: 'Sets'
                    },
                    {
                        key: 'presets',
                        title: 'Saved Searches'
                    },
                    {
                        key: 'search',
                        title: 'Search'
                    },
                    {
                        key: 'horizontalrule',
                    },
                    {
                        key: 'upload',
                        title: 'Upload Files'
                    }
                ]
            }
        },
        watch: {
            isOpen: {
                immediate: true,
                handler(value) {
                    if (value) {
                        $(this.$el).modal('show');
                    }
                }
            }
        },
        methods: {
            setResultsFormFactor(e) {
                console.log(e);
            }
        },
        mounted() {
            var my = this
            $(my.$el).on('hidden.bs.modal', function(e) {
                my.$emit('onChooserClose')
            });
        }
    }
</script>
