import ConcreteGroupInput from "../../assets/cms/components/form/ConcreteGroupInput.vue";
import {action} from "@storybook/addon-actions";

window.ConcreteUserGroupManager = {
    getGroupDetails(id, success, failure) {
        success({
            groups: [
                {
                    gID: id,
                    gDisplayName: 'Example'
                }
            ]
        })
    },
    launchDialog(callback) {
        callback({
            gID: 1,
            gDisplayName: 'Example'
        })
    }
}

export default {
    title: 'Forms/ConcreteGroupInput',
    component: ConcreteGroupInput,
}

export const basicUsage = {
    args: {
        inputName: 'Label',
        groupId: 0,
        chooseText: 'Choose a Group',
        readonly: false,
        onChange: action('change'),
    }
}
export const preSelected = {
    args: {
        inputName: 'Label',
        groupId: 50,
        chooseText: 'Choose a Group',
        readonly: false,
        onChange: action('change'),
    }
}