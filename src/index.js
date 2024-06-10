// This event listener listens for the activation of the HTML document
document.addEventListener("DOMContentLoaded", function () {
  // this variable is to select the input field where tasks are entered (in HTML "class="taskInput")
  const taskInput = document.querySelector(".taskInput");
  // this variable is selecting the button to add tasks (in HTML "class="addTaskBtn")
  const addTaskBtn = document.querySelector(".addTaskBtn");
  // esta variable esta Seleccionando la lista donde se mostrarán las tareas (in HTML "class="taskList"")
  const taskList = document.querySelector(".taskList");
  // this is the variable for the counter of completed tasks
  let completedTasks = 0;
// Function to initialize event listeners and fetch existing tasks
  function init() {
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
    getTasks();
  }
   // Function to add a new task
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
  // function cont
  let completed = document.getElementById("completed");
  function comple() {
    completed.innerHTML = `Tareas completadas: ${completedTasks}`;
  }
  // Function to mark a task as completed

  function completeTask(taskId) {
    fetch(`http://localhost:3000/api/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ "check": "checked" }),
      
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al completar la tarea");
        }
        return response.json();
      })
      .then(() => {
        completedTasks++
        comple(); //
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al completar la tarea");
      });
  }

    // console.log(completeTask)
    // Function to delete a task

  function deleteTask(taskId, isChecked) {
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
        if (isChecked) {   
          completedTasks--;
          comple(); // Update the completed tasks counter
        }
        getTasks(); // Refresh the task list
      })


      .catch((error) => {
        console.error("Error:", error);
        alert("Error al eliminar la tarea");
      });
  }
  // Función para recuperar tareas de la API y mostrarlas

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

             // Block to display the task with a checkbox
            const li = document.createElement("li");
            const checkbox = document.createElement ("input");
            checkbox.type = "checkbox";
            checkbox.className = "taskCheckbox";
            checkbox.onchange = function () {
              completeTask(task.id);
              checkbox.disabled = true;
            };
            li.appendChild(checkbox);
            taskList.appendChild(li);
            // this block to add a delete button for each task
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


  // console.log(checkbox);
  // Initializing the application
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
