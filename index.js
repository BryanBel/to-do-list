import * as TaskModule from "./app.js";

// Selector
const taskInput = document.querySelector("#task-input");
const taskForm = document.querySelector("#main-form");
const taskList = document.querySelector("#task-list");
const helperText = document.querySelector("#main-form-helper-text");
const totalCounter = document.querySelector("totalCounter");
const completedCounter = document.querySelector("completedCounter");
const incompletedCounter = document.querySelector("incompletedCounter");

// Validacion
const renderInputValidationStatus = () => {
  if (taskInput.value.trim() === "") {
    helperText.style.display = "block";
    return false;
  } else {
    helperText.style.display = "none";
    return true;
  }
};

// Eventos
taskInput.addEventListener("input", renderInputValidationStatus);

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!renderInputValidationStatus()) {
    return;
  }

  const newTask = {
    id: crypto.randomUUID(),
    description: taskInput.value.trim(),
    completed: false, // Ensure the task has a completed property
  };

  TaskModule.addTask(newTask);
  TaskModule.saveTasksInBrowser();
  TaskModule.renderTasks(taskList);
  TaskModule.updateCounters(); // Update counters after adding a task

  taskInput.value = "";
  renderInputValidationStatus();
});

taskList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-button");
  const checkBtn = e.target.closest(".check-button");

  if (checkBtn) {
    const li = checkBtn.parentElement;
    if (li.classList.contains("completed")) {
      TaskModule.incompleteTask(li.id);
    } else {
      TaskModule.completeTask(li.id);
    }
    TaskModule.saveTasksInBrowser();
    TaskModule.renderTasks(taskList);
    TaskModule.updateCounters(); // Update counters after completing/incompleting a task
  }

  if (deleteBtn) {
    const li = deleteBtn.parentElement;
    TaskModule.removeTask(li.id);
    TaskModule.saveTasksInBrowser();
    TaskModule.renderTasks(taskList);
    TaskModule.updateCounters(); // Update counters after removing a task
  }
});

window.onload = () => {
  TaskModule.getTasksFromBrowser();
  TaskModule.renderTasks(taskList);
  TaskModule.updateCounters(); // Update counters on page load
};