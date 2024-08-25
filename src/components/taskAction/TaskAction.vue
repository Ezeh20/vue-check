<script setup>
import { useToggleStatus } from '../../composables/toggleStatus';
import styles from './TaskAction.module.css'
import { defineProps } from "vue";

const props = defineProps({
    db: Object,
    id: Number
})

const { db, id } = props;
const { handleCompleteTask } = useToggleStatus(db, id)
</script>

<template>
    <div :class="`${styles.marker} ${db.tasks.find(task => task.id === id)?.completed && styles.active}`"
        @click="handleCompleteTask"></div>
</template>
