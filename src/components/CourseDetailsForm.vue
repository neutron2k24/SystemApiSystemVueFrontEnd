<script setup>
    import { ref } from 'vue';

    //define refs
    const title = ref('');
    const qualification = ref('');

    //Expose props
    defineExpose({
        title,
        qualification
    });
</script>

<template>
    <form id="add-course" @submit.prevent>
        <div class="row gy-2 gx-3 align-items-center">
            <div class="col-auto">
                <input v-model="title" type="text" class="form-control" placeholder="Course Title" required />
            </div>
            <div class="col-auto">
                <select v-model="qualification" class="form-select" required>
                    <option selected disabled value="">Qualification...</option>
                    <option>BA (Hons)</option>
                    <option>BSc (Hons)</option>
                    <option>BEng (Hons)</option>
                    <option>BEd (Hons)</option>
                    <option>LLB</option>
                    <option>HNC</option>
                    <option>HND</option>
                    <option>BTEC</option>
                    <option>A Level</option>
                </select>
            </div>
            <div class="col-auto">
                <button @click="$emit('saveCourse')" class="btn btn-secondary"><font-awesome-icon :icon="['fas', 'circle-plus']" /> Add Course</button>
            </div>
        </div>
    </form>

</template>