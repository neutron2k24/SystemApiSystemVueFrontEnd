<script setup>
    import { ref } from 'vue';
    import EnrolledStudentsTable from './EnrolledStudentsTable.vue';

    const props = defineProps(['courses']);
    const emit = defineEmits(['removeEnrolledStudent','removeCourseEntry','enrollStudent']);

    const editingCourseId = ref(0);

    function editCourse(courseId) {
        editingCourseId.value = courseId;
    }

    function cancelEditing()  {
        editingCourseId.value = 0;
    }

    function enrollStudent(enrollment) {
        emit('enrollStudent', enrollment);
    }

    function removeEnrolledStudent(courseEnrollmentId) {
        emit('removeEnrolledStudent', courseEnrollmentId);
    }
   
</script>

<template>
    <div class="table-responsive w-100">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th width="32"></th>
                    <th>Course Title</th>
                    <th>Qualification</th>
                    <td>&nbsp;</td>
                </tr>
            </thead>
            <tbody v-for="course in courses.results" :key="course.courseId" :class="course.courseId == editingCourseId ? 'success' : ''">
                <tr>
                    <td><button class="btn btn-link collapsed" data-bs-toggle="collapse" :data-bs-target="'#enrolled-students-' + course.courseId"><font-awesome-icon :icon="['fas', 'circle-chevron-right']" /></button></td>
                    <td><input type="text" placeholder="Course Title" v-model="course.title" class="form-control" :disabled="course.courseId != editingCourseId" required /></td>
                    <td>
                        <select v-model="course.qualification" class="form-select" :disabled="course.courseId != editingCourseId" required>
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
                    </td>
                    <td class="text-end" width="120">
                        <!-- edit -->
                        <button class="btn btn-warning mx-1" @click="editCourse(course.courseId)" v-if="editingCourseId == 0"><font-awesome-icon :icon="['fas', 'pencil']" /></button>
                        <!-- delete -->
                        <button class="btn btn-danger" @click="$emit('removeCourseEntry', course.courseId)"  v-if="editingCourseId == 0"><font-awesome-icon :icon="['fas', 'trash']" /></button>

                        <button class="btn btn-success mx-1" @click="$emit('updateCourseDetails', course)" v-if="editingCourseId == course.courseId"><font-awesome-icon :icon="['fas', 'check']" /></button>
                        <button class="btn btn-danger" @click="cancelEditing" v-if="editingCourseId == course.courseId"><font-awesome-icon :icon="['fas', 'close']" /></button>
                    </td>
                </tr>
                <tr :id="'enrolled-students-' + course.courseId" class="collapse">
                    <td></td>
                    <td colspan="3">
                        <EnrolledStudentsTable :course-id="course.courseId" :enrolled-students="course.enrolledStudents" @enroll-student="enrollStudent" @remove-enrolled-student="removeEnrolledStudent" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>