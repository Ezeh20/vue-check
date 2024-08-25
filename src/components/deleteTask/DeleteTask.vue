<script setup lang="ts">
import { useDeleteTask } from '../../composables/deleteTask';
import { TaskType } from '../../types';
import { defineProps } from 'vue';

const props = defineProps<{
  db: { tasks: TaskType[] };
  id: number;
}>();


const { db, id } = props;
const { handleDeleteTask } = useDeleteTask(db, id);
</script>

<template>
     <span class="pi pi-trash icn-delete" @click="handleDeleteTask()"></span>
</template>
