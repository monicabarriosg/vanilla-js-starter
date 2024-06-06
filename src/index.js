//variable "taskInput" It is the space where tasks are added.
//variable "addTaskBtn" It is the button to add tasks.
//variable "taskList" is the initial message that there are no tasks.
class TaskManager {
  constructor() {
    this.taskInput = document.querySelector(".taskInput");
    this.addTaskBtn = document.querySelector(".addTaskBtn");
    this.taskList = document.querySelector(".taskList");
    this.completedTasks = 0;
    //initialize
    this.init();
  }
  //initialize addEventListener events for buttons and task list
  init() {
    //this. it is known that a specific variable is going to be used.
    this.addTaskBtn.addEventListener("click", this.addTask.bind(this));
    this.getTasks();
  }
  //to add a new task
  addTask() {
    //specific variable    //remove spaces
    const taskText = this.taskInput.value.trim();
    console.log(taskText);
    switch (true) {
      case taskText !== "":
        fetch("http://localhost:3000/api/task", {
          //Create a task with the object and pass an object with the
          //data that you want to add.
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: taskText }),
        })
          //method schedules callback functions for the eventual completion of a Promise
          .then((response) => {
            //contains a Boolean indicating whether the response was successful
            if (!response.ok) {
              throw new Error("Error al agregar la tarea");
              // throw informs the generator of an error condition and allows it to handle the error, or perform cleanup and close itself.
            }
            return response;
          })
          .then(() => {
            // After adding the task, update the task list
            this.getTasks();
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Error al agregar la tarea");
          });
        break;
      default:
        alert("Ingrese un texto");
        break;
    }
 
 
  }
  getTasks() {
    fetch("http://localhost:3000/api/task")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al obtener las tareas");
            }
            return response.json();
        })
        .then((data) => {
            this.taskList.innerHTML = "";

            data.forEach((task) => {
                const li = document.createElement("li");
                li.innerText = task.taskName;
                this.taskList.appendChild(li);
            });

            this.taskInput.value = '';
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Error al obtener las tareas");
        });
}


deleteTask(taskId) {
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
      this.getTasks();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al eliminar la tarea");
    });
}
  
}

const taskManager = new TaskManager();
export { TaskManager };
// document.addEventListener("DOMContentLoaded", function() {
//   const taskInput = document.querySelector(".taskInput");
//   const addTaskBtn = document.querySelector(".addTaskBtn");
//   const taskList = document.querySelector(".taskList");
//   let completedTasks = 0;

//   function init() {
//     addTaskBtn.addEventListener("click", addTask);
//     taskInput.addEventListener("keypress", function(event) {
//       if (event.key === "Enter") {
//         addTask();
//       }
//     });
//     getTasks();
//   }

//   function addTask() {
//     const taskText = taskInput.value.trim();

//     if (taskText !== "") {
//       fetch("http://localhost:3000/api/task", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ task: taskText }),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Error al agregar la tarea");
//           }
//           return response.json();
//         })
//         .then(() => {
//           getTasks();
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//           alert("Error al agregar la tarea");
//         });
//     } else {
//       alert("Ingrese un texto");
//     }
//   }

//   function deleteTask(taskId) {
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

//   function getTasks() {
//     fetch("http://localhost:3000/api/task")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Error al obtener las tareas");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         taskList.innerHTML = "";

//         if (data.length === 0) {
//           taskList.innerHTML = "<p>No existen tareas</p>";
//         } else {
//           data.forEach((task) => {
//             const li = document.createElement("li");
//             const checkbox = document.createElement("input");
//             checkbox.type = "checkbox";
//             checkbox.className = "taskCheckbox";
//             checkbox.onchange = function() {
//               // completeTask(task.id);
//             };

//             const deleteBtn = document.createElement("button");
//             deleteBtn.innerText = "Eliminar";
//             deleteBtn.className = "deleteBtn";
//             deleteBtn.onclick = function() {
//               deleteTask(task.id);
//             };

//             li.appendChild(checkbox);
//             li.appendChild(document.createTextNode(task.text));
//             li.appendChild(deleteBtn);
//             taskList.appendChild(li);
//           });
//         }

//         taskInput.value = '';
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert("Error al obtener las tareas");
//       });
//   }

//   init();
// });
