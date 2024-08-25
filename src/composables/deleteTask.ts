
import { TaskType } from "../types";
export const useDeleteTask =(db:{tasks:TaskType[]}, id:number)=>{
    
const handleDeleteTask = () => {
    const index = db.tasks.findIndex((task: TaskType) => task.id === id);
    if (index !== -1) {
         db.tasks.splice(index, 1);
         localStorage.setItem("tasks-check-xyz", JSON.stringify(db.tasks));
    }
};

return {
    handleDeleteTask,
};
}