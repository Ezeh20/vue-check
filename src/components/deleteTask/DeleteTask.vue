<script setup>
import { useDeleteTask } from '../../composables/deleteTask';
import { defineProps } from 'vue';



const props = defineProps({
  db: Object,
  id: Number
})

const { db, id } = props;
const { handleDeleteTask } = useDeleteTask(db, id)
</script>

<template>
  <span class="pi pi-trash icn-delete" @click="handleDeleteTask()"></span>
</template>
