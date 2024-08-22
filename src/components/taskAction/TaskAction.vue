<script setup>
import { refreshTasks } from "@/utils/refresh";
import styles from './TaskAction.module.css'
import { defineProps } from "vue";

const props = defineProps({
    db: {
        type: Object,
        required: true
    },
    id: Number
})

const { db, id } = props
const idx = db.tasks.findIndex((task) => task.id === id)

const handleCompleteTask = () => {
    db.tasks[idx].completed = !db.tasks[idx]?.completed;
    localStorage.setItem("tasks-check-xyz", JSON.stringify(db.tasks));
    refreshTasks()
};
</script>

<template>
    <div :class="`${styles.marker} ${db.tasks[idx]?.completed && styles.active}`" @click="handleCompleteTask"></div>
</template>