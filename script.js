document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-options button");

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

taskList.addEventListener("click", handleTaskClick);
filterButtons.forEach((btn) => btn.addEventListener("click", filterTasks));

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = { text: taskText, completed: false };
    saveTask(task);
    renderTask(task);
    taskInput.value = "";
}

function renderTask(task) {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-btn">X</button>
    `;
    li.addEventListener("click", toggleTask);
    li.querySelector(".delete-btn").addEventListener("click", deleteTask);
    taskList.appendChild(li);
}

function handleTaskClick(event) {
    if (event.target.tagName === "LI") {
        toggleTask(event);
    } else if (event.target.classList.contains("delete-btn")) {
        deleteTask(event);
    }
}

function toggleTask(event) {
    const li = event.target.tagName === "LI" ? event.target : event.target.parentElement;
    li.classList.toggle("completed");

    let tasks = getTasks();
    tasks = tasks.map((task) => 
        task.text === li.firstChild.textContent ? { ...task, completed: !task.completed } : task
    );
    saveTasks(tasks);
}

function deleteTask(event) {
    event.stopPropagation();
    const li = event.target.parentElement;
    li.remove();

    let tasks = getTasks().filter((task) => task.text !== li.firstChild.textContent);
    saveTasks(tasks);
}

function filterTasks(event) {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");

    const filter = event.target.dataset.filter;
    document.querySelectorAll("li").forEach((li) => {
        switch (filter) {
            case "all":
                li.style.display = "flex";
                break;
            case "completed":
                li.style.display = li.classList.contains("completed") ? "flex" : "none";
                break;
            case "pending":
                li.style.display = !li.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}

// Local Storage Functions
function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    getTasks().forEach(renderTask);
}
