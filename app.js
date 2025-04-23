// Modulo para las task
/**
 * @typedef Task
 * @type {object}
 * @property {string} id ID unico para la tarea
 * @property {string} description la tarea
 */

/**
 * @type {Task[]}
 */
let tasks = [];

/**
 * Agregamos una task a la tasklist
 * @param {Task} newTask
 */
const addTask = (newTask) => {
  tasks = tasks.concat(newTask);
};

/**
 * Renderiza las task en el HTML
 * @param {Element} list El elemento de HTML donde se renderiza la lista de tareas
 */
const renderTasks = (list) => {
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.id = task.id;

    const taskText = `
      <p class="task-text">${task.description}</p>
    `;

    const buttons = `
      <button class="button check-button">✔</button>
      <button class="button delete-button">✖</button>
    `;

    li.innerHTML = taskText + buttons;
    list.appendChild(li);
  });
};

/**
 * Guarda la task en localStorage
 */
const saveTasksInBrowser = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

/**
 * Carga las tasks de localStorage
 */
const getTasksFromBrowser = () => {
  const tasksLocalJson = localStorage.getItem("tasks");
  tasks = JSON.parse(tasksLocalJson) || [];
};

/**
 * Completa una tarea
 * @param {string} id
 */
const completeTask = (taskId) => { 
    tasks = tasks.map((task) => {if (task.id === taskId) task.completed = true})
};

/**
 * Elimina una task por ID
 * @param {string} id
 */
const removeTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
};

export { addTask, renderTasks, saveTasksInBrowser, getTasksFromBrowser, removeTask, completeTask };