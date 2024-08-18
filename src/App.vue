<script setup>
import { onMounted } from 'vue';
import SearchInput from './components/search/SearchInput.vue';
import TasksComponent from './components/tasks/TasksComponent.vue';

onMounted(() => {
  const tasks = [];
  localStorage.setItem("tasks-check-xyz", JSON.stringify(tasks));
})
</script>

<template>
  <main class="header">
    <SearchInput />
    <TasksComponent />
  </main>
</template>