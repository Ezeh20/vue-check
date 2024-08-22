<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import styles from './TasksComponent.module.css';
import ModalComponent from '../modal/ModalComponent.vue';
import TaskAction from '../taskAction/TaskAction.vue';
import DeleteTask from '../deleteTask/DeleteTask.vue';
import SearchInput from '../search/SearchInput.vue';
import truncateText from '@/utils/truncate';
import { refreshTasks } from '@/utils/refresh';
import { useTitle } from '@vueuse/core';
import { useTaskList } from '../../composables/taskList';
const title = useTitle("Task manager")

//refs
const addModal = ref(false);
const editModal = ref(false);
const editIdx = ref(null);
const db = reactive({ tasks: [] });
const text = ref('');


const { filteredTasks } = useTaskList(text, db)

//reactive form binding
const form = reactive({
    title: "",
    desc: ""
});

//onMount, load the tasks from LS if any then update the db state 
onMounted(() => {
    const locData = localStorage.getItem("tasks-check-xyz");
    if (locData) {
        db.tasks = JSON.parse(locData);
    }
});


//func to toggle the add task modal
const toggleAddModal = () => {
    addModal.value = !addModal.value;
    form.title = "";
    form.desc = "";
};


/**
 * func to toggle the edit task modal
 * 
 * The modal opens then the input and textarea are populated using the indexed obj data
 */
const toggleEditModal = (idx) => {
    editIdx.value = idx;
    editModal.value = !editModal.value;
    const task = db.tasks[editIdx.value];
    form.title = task?.title;
    form.desc = task?.desc
};

// func to update the LS data
const handleAddTask = () => {
    if (!form.title && !form.title) {
        return
    }
    const lastId = db.tasks.length > 0 ? Math.max(...db.tasks.map(task => task.id || 0)) : 0;
    const newTask = { ...form, completed: false, id: lastId + 1 };
    db.tasks.push(newTask);
    localStorage.setItem("tasks-check-xyz", JSON.stringify(db.tasks));
    form.title = "";
    form.desc = "";
    text.value = ""
    addModal.value = !addModal.value;
    text.value = ""
};


//get the particular task object using it's index, reassign the object with the current form state then set the new data
const handleEditTask = () => {
    if (!form.title) {
        return;
    }
    if (editIdx.value !== null) {
        const task = db.tasks[editIdx.value];
        db.tasks[editIdx.value] = {
            ...task,
            ...form,
            completed: task.completed,
            id: task.id,
        };
        localStorage.setItem("tasks-check-xyz", JSON.stringify(db.tasks));
        refreshTasks()
        form.title = "";
        form.desc = "";
        editModal.value = !editModal.value;
    }
};

</script>

<template>
    <main>
        <section class="header">
            <h1 :class="`${styles.heading}`">Task Manager</h1>
            <div v-if="db.tasks.length > 0">
                <SearchInput v-model="text" />
            </div>
        </section>
        <section class="section2 container">
            <section :class="`${styles.main}`">
                <section v-if="filteredTasks.length > 0" :class="`${styles.taskList}`">
                    <div v-for="(task, idx) in filteredTasks" :key="task.title" :class="`${styles.taskContainer}`">
                        <div class="flex-base">
                            <TaskAction :db="db" :id="task?.id" />
                            <div :class="`${styles.taskContent} ${task.completed && styles.completed}`">
                                <p :class="`${styles.title}`">{{ truncateText(task.title, 20) }}</p>
                                <p :class="`${styles.desc}`">{{ truncateText(task.desc, 30) }}</p>
                            </div>
                        </div>
                        <div class="flex-base">
                            <span class="pi pi-pencil icon-pi-alt" @click="toggleEditModal(idx)"></span>
                            <DeleteTask :db="db" :idx="idx" />
                        </div>
                    </div>
                    <button :class="`${styles.button}`" @click="toggleAddModal">New task</button>
                </section>
                <section v-else :class="`${styles.empty}`">
                    <p>Nothing here</p>
                    <button @click="toggleAddModal" type="submit" :class="`${styles.button}`">Add a task</button>
                </section>
            </section>
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
