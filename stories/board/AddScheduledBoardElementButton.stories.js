import AddScheduledBoardElementButton from "../../assets/cms/components/AddScheduledBoardElementButton.vue";

export default {
    component: AddScheduledBoardElementButton,
    title: 'Boards/AddScheduledBoardElementButton',
    decorators: [
        () => ({
            template: `
                <div>
                    <story />
                    <div class="modal" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    Example Modal
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
        })
    ]
}

export const basicUsage = {
    args: {
        disabled: false,
        buttonText: 'foo',
        modalTarget: '.modal'
    },
}
