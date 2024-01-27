<template>
    <div>
        <table class="table">
            <thead>
            <tr>
                <th style="width: 30%;">{{ i18n.dateAndTime }}</th>
                <th style="width: 10%;">{{ i18n.slot }}</th>
                <th style="width: 60%;">{{ i18n.name }}</th>
                <th></th>
            </tr>
            </thead>
            <transition-group name="concrete-delete-item" tag="tbody">
                <tr is="board-instance-rule" v-for="(rule, index) in publishedRules" :key="rule.id"
                                     v-on:delete="deleteRule(rule, index)" :rule="rule"
                                     :show-delete-controls="true"></tr>
            </transition-group>
        </table>

        <div v-if="draftRules.length" class="mt-4">
            <h5>{{ i18n.unpublishedRules }}</h5>

            <table class="table">
                <thead>
                <tr>
                    <th style="width: 30%;">{{ i18n.dateAndTime }}</th>
                    <th style="width: 10%;">{{ i18n.slot }}</th>
                    <th style="width: 60%;">{{ i18n.name }}</th>
                    <th></th>
                </tr>
                </thead>
                <transition-group name="concrete-delete-item" tag="tbody">
                    <tr is="board-instance-rule" v-for="(rule, index) in draftRules" :key="rule.id"
                        v-on:delete="deleteRule(rule, index)" :rule="rule"
                        :show-delete-controls="true"></tr>
                </transition-group>
            </table>
        </div>
    </div>
</template>
<script>
/* eslint-disable no-new */
/* eslint eqeqeq: 0 */
import BoardInstanceRule from './BoardInstanceRule.vue'

export default {
    components: {
        BoardInstanceRule
    },
    props: {
        rules: Array
    },
    data: () => ({
        i18n: {
            dateAndTime: 'Date & Time',
            slot: 'Slot',
            name: 'Name',
            unpublishedRules: 'Unpublished Rules'
        }
    }),
    computed: {
        publishedRules: function() {
            var publishedRules = []
            this.rules.forEach(function(rule) {
                if (rule.slot > 0) {
                    publishedRules.push(rule)
                }
            })
            return publishedRules
        },
        draftRules: function() {
            var draftRules = []
            this.rules.forEach(function(rule) {
                if (rule.slot == 0) {
                    draftRules.push(rule)
                }
            })
            return draftRules
        }
    },
    methods: {
        deleteRule(rule, index) {
            if (this.$listeners.delete) {
                this.$emit('delete', rule)
            } else {
                var my = this
                new ConcreteAjaxRequest({
                    url: CCM_DISPATCHER_FILENAME + '/ccm/system/board/instance/delete_rule',
                    data: {
                        boardInstanceSlotRuleID: rule.id,
                        ccm_token: CCM_SECURITY_TOKEN
                    },
                    success: function (r) {
                        my.rules.forEach(function(thisRule, index) {
                            if (thisRule.id === rule.id) {
                                my.rules.splice(index, 1)
                            }
                        })
                    }
                })
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
