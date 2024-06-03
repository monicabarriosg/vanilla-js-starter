//class 
//variable "taskInput"
//variable "addTaskBtn"
//variable "taskList"
class TaskManager {
    constructor() {
        this.taskInput = document.querySelector('.taskInput');
        this.addTaskBtn = document.querySelector('.addTaskBtn');
        this.taskList = document.querySelector('.taskList');
        this.completedTasks = 0;
        //initialize 
        this.init();
    }
    //initialize addEventListener events for buttons and task list
    init() {
        //It is known that a specific variable is going to be used.
        this.addTaskBtn.addEventListener('click', this.addTask.bind(this));
        this.taskList.addEventListener('click', this.deleteOrCompleteTask.bind(this));
        this.taskList.addEventListener('change', this.deleteOrCompleteTask.bind(this));
    }
//to add a new task
    addTask() {
                       //specific variable    //remove spaces 
        const taskText = this.taskInput.value.trim();
        switch (true) {
            case taskText !== '':
                fetch('http://localhost:3000/api/task', {
                    //Create a task with the object and pass an object with the
                    //data that you want to add.
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: taskText })
                })
                //method schedules callback functions for the eventual completion of a Promise 
                .then(response => {
                    //contains a Boolean indicating whether the response was successful
                    if (!response.ok) {
                        throw new Error('Error al agregar la tarea');
                    }
                    return response.json();
                })
                .then(data => {
                    const li = document.createElement('li');
                    li.innerHTML = `<input type="checkbox" class="taskCheckbox">${data.text}<button class="deleteBtn">Eliminar</button>`;
                    this.taskList.appendChild(li);
                    this.taskInput.value = '';
                    this.updateEmptyMessage();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al agregar la tarea');
                });
                break;
            default:
                alert('Ingrese un texto');
                break;
        }
    }

    

}

const taskManager = new TaskManager();
