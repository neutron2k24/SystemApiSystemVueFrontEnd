<script setup>    
    
    import { ref } from 'vue';
    import ApiSettings from './components/ApiSettings.vue';
    import CourseManager from './components/CourseManager.vue';
    import StudentManager from './components/StudentManager.vue';
    import { getJsonObjectFromAPI, postJsonObjectToApi, deleteFromApi } from './fetch-api-functions.js';

    const courseManager = ref(null);
    const studentManager = ref(null);
    const apiSettings = ref(null);

    function loadSettings() {
        apiSettings.value.clearStatusMessage();
    }

    function loadCourses() {
        courseManager.value.clearStatusMessage();
        courseManager.value.getCourses(0);
    }

    function loadStudents() {
        studentManager.value.clearStatusMessage();
        studentManager.value.getStudents(0);
    }
</script>

<template>
    <div class="container-fluid bg-white px-0">
        <header id="site-header" class="px-3 py-5">
            <div class="row">
                <div class="col-6">
                    <img src="@/assets/logo.png" alt="Student Plus" class="img-fluid" />
                </div>
            </div>
        </header>

        <section id="main" class="p-3">
            <div class="row">
                <div class="col-lg-2">
                    <ul id="tabs" class="nav flex-lg-column">
                        <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#students-tab-pane" @click="loadStudents()"><font-awesome-icon :icon="['fas', 'user']" /> Students</button></li>
                        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#courses-tab-pane" @click="loadCourses()"><font-awesome-icon :icon="['fas', 'graduation-cap']" /> Courses</button></li>
                        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#settings-tab-pane" @click="loadSettings()"><font-awesome-icon :icon="['fas', 'gear']" /> Settings</button></li>
                    </ul>
                </div>
                <div class="col-lg-10">
                    <section id="tab-content" class="tab-content">
                        <div class="tab-pane fade show active" id="students-tab-pane">
                            <StudentManager ref="studentManager" />
                        </div>

                        <div class="tab-pane fade" id="courses-tab-pane">
                            <CourseManager ref="courseManager" />
                        </div>

                        <div class="tab-pane fade" id="settings-tab-pane">
                            <ApiSettings ref="apiSettings" />
                        </div>
                    </section>
                </div>
            </div>
        </section>

    </div>
</template>

<style scoped>


</style>
