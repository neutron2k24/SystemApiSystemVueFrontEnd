<script setup>
    import { ref } from 'vue';

    const props = defineProps(['pageIndex', 'totalPages']);

</script>


<template>
    <nav>
        <ul class="pagination">
            <li v-for="index in totalPages"  class="page-item" :key="index" :class="index-1 == pageIndex ? 'active' : ''"><button @click="$emit('changePage', index-1)" class="page-link">{{index}}</button></li>
        </ul>
    </nav>
</template>