import { TaskManager } from "./index.js";

class Delete {
 deleteTask(taskId) {
    fetch(`http://localhost:3000/api/task/id:taskId`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar la tarea');
        }
        document.querySelector(`[data-id="${taskId}"]`).remove();
        this.updateEmptyMessage();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al eliminar la tarea');
    });
}}
module.exports = Delete