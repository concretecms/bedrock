<template functional>
    <span>
        <Icon 
            :icon="!props.checked || props.checked == null ? props.toggleDefaultIcon : props.toggleCheckedIcon" 
            :color="props.checked ? props.iconCheckedColor : props.iconDefaultColor" 
            :label-position="props.labelPosition" 
            :iconType="props.iconType"
            @click="toggleAction"
        >
            <slot>{{!props.checked || props.checked == null ? props.toggleDefaultLabel : props.toggleCheckedLabel ? props.toggleCheckedLabe:props.toggleDefaultLabel}}</slot>
        </Icon>
    </span>
</template>

<script>
import Icon from './Icon'

export default {
    props: {
        toggleCheckedLabel: String,
        toggleDefaultLabel: String,
        toggleCheckedIcon: String,
        toggleDefaultIcon: String,
        labelPosition: String,
        checked: Boolean,
        iconDefaultColor: String,
        iconCheckedColor: String,
        iconType: String
    },
    methods: {
        toggleAction() {
            console.log('clicked!!!!!')
        }
    },
    components: {
        Icon
    }
}
</script>