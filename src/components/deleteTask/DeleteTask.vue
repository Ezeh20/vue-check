<script setup>
import { refreshTasks } from '@/utils/refresh';
import { defineProps } from 'vue';
const props = defineProps({
     db: Object,
     idx: Number
})

const { db, idx } = props
const handleDeleteTask = () => {
     db.tasks.splice(idx, 1);
     localStorage.setItem("tasks-check-xyz", JSON.stringify(db.tasks));
     refreshTasks();
};
</script>

<template>
     <span class="pi pi-trash icn-delete" @click="handleDeleteTask()"></span>
</template>
