<script setup>
    import { ref } from 'vue';

    const props = defineProps(['message', 'alertType']);

</script>

<template>
    <div class="alert alert-dismissible fade show" :class="alertType" v-if="message != null">{{message}}  <button type="button" class="btn-close" @click="$emit('clearAlert')" data-bs-dismiss="alert" aria-label="Close"></button></div>
</template>