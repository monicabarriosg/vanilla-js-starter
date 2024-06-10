// export function addTask(taskText, getTasks) {
//     fetch("http://localhost:3000/api/task", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ task: taskText }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Error al agregar la tarea");
//         }
//         return response.json();
//       })
//       .then(() => {
//         getTasks();
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert("Error al agregar la tarea");
//       });
//   }