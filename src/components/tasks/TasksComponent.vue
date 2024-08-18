<script setup>
import { reactive, ref } from 'vue';
import styles from './TasksComponent.module.css'
import ModalComponent from '../modal/ModalComponent.vue';

const addModal = ref(false)

const db = reactive({
    tasks: []
})

const locData = localStorage.getItem("tasks-check-xyz");
if (locData) {
    db.tasks = JSON.parse(locData);
}

const toggleAddModal = () => {
    addModal.value = !addModal.value
}
</script>

<template>
    <main :class="`${styles.main}`">
        <section v-if="db.tasks.length > 0" :class="`${styles.taskList}`">
            task dey
        </section>
        <section v-else-if="db.tasks.length === 0" :class="`${styles.empty}`">
            <p>no task yet</p>
            <span class="pi pi-plus icon-pi" @click="toggleAddModal"></span>
        </section>
    </main>
    <ModalComponent :open="addModal" :close="toggleAddModal">
        <form :class="`${styles.form}`">
            <div :class="`${styles.formField}`">
                <label for="title" :class="`${styles.title}`">Title</label>
                <input type="text" name="title" :class="`${styles.input}`" />
            </div>

            <div :class="`${styles.formField}`">
                <label for="title" :class="`${styles.title}`">Description</label>
                <textarea type="text" name="title" :class="`${styles.input} text-a`"></textarea>

            </div>
        </form>
    </ModalComponent>
</template>