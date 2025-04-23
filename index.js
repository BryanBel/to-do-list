import * as TaskModule from "./app.js";

// Selector
const taskInput = document.querySelector("#task-input");
const taskForm = document.querySelector("#main-form");
const taskList = document.querySelector("#task-list");
const helperText = document.querySelector("#main-form-helper-text");

// Validation
const renderInputValidationStatus = () => {
  if (taskInput.value.trim() === "") {
    helperText.style.display = "block";
    return false;
  } else {
    helperText.style.display = "none";
    return true;
  }
};

// Events
taskInput.addEventListener("input", renderInputValidationStatus);

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!renderInputValidationStatus()) {
    return;
  }

  const newTask = {
    id: crypto.randomUUID(),
    description: taskInput.value.trim(),
  };

  TaskModule.addTask(newTask);
  TaskModule.saveTasksInBrowser();
  TaskModule.renderTasks(taskList);

  taskInput.value = "";
  renderInputValidationStatus();
});

taskList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-button");

  if (deleteBtn) {
    const li = deleteBtn.parentElement;
    TaskModule.removeTask(li.id);
    TaskModule.saveTasksInBrowser();
    TaskModule.renderTasks(taskList);
  }
});

window.onload = () => {
  TaskModule.getTasksFromBrowser();
  TaskModule.renderTasks(taskList);
};