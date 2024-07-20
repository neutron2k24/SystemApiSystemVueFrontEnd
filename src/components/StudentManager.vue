<script setup>
    import { ref } from 'vue';
    import StudentTable from './StudentTable.vue';
    import Pagination from './Pagination.vue';
    import AppModal from './AppModal.vue';
    import AlertMessage from './AlertMessage.vue';
    import StudentDetailsForm from './StudentDetailsForm.vue';
    import { getJsonObjectFromAPI, postJsonObjectToApi, putJsonObjectToApi, deleteFromApi } from '../fetch-api-functions.js';

    //refs
    const loading = ref(false);
    let students = ref([]);
    let statusMessage = ref(null);
    let alertType =ref(null);
    let appModal = ref(null);
    let studentDetailsForm = ref(null);

    //Pagination
    const pageSize = 10;
    let pager = ref([]);
    let totalPages = ref([0]);
    let pageIndex = ref([0]);

    //Last student entry id we performed an action on
    let lastStudentActionId = -1;

    //get students on load
    getStudents(0);

    //Retrieve students from API.
    function getStudents(page) {
        loading.value = true;
       
        getJsonObjectFromAPI('/Students/?pageIndex=' + page + ' & pageSize=' + pageSize + '&includeEnrollments=false').then(res => {
            if(res != null && res.ok) {
                res.json().then(result => {
                    students.value = result;
                    pageIndex = result.pageIndex;
                    totalPages = result.pageCount;
                    setTimeout(() => {
                        loading.value = false;
                    },2000);
                });
            }
            else {
                statusMessage.value = 'An error occured accessing the API. Please eensure you have the correct Url and Key specified in the settings tab.';
                alertType.value = 'alert-danger';
            }  
        });
    }

    //Add a Student via API.
    function addNewStudent() {
        if (studentDetailsForm.value.forename != '' && studentDetailsForm.value.surname != '' && studentDetailsForm.value.email != '' &&
        studentDetailsForm.value.gender != '' && studentDetailsForm.value.dateOfBirth != '') {
            var student = {
                'forename' : studentDetailsForm.value.forename,
                'surname': studentDetailsForm.value.surname,
                'dateOfBirth': studentDetailsForm.value.dateOfBirth,
                'gender': studentDetailsForm.value.gender,
                'emailAddress': studentDetailsForm.value.email
            }

            console.log(student);
            postJsonObjectToApi('/Students', student).then((res) => {
                console.log(res);
                if (!res.ok) {
                    statusMessage.value = 'An error occured whilst attempting to create the new student.';
                    alertType.value ='alert-danger';
                }
                else {
                    statusMessage.value = 'New student was created successfully.';
                    alertType.value ='alert-success';
                }
                getStudents(pageIndex);
            });
        }
        else {
            statusMessage.value = 'Please complete all required fields.';
            alertType.value ='danger';
        }
    }

    //Upate a student entry
    function updateStudent(student) {
        putJsonObjectToApi('/Students', student.studentId, student).then((res) => {
            if (!res.ok) {
                statusMessage.value = 'An error occured whilst attempting to update the students details.';
                alertType.value ='alert-danger';
            }
            else {
                statusMessage.value = 'Students details were successfully updated.';
                alertType.value ='alert-success';
            }
            getStudents(pageIndex);
        });
    };

     //Remove a diary entry via API
     function removeStudent(studentId) {
         if (studentId >= 0) {
             lastStudentActionId = studentId;
             appModal.value.showModal('Remove Student', '<p>Are you sure you wish to remove this student? All enrollments will also be deleted.</p>', true);
         }
     }
 
     //Successfully removed course.
     function removalConfirmed() {
         if (lastStudentActionId >= 0) {
             deleteFromApi('/Students', lastStudentActionId).then((res) => {
                 if (!res.ok) {
                     alert('An error occured attempting to delete the entry. ');
                 }

                 lastStudentActionId = -1;
                 getStudents(0);
             });
         }
     }


    //Clear status message
    function clearStatusMessage() {
        statusMessage.value = null;
    }

    //Expose functions
    defineExpose({
        getStudents,
        clearStatusMessage
    });
</script>

<template>
    <section id="student-manager">
        <article>
            <header>
                <h1>Student Manager</h1>
            </header>
            <AlertMessage ref="alertMessage" :message="statusMessage" :alert-type="alertType" @clear-alert="clearStatusMessage" />
            <div class="preloader" v-if="loading"><img src="@/assets/preloader.png" /></div>
            <div class="wrapper" v-else>

                <div class="controls">
                    <div class="row">
                        <div class="col-11">
                            <StudentDetailsForm ref="studentDetailsForm" @save-student="addNewStudent" />
                        </div>
                        <div class="col-auto text-end">
                            <button id="btn-refresh" class="btn btn-outline-secondary" @click="getStudents(pageIndex)"><font-awesome-icon :icon="['fas', 'arrows-rotate']" /></button>
                        </div>
                    </div>
                </div>

                <StudentTable :students="students" @remove-student-entry="removeStudent" @update-student-details="updateStudent" />
                <Pagination ref="pager" :total-pages="totalPages" :page-index="pageIndex" @change-page="getStudents" />
            </div>
        </article>
        <AppModal ref="appModal" @confirmed="removalConfirmed"></AppModal>
    </section>
</template>