<template>
    <div class="modal-header">
        <div class="row w-100 align-items-center">
            <div class="col-md-3 text-center">
                <svg width="100" fill="white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 25 25" enable-background="new 0 0 25 25" xml:space="preserve">
                                <path d="M21.6,15.9c-2.1-2.5-5.4,2.8-7.1,3.9c-1.2,0.8-3,0.9-4.3,0.1c-1.8-1-1.2-3.5,0.6-4.1c1.7-0.5,4.6,1.2,5.6-0.5
                                    c1.3-2.2-3.1-2.7-4.4-2.6c-2.4,0.1-4.6,0.9-6,2.6c-1.5,1.9-1.2,4.3,0.5,6c1.7,1.6,4.2,2.3,6.6,2.1c0.6-0.1,1.7-0.3,2.5-0.8
                                    C17.1,21.8,22,16.4,21.6,15.9z M6.1,14C7,14.2,5.4,9.6,5.3,9C5.1,8.2,4.9,7.2,4.1,7C3.2,6.9,3,7.9,3.2,8.8C3.4,9.7,5.4,13.9,6.1,14z
                                     M12.9,11.7c1.3,0.2,1.2-5.9,1.2-6.7c0-0.7,0.3-2.8-0.7-3c-1.4-0.3-1.5,1.5-1.5,2.5C11.9,5.4,11.6,11.5,12.9,11.7z M15.9,12.6
                                    c1.4,0.6,2.4-5.6,2.6-6.4c0.2-0.8,0.2-2.5-1.2-2c-0.7,0.3-0.8,1.4-0.9,2C16.2,7.1,14.9,12.2,15.9,12.6z M9.3,12.1
                                    c1.6,0.1,0.1-6.1,0-6.9C9.1,4.4,8.5,2.7,7.4,3.7C6.8,4.2,7.1,5.3,7.2,6C7.3,6.8,8.1,12,9.3,12.1z"/>
                                </svg>
            </div>
            <div class="col-md-9">
                <h4 class="modal-title">{{title}}</h4>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
    data: () => ({
    })
}
</script>
