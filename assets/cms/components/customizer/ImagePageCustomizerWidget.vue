<template>
    <flyout-menu :label="styleValue.style.name">
        <template v-slot:icon>
            <i :class="{'fas': true, 'fa-image': true, 'text-black-50': !imageURL && !imageFileID, 'text-primary': imageFileID > 0}"></i>
        </template>
        <template v-slot:content>
            <concrete-file-input :file-id="imageFileID" @change="value => imageFileID = value" :choose-text="i18n.chooseImageText"
                                 input-name="imageFileID"></concrete-file-input>
            <div class="mt-2" v-if="imageURL">
                <small class="text-muted">{{ i18n.currentlyUsingText.replace(/%s/g, imageURL) }}</small>
            </div>
        </template>
    </flyout-menu>
</template>

<script>
import ConcreteFileInput from '../../components/form/ConcreteFileInput.vue'
import FlyoutMenu from './flyout/FlyoutMenu.vue'

export default {
    components: {
        ConcreteFileInput,
        FlyoutMenu
    },
    watch: {
        imageFileID: function() {
            this.componentUpdated()
        }
    },
    data() {
        return {
            i18n: {
                chooseImageText: 'Choose Image',
                currentlyUsingText: 'Currently using %s'
            },
            imageURL: this.styleValue.value.imageURL, // this is the default one passed in,
            imageFileID: this.styleValue.value.imageFileID
        }
    },
    methods: {
        componentUpdated: function () {
            this.$emit('update', {
                variable: this.styleValue.style.variable,
                value: {
                    imageURL: this.imageURL,
                    imageFileID: this.imageFileID
                }
            })
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
    },
    props: {
        styleValue: {
            type: Object
        }
    }
}
</script>
