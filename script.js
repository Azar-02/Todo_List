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

    const task = {text: taskText, complted:false};
    saveTask(task);
    renderTask(task);
    taskInput.value = "";
}