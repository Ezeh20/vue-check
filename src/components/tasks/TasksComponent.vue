<script setup>
import { reactive } from 'vue';
import styles from './TasksComponent.module.css'

const db = reactive({
    tasks: []
})

const locData = localStorage.getItem("tasks-check-xyz");
if (locData) {
    db.tasks = JSON.parse(locData);
}

</script>

<template>
    <main :class="`${styles.main}`">
        <section v-if="db.tasks.length > 0" :class="`${styles.main}`" >
            task dey
        </section>
        <section v-else>
            No task
        </section>
    </main>
</template>