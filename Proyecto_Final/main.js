/* Los siguientes nombres de funciones son una sugerencia de funciones que necesitarás en tu programa,
sin embargo, no te limites solo a estas funciones. Crea tantas como consideres necesarias.

La estructura de cada objeto "tarea" es la siguiente:

{
  id: 1,
  title: "tarea",
  completed: false
}

*/
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';
let taskId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;

// Función para añadir una nueva tarea
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const newTask = { id: taskId++, title: taskInput.value, completed: false };
  
  tasks.push(newTask);
  taskInput.value = '';
  
  updateLocalStorage();
  renderTasks();
}

//funcion para editar las tareas
function editTask(id) {
  const newTitle = prompt('Edit Task', tasks.find(task => task.id == id).title);
  tasks = tasks.map(task => task.id == id ? { ...task, title: newTitle } : task);

  updateLocalStorage();
  renderTasks();
}

// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
function completeTask(id) {
  tasks = tasks.map(task => task.id == id ? { ...task, completed: !task.completed } : task);

  updateLocalStorage();
  renderTasks();
}

// Función para borrar una tarea
function deleteTask(id) {
  tasks = tasks.filter(task => task.id != id);

  updateLocalStorage();
  renderTasks();
}

// Funcion para borrar todas las tareas
function deleteAll() {
  tasks = tasks.filter(task => !task.completed);

  updateLocalStorage();
  renderTasks();
}

// Función para filtrar tareas segun su estado
function filterTasks(newFilter) {
  filter = newFilter;

  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTaskButton');
  const deleteCompletedButton = document.getElementById('deleteCompletedButton');

    if (filter == 'completed') {
      taskInput.style.display = 'none';
      addTaskButton.style.display = 'none';
      deleteCompletedButton.style.display = 'block';
    } else {
      taskInput.style.display = 'block';
      addTaskButton.style.display = 'block';
      deleteCompletedButton.style.display = 'none';
    }

  renderTasks();
}

// Funcion para actualizar el local storage
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Funcion para mostrar las tareas y editarlas segun si esta completada o no, tambien desabilita el boton de add si el input no tiene valor y agrega el boton delete all a la seccion de tareas completadas
function renderTasks() {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTaskButton');

  addTaskButton.disabled = !taskInput.value.trim();

  const taskList = document.getElementById('taskList');

  taskList.innerHTML = '';

  tasks.filter(task => filter == 'all' || (filter == 'active' && !task.completed) || (filter == 'completed' && task.completed)).forEach(task => {
    const li = document.createElement('li');

      li.innerHTML = `<input type="checkbox" ${task.completed ? 'checked' : ''} onclick="completeTask(${task.id})">
      <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
      ${filter == 'completed' ? '<button id="eliminarTarea" onclick="deleteTask(' + task.id + ')"><i class="fa-solid fa-trash"></i></button>' : '<button id="botonEditar" onclick="editTask(' + task.id + ')"><i class="fa-solid fa-pen-to-square"></i></button>'}`;

    taskList.appendChild(li);
  });
}

renderTasks();