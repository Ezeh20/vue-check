<script setup>
import { defineProps } from 'vue';

const props = defineProps({
     db: Object,
     idx: Number
})

const { db, idx } = props
const handleDeleteTask = () => {
     const confirm = window.confirm("Do you want to delete this task?")

     if (confirm) {
          db.tasks.splice(idx, 1);
          localStorage.setItem("tasks-check-xyz", JSON.stringify(db.tasks));
     }
};
</script>


<template>
     <span class="pi pi-trash icn-delete" @click="handleDeleteTask(idx)"></span>
</template>