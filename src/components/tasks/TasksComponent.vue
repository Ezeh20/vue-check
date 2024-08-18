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

const form = reactive({
    title: "",
    desc: ""
})

const handleAddTask = () => {
    const getLoc = localStorage.getItem("tasks-check-xyz");
    let tasks = [];

    if (getLoc) {
        tasks = JSON.parse(getLoc);
    }
    const newTask = { ...form };

    tasks.push(newTask);
    localStorage.setItem("tasks-check-xyz", JSON.stringify(tasks));
    form.title = "";
    form.desc = "";
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
        <form :class="`${styles.form}`" @submit.prevent="handleAddTask">
            <div :class="`${styles.formField}`">
                <label for="title" :class="`${styles.title}`">Title</label>
                <input id="title" v-model="form.title" type="text" name="title" :class="`${styles.input}`" />
            </div>

            <div :class="`${styles.formField}`">
                <label for="desc" :class="`${styles.title}`">Description</label>
                <textarea id="desc" v-model="form.desc" type="text" name="title"
                    :class="`${styles.input} text-a`"></textarea>

            </div>

            <button type="submit" :class="`${styles.button}`">
                Add task
            </button>
        </form>
    </ModalComponent>
</template>