<template functional>
    <span @click='listeners.click'>
        <Icon 
            :icon="!props.checked || props.checked == null ? props.toggleDefaultIcon : props.toggleCheckedIcon" 
            :color="props.checked ? props.iconCheckedColor : props.iconDefaultColor" 
            :label-position="props.labelPosition" 
            :iconType="props.iconType"
        >
            <slot>{{!props.checked || props.checked == null ? props.toggleDefaultLabel : props.toggleCheckedLabel == null ? props.toggleDefaultLabel : props.toggleCheckedLabel }}</slot>
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
    components: {
        Icon
    },
    computed: {
        iconName() {
            return !this.checked || this.checked == null ? this.toggleDefaultIcon : this.toggleCheckedIcon
        }
    }
}
</script>