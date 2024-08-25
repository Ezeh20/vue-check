
import { TaskType } from "../types";
import { Ref } from "vue";

export const useEditTask =(form:TaskType, db:{tasks:TaskType[]}, editIdx:Ref<number>, editModal:Ref<boolean>)=>{
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
            form.title = "";
            form.desc = "";
            editModal.value = !editModal.value;
        }
    };

    return {
        handleEditTask,
    };
}