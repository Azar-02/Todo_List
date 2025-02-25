document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTask");
const filterBtn = document.querySelector(".filter-options button");

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) {
    if(e.key === "Enter") addTask();
});

function addTask() {
    const taskText = taskInput.ariaValueMax.trim();
    if(taskText === "") return;

    const task = {text: taskText, completed:false};
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
            case "all": li.style.display = "flex"; break;
            case "completed": li.style.display = li.classList.contains("completed") ? "flex" : "none"; break;
            case "pending": li.style.display = !li.classList.contains("completed") ? "flex" : "none"; break;
        }
    });
}
