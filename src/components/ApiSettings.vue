<script setup>
    import { ref } from 'vue';
    import { setApiSettings, apiKey, apiAddress } from '../fetch-api-functions.js';
    import AlertMessage from './AlertMessage.vue';

    let currentApiKey = ref('');
    let currentApiUrl = ref('');

    currentApiKey = apiKey;
    currentApiUrl = apiAddress;

    let statusMessage = ref(null);
    let alertType = ref(null);

    function configureApi() {
        setApiSettings(currentApiUrl, currentApiKey);
        statusMessage.value = "API Settings Applied for browser window. If you refresh the page, you will need to apply these settings.";
        alertType.value = "alert-success";
    }

    //Clear status message
    function clearStatusMessage() {
        statusMessage.value = null;
    }

    //Expose functions
    defineExpose({
        clearStatusMessage
    });
</script>

<template>
    <section class="api-settings">
        <header>
            <h1>API Settings</h1>
        </header>
        
        <AlertMessage ref="alertMessage" :message="statusMessage" :alert-type="alertType" @clear-alert="clearStatusMessage" />

        <form @submit=prevent.default></form>
        <div class="form-group my-3">
            <label>API Url: </label>
            <input type="text" v-model="currentApiUrl" placeholder="API Url" class="form-control" />
        </div>

        <div class="form-group my-3">
            <label>API Key: </label>
            <input type="text" v-model="currentApiKey" placeholder="API Key" class="form-control" />
        </div>

        <div class="form-group">
            <button @click="configureApi" class="btn btn-primary">Set</button>
        </div>
    </section>
</template>