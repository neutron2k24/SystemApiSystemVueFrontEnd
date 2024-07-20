<script setup>

    import { ref } from 'vue';
    import { getJsonObjectFromAPI } from '../fetch-api-functions.js';

    const props = defineProps(['courseId', 'enrolledStudents']);
    const emit = defineEmits(['enrollStudent'])

    let students = ref([]);
    let selectedStudent = ref(null);

    //get students on load
    getStudents(0);

    //Retrieve course from API.
    function getStudents(page) {
        getJsonObjectFromAPI('/Students/?pageIndex=0&pageSize=0&includeEnrollments=false').then(result => {
            students.value = result;
        });
    }

    function enrollStudent() {
;        if (selectedStudent.value != '') {
            emit('enrollStudent', { courseId: props.courseId, studentId: selectedStudent.value });
        }
    }

</script>

<template>
    <section class="enrolled-students">
        <div class="card my-3">
            <div class="card-header">Enroll New Student</div>
            <div class="card-body">
                <form @submit.prevent class="px-0 mx-0">
                    <div class="row px-0 mx-0 my-0">
                        <div class="col-lg-4">
                            <select v-model="selectedStudent" class="form-select" required>
                                <option value="" selected disabled>Select Student...</option>
                                <option v-for="student in students.results" :key="student.studentId" :value="student.studentId">{{ student.forename }} {{ student.surname }}</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-secondary" @click='enrollStudent'><font-awesome-icon :icon="['fas', 'plus-circle']" /> Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card">
            <div class="card-header">Enrolled Students</div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover table-striped table-bordered">
                        <tr>
                            <th>Forename</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th width="50"></th>
                        </tr>
                        <tr v-for="enrolledStudent in enrolledStudents" :key="enrolledStudent.courseEnrollmentId">
                            <td>{{enrolledStudent.student.forename}}</td>
                            <td>{{enrolledStudent.student.surname}}</td>
                            <td>{{enrolledStudent.student.emailAddress}}</td>
                            <td><button class="btn btn-link text-red" @click="$emit('removeEnrolledStudent', enrolledStudent.courseEnrollmentId)"><font-awesome-icon :icon="['fas', 'trash']" /></button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </section>

</template>

<style rel="scoped">
    
</style>