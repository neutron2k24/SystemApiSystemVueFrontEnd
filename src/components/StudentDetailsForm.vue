<script setup>
    import { ref } from 'vue';

    //define refs
    const forename = ref('');
    const surname = ref('');
    const email = ref('');
    const dateOfBirth = ref('');
    const gender = ref('');

    //Expose props
    defineExpose({
        forename,
        surname,
        email,
        dateOfBirth,
        gender
    });
</script>

<template>
    <form id="add-student" @submit.prevent>
        <div class="row gy-2 gx-3 align-items-center">
            <div class="col col-auto">
                <input v-model="forename" type="text" class="form-control" placeholder="Forename" required />
            </div>
            <div class="col-auto">
                <input v-model="surname" type="text" class="form-control" placeholder="Surname" required />
            </div>
            <div class="col-auto">
                <select v-model="gender" class="form-select" required>
                    <option selected disabled value="">Gender...</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
            <div class="col-auto">
                <input v-model="dateOfBirth" type="date" class="form-control" placeholder="Date Of Birth" required />
            </div>
            <div class="col-3">
                <input v-model="email" type="email" class="form-control" placeholder="Email Address" required />
            </div>
            <div class="col-auto">
                <button @click="$emit('saveStudent')" class="btn btn-secondary"><font-awesome-icon :icon="['fas', 'circle-plus']" /> Add Student</button>
            </div>
        </div>
    </form>

</template>