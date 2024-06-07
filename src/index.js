//addTaskBtn es un boton para agregar las tareas
//taskList es donde las nuevas tareas se van a agregar
document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.querySelector(".taskInput");
  const addTaskBtn = document.querySelector(".addTaskBtn");
  const taskList = document.querySelector(".taskList");
  let completedTasks = 0;
  //funcion para los eventos de los botones
  function init() {
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
    getTasks();
  }
  //funcion para añadir una tarea
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: taskText }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al agregar la tarea");
          }
        })
        .then(() => {
          getTasks();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error al agregar la tarea");
        });
    } else {
      alert("Ingrese un texto");
    }
  }
  //funcion para completar una tarea

  function completeTask(taskId) {
    fetch(`http://localhost:3000/api/task/${taskId}`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al completar la tarea");
        }
        return response.json();
      })
      .then(() => {
        completedTasks++;
        comple(); //
        getTasks();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al completar la tarea");
      });
  }

  //funcion para eliminar una tarea

  function deleteTask(taskId) {
    fetch(`http://localhost:3000/api/task/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar la tarea");
        }
        return response.json();
      })
      .then(() => {
        getTasks();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al eliminar la tarea");
      });
  }
  //funcion para mostrar mis tareas en la pantalla

  function getTasks() {
    fetch("http://localhost:3000/api/task")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las tareas");
        }
        return response.json();
      })
      .then((data) => {
        taskList.innerHTML = "";

        if (data.length === 0) {
          taskList.innerHTML = "<p>No existen tareas</p>";
        } else {
          data.forEach((task) => {
            //bloque para traer la tarea a la pag web con check
            const li = document.createElement("li");
            const checkbox = document.createElement ("input");
            checkbox.type = "checkbox";
            checkbox.className = "taskCheckbox";
            checkbox.onchange = function () {
              completeTask(task.id);
            };
            //bloque para que cada tarea se añada con un boton de eliminar
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Eliminar";
            deleteBtn.className = "deleteBtn";
            deleteBtn.onclick = function () {
              deleteTask(task.id);
            };
            // console.log(task);
            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(task.task));
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
          });
        }

        taskInput.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al obtener las tareas");
      });
  }
  function comple() {
    completed.innerHTML = `Tareas completadas: ${completedTasks}`;
  }
  console.log(completed);

  init();
});

// import { addTask } from './addTask.js';
// // import { deleteTask } from './deleteTask.js';
// import { getTasks } from './getTasks.js';
// // import { completeTask } from './completeTask.js';

// document.addEventListener("DOMContentLoaded", function() {
//   const taskInput = document.querySelector(".taskInput");
//   const addTaskBtn = document.querySelector(".addTaskBtn");
//   const taskList = document.querySelector(".taskList");
//   let completedTasks = 0;

//   function init() {
//     addTaskBtn.addEventListener("click", handleAddTask);
//     taskInput.addEventListener("keypress", handleKeyPress);
//     // getTasks(renderTasks);
//   }

//   function handleAddTask() {
//     const taskText = taskInput.value.trim();
//     if (taskText !== "") {
//       addTask(taskText, getTasks);
//     } else {
//       alert("Ingrese un texto");
//     }
//   }

//   function handleKeyPress(event) {
//     if (event.key === "Enter") {
//       handleAddTask();
//     }
//   }

//   function taskList(tasks) {
//     taskList.innerHTML = "";

//     if (tasks.length === 0) {
//       taskList.innerHTML = "<p>No existen tareas</p>";
//      }
//   //   } else {
//   //     tasks.forEach((task) => {
//   //       const li = document.createElement("li");
//   //       const checkbox = document.createElement("input");
//   //       checkbox.type = "checkbox";
//   //       checkbox.className = "taskCheckbox";
//   //       checkbox.onchange = function() {
//   //         completeTask(task.id, completedTasks, getTasks);
//   //       };

//   //       const deleteBtn = document.createElement("button");
//   //       deleteBtn.innerText = "Eliminar";
//   //       deleteBtn.className = "deleteBtn";
//   //       deleteBtn.onclick = function() {
//   //         deleteTask(task.id, getTasks);
//   //       };

//   //       li.appendChild(checkbox);
//   //       li.appendChild(document.createTextNode(task.task));
//   //       li.appendChild(deleteBtn);
//   //       taskList.appendChild(li);
//   //     });
//   //   }

//   //   taskInput.value = '';
//   // }

//   init();
// });
