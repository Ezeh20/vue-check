<script setup lang="ts">
import { useToggleStatus } from '../../composables/toggleStatus';
import styles from './TaskAction.module.css'
import { defineProps } from "vue";
import { TaskType } from '../../types';


const props = defineProps<{
    db: { tasks: TaskType[] }
    id: number
}>()

const { db, id } = props;
const { handleCompleteTask } = useToggleStatus(db, id)
</script>

<template>
    <div :class="`${styles.marker} ${db.tasks.find(task => task.id === id)?.completed && styles.active}`"
        @click="handleCompleteTask"></div>
</template>
