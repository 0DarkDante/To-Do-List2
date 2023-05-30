const addTaskBtn = document.getElementById('add-tasc-btn');
const deskTaskInput = document.getElementById('description-task');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description) {
  this.description = description;
  this.completed = false;
}

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(task) {
  const taskIndex = tasks.indexOf(task);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    updateLocal();
  }
}

addTaskBtn.addEventListener('click', () => {
  tasks.push(new Task(deskTaskInput.value));
  updateLocal();
});


addTaskBtn.addEventListener('click', () => {
  const newTask = new Task(deskTaskInput.value);
  tasks.push(newTask);
  updateLocal();
  createTaskElement(newTask);
  deskTaskInput.value = '';
});

function createTaskElement(task) {
  const taskItem = document.createElement('div');
  taskItem.classList.add('todo-item');
  const description = document.createElement('div');
  description.classList.add('description');
  description.textContent = task.description;
  const buttons = document.createElement('div');
  buttons.classList.add('buttons');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deleteTask(task);
    taskItem.remove();
  });
  buttons.appendChild(deleteButton);
  taskItem.appendChild(description);
  taskItem.appendChild(buttons);
  todosWrapper.appendChild(taskItem);
}