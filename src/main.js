import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faCirclePlus, faTrash, faArrowsRotate, faPencil, faCheck, faClose, faChevronRight, faCircleChevronRight, faGear, faGraduationCap, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faCirclePlus, faTrash, faArrowsRotate, faPencil, faCheck, faClose, faChevronRight, faCircleChevronRight, faGear, faGraduationCap, faUser);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
