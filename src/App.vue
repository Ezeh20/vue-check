<script setup>
import { onMounted } from 'vue';
import SearchInput from './components/search/SearchInput.vue';
import TasksComponent from './components/tasks/TasksComponent.vue';

onMounted(() => {
  const existingTasks = localStorage.getItem("tasks-check-xyz");
  if (!existingTasks) {
    localStorage.setItem("tasks-check-xyz", JSON.stringify([]));
  }
});

</script>

<template>
  <main class="header">
    <SearchInput />
  </main>
  <section class="section2">
    <TasksComponent />
  </section>
</template>