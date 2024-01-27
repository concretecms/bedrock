import IconButton, { types as buttonTypes } from '../../assets/cms/components/IconButton.vue'
import { types, icons } from '../../assets/cms/components/iconlist'
import { action } from '@storybook/addon-actions';

const flatTypes = {}
for (let i in icons) {
    for (let ii in icons[i]) {
        flatTypes[`${i}.${ii}`] = icons[i][ii]
    }
}

export default {
    title: 'Basics/IconButton',
    component: IconButton,
    tags: ['autodocs'],
    render: (args) => ({
        components: {IconButton},
        setup: () => ({ args, click: action('click') }),
        template: '<IconButton @click="click" v-bind="args">{{args.content}}</IconButton>',
    }),
    argTypes: {
        type: {
            description: "The type of button, pulls from `IconButton.vue`",
            options: buttonTypes,
            control: 'select'
        },
        disabled: {
            description: "HTML disabled attribute"
        },
        icon: {
            description: "The icon to use, pulls from `iconlist.js`",
            options: flatTypes,
            control: 'select',
        },
        iconType: {
            description: "The type of icon to use, pulls from `iconlist.js`",
            options: types,
            control: 'select'
        },
        labelPosition: {
            description: "Which side to put the label on",
            options: ["left", "right"],
            control: 'radio'
        },
        buttonType: {
            description: "HTML button type",
            options: ["button", "submit", "reset"],
            control: 'radio'
        },
        buttonClass: {
            description: "Additional classes to apply to this button",
            control: 'text'
        },
    },
}

export const withLabel = {
    args: {
        type: buttonTypes.cancel,
        buttonType: 'reset',
        icon: icons.fas.times,
        iconType: types.fas,
        content: "Cancel",
    }
}


export const iconButton = {
    args: {
        type: buttonTypes.add,
        disabled: false,
        icon: icons.fas.trashAlt,
        iconType: types.fas,
    }
}
export const disabled = {
    args: {
        type: buttonTypes.add,
        disabled: true,
        icon: icons.fas.trashAlt,
        iconType: types.fas,
    }
}

export const allButtonTypes = {
    render: () => ({
        components: {IconButton},
        setup: () => ({types: buttonTypes, click: action('click')}),
        template: `
            <div class='ccm-ui'>
                <div class='d-flex relative'>
                    <div class='d-flex flex-column h-full justify-content-end'>
                        <div class='btn btn-text mb-2'>Regular</div>
                        <div class='btn btn-text mb-2'>Active</div>
                        <div class='btn btn-text mb-2'>Disabled</div>
                    </div>
                    <div class='ms-2 d-flex flex-column' v-for='(type, idx) in types'>
                        <div class='d-flex align-items-baseline justify-content-end'>
                            <IconButton button-class='mb-2' @click='click' v-bind='{type}' icon='trash' icon-type='fas'>{{ type[0].toUpperCase() + type.substr(1) }}</IconButton>
                        </div>
                        <div class='d-flex align-items-baseline justify-content-end'>
                            <IconButton button-class='mb-2 active' @click='click' v-bind='{type}' icon='trash' icon-type='fas'>{{ type[0].toUpperCase() + type.substr(1) }}</IconButton>
                        </div>
                        <div class='d-flex align-items-baseline justify-content-end'>
                            <IconButton button-class='mb-2 disabled' disabled @click='click' v-bind='{type}' icon='trash' icon-type='fas'>{{ type[0].toUpperCase() + type.substr(1) }}</IconButton>
                        </div>
                    </div>
                </div>
            </div>
        `,

    })
}