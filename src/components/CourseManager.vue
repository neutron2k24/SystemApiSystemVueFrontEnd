<script setup>
    import { ref } from 'vue';
    import CourseDetailsForm from './CourseDetailsForm.vue';
    import CourseTable from './CourseTable.vue';
    import Pagination from './Pagination.vue';
    import AlertMessage from './AlertMessage.vue';

    import { getJsonObjectFromAPI, postJsonObjectToApi, putJsonObjectToApi, deleteFromApi } from '../fetch-api-functions.js';
    import AppModal from './AppModal.vue';

    //refs
    let loading = ref(false);
    let statusMessage = ref(null);
    let alertType = ref(null);
    let courses = ref([]);
    let courseDetailsForm = ref(null);
    let appModal = ref(null);

    //Pagination
    const pageSize = 10;
    let pager = ref([]);
    let totalPages = ref([0]);
    let pageIndex = ref([0]);

    //Last course entry id we performed an action on
    let lastCourseActionId = -1;

    //Last courseEnrollment
    let lastCourseEnrollmentActionId = -1;

    //get courses on load
    getCourses(0);

    //Retrieve course from API.
    function getCourses(page) {
        statusMessage.value = null;
        loading.value = true;
        getJsonObjectFromAPI('/Courses/?pageIndex=' + page + '&pageSize=' + pageSize + '&includeStudents=true').then(res => {
            if(res != null && res.ok) {
                res.json().then(result => {
                    courses.value = result;
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

    //Add a Course via API.
    function addNewCourse() {
        if (courseDetailsForm.value.title != '' && courseDetailsForm.value.qualification != '') {
            var courseEntry = {
                'title' : courseDetailsForm.value.title,
                'qualification': courseDetailsForm.value.qualification
            }

            postJsonObjectToApi('/Courses', courseEntry).then((res) => {
                if (!res.ok) {
                    statusMessage.value = 'An error occured whilst attempting to create the new course.';
                    alertType.value = 'alert-danger';
                }
                else {
                    statusMessage.value = 'New course was created successfully.';
                    alertType.value = 'alert-success';
                }
                getCourses(pageIndex);
            });
        }
        else {
            statusMessage.value = 'Please complete all required fields.';
            alertType.value = 'danger';
        }
    }

    //Upate a course entry
    function updateCourse(course) {
        putJsonObjectToApi('/Courses', course.courseId, course).then((res) => {
            if (!res.ok) {
                statusMessage.value = 'An error occured whilst attempting to update the course details.';
                alertType.value = 'alert-danger';
            }
            else {
                statusMessage.value = 'Course details were successfully updated.';
                alertType.value = 'alert-success';
            }
            getCourses(pageIndex);
        });
    };

    //Enroll a student
    function enrollStudent(enrollment) {
        postJsonObjectToApi('/CourseEnrollments', enrollment).then((res) => {
            if (res.ok) {
                statusMessage.value = 'Student was successfully enrolled.';
                alertType.value = 'alert-success';
            }
            else if (res.status == 409) {
                statusMessage.value = 'The selected student is already enrolled on the course.';
                alertType.value = 'alert-danger';
            }
            else {
                statusMessage.value = 'An error occured whilst attempting to enroll the student.';
                alertType.value = 'alert-danger';
            }
            getCourses(pageIndex);
        });
    }

    //Remove a course enrollment entry via API
    function removeEnrollment(courseEnrollmentId) {
        if (courseEnrollmentId >= 0) {
            lastCourseEnrollmentActionId = courseEnrollmentId;
            appModal.value.showModal('Remove Course', '<p>Are you sure you wish to remove this student from the course?</p>', true);
        }
    }

    //Remove a course entry via API
    function removeCourse(courseId) {
        if (courseId >= 0) {
            lastCourseActionId = courseId;
            appModal.value.showModal('Remove Course', '<p>Are you sure you wish to remove this entire course? All enrollments will also be deleted.</p>', true);
        }
    }
    
    //Successfully removed course.
    function removalConfirmed() {
        //Remove course
        if (lastCourseActionId > 0) {
            deleteFromApi('/Courses', lastCourseActionId).then((res) => {
                if (!res.ok) {
                    statusMessage.value = 'An error occured attempting to delete the entry. ';
                    alertType.value = 'alert-danger';
                }
                else {
                    statusMessage.value = 'Course and all enrollments deleted successfully.';
                    alertType.value = 'alert-success';
                }
                lastCourseActionId = -1;
                getCourses(0);
            });
        }
        else if (lastCourseEnrollmentActionId > 0) {
            deleteFromApi('/CourseEnrollments', lastCourseEnrollmentActionId).then((res) => {
                if (!res.ok) {
                    statusMessage.value = 'An error occured attempting to remove the student from the course. ';
                    alertType.value = 'alert-danger';
                }
                else {
                    statusMessage.value = 'Student was successfully removed from the course.';
                    alertType.value = 'alert-success';
                }
                lastCourseEnrollmentActionId = -1;
                getCourses(pageIndex);
            });
        }
    }

    //Clear status message
    function clearStatusMessage() {
        statusMessage.value = null;
    }

    //Expose functions
    defineExpose({
        getCourses,
        clearStatusMessage
    });
</script>

<template>
    <section id="course-manager">
        <article>
            <header>
                <h1>Course Manager</h1>
            </header>           

            <AlertMessage ref="alertMessage" :message="statusMessage" :alert-type="alertType" @clear-alert="clearStatusMessage" />
            <div class="preloader" v-if="loading"><img src="/images/preloader.png" /></div>
            <div class="wrapper" v-else>
                <div class="controls">
                    <div class="row align-items-center">
                        <div class="col-11">
                            <CourseDetailsForm ref="courseDetailsForm" @save-course="addNewCourse" />
                        </div>
                        <div class="col-auto text-end">
                            <button id="btn-refresh" class="btn btn-outline-secondary" @click="getCourses(pageIndex)"><font-awesome-icon :icon="['fas', 'arrows-rotate']" /></button>
                        </div>
                    </div>
                </div>

                <CourseTable :courses="courses" @remove-course-entry="removeCourse" @update-course-details="updateCourse" @enroll-student="enrollStudent" @remove-enrolled-student="removeEnrollment" />

                <Pagination ref="pager" :total-pages="totalPages" :page-index="pageIndex" @change-page="getCourses" />

            </div>
        </article>
        <AppModal ref="appModal" @confirmed="removalConfirmed"></AppModal>
    </section>
</template>