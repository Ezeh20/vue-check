import { TaskType } from "../types";

export const useToggleStatus =(db:{tasks:TaskType[]}, id:number)=>{
    const handleCompleteTask = () => {
        const idx = db.tasks.findIndex((task) => task.id === id);
        if (idx !== -1) {
            db.tasks[idx].completed = !db.tasks[idx].completed;
            localStorage.setItem("tasks-check-xyz", JSON.stringify(db.tasks));
        }
    };

    return { handleCompleteTask };
}