// export function deleteTask(taskId, getTasks) {
//     fetch(`http://localhost:3000/api/task/${taskId}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Error al eliminar la tarea");
//         }
//         return response.json();
//       })
//       .then(() => {
//         getTasks();
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert("Error al eliminar la tarea");
//       });
//   }
  
  