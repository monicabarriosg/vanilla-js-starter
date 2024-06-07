// export function getTasks() {
//       fetch("http://localhost:3000/api/task")
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Error al obtener las tareas");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           taskList.innerHTML = "";
  
//           if (data.length === 0) {
//             taskList.innerHTML = "<p>No existen tareas</p>";
//           } else {
  
//             data.forEach((task) => {
//               //bloque para traer la tarea a la pag web
//               const li = document.createElement("li");
//               const checkbox = document.createElement("input");
//               checkbox.type = "checkbox";
//               checkbox.className = "taskCheckbox";
//               checkbox.onchange = function() {
//                 completeTask(task.id);
//               };
//               //bloque para que cada tarea se añada con un boton de eliminar
//               const deleteBtn = document.createElement("button");
//               deleteBtn.innerText = "Eliminar";
//               deleteBtn.className = "deleteBtn";
//               deleteBtn.onclick = function() {
//                 deleteTask(task.id);
                
//               };
//               // console.log(task);
//               li.appendChild(checkbox);
//               li.appendChild(document.createTextNode(task.task));
//               li.appendChild(deleteBtn);
//               taskList.appendChild(li);
//             });
//           }
  
//           taskInput.value = '';
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//           alert("Error al obtener las tareas");
//         });
//     }