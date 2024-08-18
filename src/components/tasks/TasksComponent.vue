<script setup>
import { reactive, ref, onMounted } from 'vue';
import styles from './TasksComponent.module.css';
import ModalComponent from '../modal/ModalComponent.vue';
import TaskAction from '../taskAction/TaskAction.vue';
import DeleteTask from '../deleteTask/DeleteTask.vue';
const addModal = ref(false);
const editModal = ref(false);
const editIdx = ref(null);
const db = reactive({ tasks: [] });

const form = reactive({
    title: "",
    desc: ""
});


const loadTasks = () => {
    const locData = localStorage.getItem("tasks-check-xyz");
    if (locData) {
        db.tasks = JSON.parse(locData);
    }
};

onMounted(() => {
    loadTasks();
});

const toggleAddModal = () => {
    addModal.value = !addModal.value;
};

const toggleEditModal = (idx) => {
    editIdx.value = idx;
    editModal.value = !editModal.value;
    const task = db.tasks[editIdx.value];
    form.title = task.title;
    form.desc = task.desc
};

const handleAddTask = () => {
    const newTask = { ...form };
    db.tasks.push(newTask);
    localStorage.setItem("tasks-check-xyz", JSON.stringify(db.tasks));
    form.title = "";
    form.desc = "";
};

const handleEditTask = () => {
    if (editIdx.value !== null) {
        db.tasks[editIdx.value] = { ...form };
        localStorage.setItem("tasks-check-xyz", JSON.stringify(db.tasks));
        form.title = "";
        form.desc = "";
        editModal.value = !editModal.value;
    }
};
</script>

<template>
    <main :class="`${styles.main}`">
        <section v-if="db.tasks.length > 0" :class="`${styles.taskList}`">
            <div v-for="(task, idx) in db.tasks" :key="task.title" :class="`${styles.taskContainer}`">
                <div class="flex-base">
                    <TaskAction />
                    <div :class="`${styles.taskContent}`">
                        <p :class="`${styles.title}`">{{ task.title }}</p>
                        <p :class="`${styles.desc}`">{{ task.desc }}</p>
                    </div>
                </div>
                <div class="flex-base">
                    <button @click="toggleEditModal(idx)">edit</button>
                    <DeleteTask />
                </div>
            </div>

            <button :class="`${styles.button}`" @click="toggleAddModal">new task</button>
        </section>
        <section v-else :class="`${styles.empty}`">
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
                <textarea id="desc" v-model="form.desc" name="desc" :class="`${styles.input} text-a`"></textarea>
            </div>

            <button type="submit" :class="`${styles.button}`">Add task</button>
        </form>
    </ModalComponent>

    <ModalComponent :open="editModal" :close="toggleEditModal">
        <form :class="`${styles.form}`" @submit.prevent="handleEditTask">
            <div :class="`${styles.formField}`">
                <label for="title" :class="`${styles.title}`">Title</label>
                <input id="title" v-model="form.title" type="text" name="title" :class="`${styles.input}`" />
            </div>

            <div :class="`${styles.formField}`">
                <label for="desc" :class="`${styles.title}`">Description</label>
                <textarea id="desc" v-model="form.desc" name="desc" :class="`${styles.input} text-a`"></textarea>
            </div>
            <button type="submit" :class="`${styles.button}`">Edit task</button>
        </form>
    </ModalComponent>
</template>
