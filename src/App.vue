<script setup>
import { onMounted } from 'vue';
import TasksComponent from './components/tasks/TasksComponent.vue';

onMounted(() => {
  const existingTasks = localStorage.getItem("tasks-check-xyz");
  if (!existingTasks) {
    localStorage.setItem("tasks-check-xyz", JSON.stringify([]));
  }
});

</script>

<template>
    <TasksComponent />
</template>