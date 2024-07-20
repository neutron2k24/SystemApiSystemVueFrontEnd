<script setup>
    import { ref } from 'vue';

    const props = defineProps(['students']);
    const emit = defineEmits(['updateStudentDetails','removeStudentEntry']);

    const editingStudentId = ref(0);

    function editStudent(studentId) {
        editingStudentId.value = studentId;
    }

    function cancelEditing() {
        editingStudentId.value = 0;
    }
</script>

<template>
    <div class="table-responsive w-100">
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>Forename</th>
                    <th>Surname</th>
                    <th>Gender</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in students.results" :key="student.studentId" :class="student.studentId == editingStudentId ? 'success' : ''">
                    <td><input type="text" placeholder="Forename" v-model="student.forename" class="form-control" :disabled="student.studentId != editingStudentId" required /></td>
                    <td><input type="text" placeholder="Surname" v-model="student.surname" class="form-control" :disabled="student.studentId != editingStudentId" required /></td>
                    <td>
                        <select v-model="student.gender" class="form-select" :disabled="student.studentId != editingStudentId" required>
                            <option selected disabled value="">Gender...</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </td>
                    <td><input type="email" placeholder="Email Address" v-model="student.emailAddress" class="form-control" :disabled="student.studentId != editingStudentId" required /></td>
                    <td class="text-end" width="120">
                        <!-- edit -->
                        <button class="btn btn-warning mx-1" @click="editStudent(student.studentId)" v-if="editingStudentId == 0"><font-awesome-icon :icon="['fas', 'pencil']" /></button>
                        <!-- delete -->
                        <button class="btn btn-danger" @click="$emit('removeStudentEntry', student.studentId)" v-if="editingStudentId == 0"><font-awesome-icon :icon="['fas', 'trash']" /></button>

                        <button class="btn btn-success mx-1" @click="$emit('updateStudentDetails', student)" v-if="editingStudentId == student.studentId"><font-awesome-icon :icon="['fas', 'check']" /></button>
                        <button class="btn btn-danger" @click="cancelEditing" v-if="editingStudentId == student.studentId"><font-awesome-icon :icon="['fas', 'close']" /></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>