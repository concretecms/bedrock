<template>
    <tr>
        <td>
            <span v-if="hasStartDate">
                {{startDate}}
            </span>
            <span v-else class="text-muted">
                {{ i18n.noStartDate }}
            </span>
            <span v-if="hasStartDate && hasEndDate">
                –
                {{endDate}}
            </span>
        </td>
        <td>{{rule.slot}}</td>
        <td>
            <div>{{rule.name}} (<a data-dialog="preview" href="javascript:void(0)" @click="showPreview">{{ i18n.preview }}</a>)</div>
            <div class="fw-light font-italic">{{rule.actionDescription}}</div>
        </td>
        <td class="align-middle">
            <a href="javascript:void(0)" @click="$emit('delete', rule)" class="ccm-hover-icon" v-if="showDeleteControls && rule.canDeleteRule">
                <i class="far fa-times-circle"></i>
            </a>
            <div style="display: none;">
                <div :id="'preview-container-' + rule.id">
                    <iframe v-if="previewLoaded" class="instance-rule-preview-frame" :src="previewUrl"></iframe>
                </div>
            </div>
        </td>
    </tr>
</template>
<style lang="scss" scoped>
.instance-rule-preview-frame {
  border: 0;
  height: 100%;
  width: 100%;
}
</style>
<script>
export default {
    props: {
        rule: Object,
        showDeleteControls: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        i18n: {
            noStartDate: 'No Start Date',
            preview: 'Preview'
        },
        previewLoaded: false
    }),
    methods: {
        showPreview() {
            var my = this

            if (!this.previewLoaded) {
                this.previewLoaded = true
            }

            $.fn.dialog.open({
                width: '90%',
                height: '70%',
                title: this.i18n.preview,
                element: '#preview-container-' + my.rule.id
            })
        }
    },
    computed: {
        previewUrl: function() {
            return CCM_DISPATCHER_FILENAME + '/ccm/system/board/instance/preview_rule/' + this.rule.id
        },
        hasStartDate: function() {
            return this.rule.startDate > 0
        },
        hasEndDate: function() {
            return this.rule.endDate > 0
        },
        startDate: function() {
            if (this.rule.startDate > 0) {
                var date = new Date(this.rule.startDate * 1000); // Note: this currently does not take into account timezone. We used to use moment but it was too much.
                return date.toLocaleString() + ' (' + this.rule.timezone + ')'
            }
        },
        endDate: function() {
            if (this.rule.endDate > 0) {
                var date = new Date(this.rule.endDate * 1000); // Note: this currently does not take into account timezone. We used to use moment but it was too much.
                return date.toLocaleString() + ' (' + this.rule.timezone + ')'
            }
        }
    },
    mounted() {
        if (window.ccmi18n_boards) {
            for (const key in this.i18n) {
                if (window.ccmi18n_boards[key]) {
                    this.i18n[key] = window.ccmi18n_boards[key]
                }
            }
        }
    }
}
</script>
