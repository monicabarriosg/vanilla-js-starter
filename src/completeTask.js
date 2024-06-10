 
  // export function completeTask(taskId, completedTasks, getTasks) {
  //   fetch(`http://localhost:3000/api/task/${taskId}/complete`, {
  //     method: "PUT",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Error al completar la tarea");
  //       }
  //       return response.json();
  //     })
  //     .then(() => {
  //       completedTasks++;
  //       getTasks();
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       alert("Error al completar la tarea");
  //     });
  // }