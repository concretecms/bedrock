<template>
    <div class="ccm-ui">
        <div class="modal fade" role="dialog" tabindex="-1" id="concrete-welcome-modal">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title"><slot name="title"></slot></h4>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'instanceId'
    ],
    data: () => ({

    }),
    methods: {

    },
    mounted() {
        const welcomeModal = document.getElementById('concrete-welcome-modal');
        const modal = bootstrap.Modal.getOrCreateInstance(welcomeModal);
        if (modal) {
            modal.show();
        }

    }
}
</script>
