
import { TaskType } from "../types";
import { Ref } from "vue";

export const useAddTask = (form:TaskType, db:{tasks:TaskType[]}, text:Ref<string>, addModal:Ref<boolean>) => {
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
    return { handleAddTask };
}