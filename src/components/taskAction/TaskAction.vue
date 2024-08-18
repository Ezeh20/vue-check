<script setup>
import styles from "./TaskAction.module.css"
import { defineProps} from "vue";

const props = defineProps({
    db: Object,
    idx: Number
})

const { db, idx } = props
const handleCompleteTask = () => {
    db.tasks[idx].completed = !db.tasks[idx].completed;
    localStorage.setItem("tasks-check-xyz", JSON.stringify(db.tasks));
};

</script>

<template>
    <div :class="`${styles.marker} ${db.tasks[idx].completed && styles.active}`" @click="handleCompleteTask"></div>
</template>