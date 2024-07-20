<script setup>
    import { onMounted, ref } from 'vue';
    import * as bootstrap from 'bootstrap';
    import { Modal } from 'bootstrap';

    const emit = defineEmits(['confirmed', 'cancel']);
    defineExpose({ showModal });

    let modal = null;
    let bsModal = ref(null);

    const title = ref('Title');
    const message = ref('Message');
    const showAccept = ref('HasAccept');

    onMounted(() => {
        modal = new Modal(bsModal.value);
    })

    function showModal(name, msg, hasAccept) {
        title.value = name;
        message.value = msg;
        showAccept.value = hasAccept;
        modal.show();
    }

    function cancel() {{
        modal.hide();
        emit('cancel');
    }}

    function confirm() {
        modal.hide();
        emit('confirmed');
    }
</script>

<template>
    <div ref="bsModal" class="modal fade text-white" tabindex="-1" data-bs-theme="dark">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" @click="cancel" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <span v-html="message"></span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
                    <button v-if="showAccept" type="button" class="btn btn-danger" @click="confirm">Accept</button>
                </div>
            </div>
        </div>
    </div>
</template>