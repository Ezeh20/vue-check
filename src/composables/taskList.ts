
import { TaskType } from "../types";
import { computed, Ref} from "vue";

export const useTaskList =(text:Ref<string>, db:{tasks:[]})=>{
    const filteredTasks = computed(() => {
        if (!text.value) return db.tasks;
        return db.tasks.filter((task:TaskType) =>
            task.title.toLowerCase().includes(text.value.toLowerCase())
        );
    });

    return {
        filteredTasks,
    };
}