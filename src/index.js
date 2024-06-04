//class 
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
        // this.taskList.addEventListener("click", this.deleteOrCompleteTask.bind(this));
        // this.taskList.addEventListener("change", this.deleteOrCompleteTask.bind(this));
    }
    //to add a new task
    addTask() {
                       //specific variable    //remove spaces 
        const taskText = this.taskInput.value.trim();
        console.log(taskText)
        switch (true) {
            case taskText !== "":
                fetch("http://localhost:3000/api/task", {
                    //Create a task with the object and pass an object with the
                    //data that you want to add.
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ task: taskText })
                })
                //method schedules callback functions for the eventual completion of a Promise 
                .then(response => {
                    //contains a Boolean indicating whether the response was successful
                    if (!response.ok) {
                        throw new Error("Error al agregar la tarea");
                    // throw informs the generator of an error condition and allows it to handle the error, or perform cleanup and close itself.
                    }
                    return response.json();
                })
                .then (data => {
                  data =  this.addTask
                }
                )
                .catch(error => {
                    console.error("Error:", error);
                    alert("Error al agregar la tarea");
                });
                break;
            default:
                alert("Ingrese un texto");
                break;       
        } 
    }

newTask(){
    
}














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
    }






}

const taskManager = new TaskManager();
// .then(data => {
                //     const li = document.createElement("li");
                //     li.innerHTML = `<input type="checkbox" class="taskCheckbox">${data.text}<button class="deleteBtn">Eliminar</button>`;
                //     this.taskList.appendChild(li);
                //     //apendChild to add new elements to an existing document
                //     this.taskInput.value = '';
                //     this.updateEmptyMessage();
                // })