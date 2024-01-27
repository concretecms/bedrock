<template>
    <concrete-ajax-select
        :name="inputName"
        :access-token="accessToken"
        :css-classes="['ccm-form-select-user']"
        :data-source-url="dataSourceUrl"
        :selected-options-url="selectedOptionsUrl"
        :value="userId"
        @change="updateSelected"
        :form-data="formData"
    >
    </concrete-ajax-select>
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect */
import ConcreteAjaxSelect from './ConcreteAjaxSelect.vue'
export default {
    components: { ConcreteAjaxSelect },
    prop: ['userId'],
    model: {
        prop: 'userId',
        event: 'change'
    },
    props: {
        includeAvatar: {
            type: Boolean,
            default: false
        },
        labelFormat: {
            type: String,
            default: 'auto'
        },
        accessToken: {
            type: String,
            required: true
        },
        inputName: {
            type: String
        },
        userId: {
            type: [Number, String, Array],
            required: false
        }
    },
    computed: {
        formData() {
            return {
                labelFormat: this.labelFormat,
                includeAvatar: this.includeAvatar,
                userId: this.userId
            }
        }
    },
    data() {
        return {
            dataSourceUrl: CCM_DISPATCHER_FILENAME + '/ccm/system/user/autocomplete',
            selectedOptionsUrl: CCM_DISPATCHER_FILENAME + '/ccm/system/user/autocomplete/get_selected',
            selectedUserId: null
        }
    },
    watch: {
        userId: {
            immediate: true,
            handler: function(userId) {
                this.selectedUserId = userId
            }
        }
    },
    methods: {
        updateSelected(value) {
            this.selectedUserId = value
            this.$emit('change', this.selectedUserId)
        },
        renderOption(item) {
            var option = '<div>'

            if (item.avatar) {
                option += `<div class="ccm-form-select-user-avatar">
                                <img src="${item.avatar}"/>
                           </div>`
            }

            option += '<div>'
            option += `<div class="ccm-form-select-user-label-primary">
                            ${escape(item.primary_label)}
                       </div>`

            if (item.secondary_label) {
                option += `<div class="ccm-form-select-user-label-secondary text-secondary">
                               ${escape(item.secondary_label)}
                           </div>`
            }

            option += '</div>'
            option += '</div>'
            return option
        }
    }
}
</script>
<style lang="scss">
.ccm-form-select-user {
  .item,
  .option {
    align-items: center;
    display: flex;
  }

  .ccm-form-select-user-label-secondary {
    font-size: 0.8rem;
  }

  .ccm-form-select-user-avatar {
    flex: 0 0 20px; // Ensure this is at least 30px wide
    margin-right: 12px;

    img {
      border-radius: 50%;
      height: auto;
      max-width: 100%;
    }
  }
}
</style>
