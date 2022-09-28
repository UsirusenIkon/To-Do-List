import './style.css';
import TodoArray from './modules/TodoListArray.js';
import TodoListItem from './modules/TodoListItem.js';

const todoListArray = new TodoArray();

const loadTodos = () => {
  const todoCover = document.querySelector('.todo-list');
  todoCover.innerHTML = '';
  if (todoListArray.getAllTodos().length === 0) {
    todoCover.innerHTML = '<h3 class= "alert">Todolist is Empty</h3>';
  } else {
    todoListArray.getAllTodos().forEach((todo, index) => {
      const todoListItem = document.createElement('div');
      todoListItem.classList.add('todo-list-item');
      const todoListStatus = () => {
        const listStatus = todo.completed ? 'checked' : '';
        return listStatus;
      };
      todoListItem.innerHTML = `
        <div data-check = ${index} class="todo border-bottom flex">
        <input data-complete = ${todo.idx} class="box" ${todoListStatus()} type="checkbox" />
        <input data-item = ${todo.idx} class="item ${todoListStatus()}" type="text" value="${todo.description}" />
        <i data-remote = ${index} class='bx bx-trash delete-btn'></i>
        </div>
      `;
      todoCover.appendChild(todoListItem);
    });
  }

  const deletBtn = document.querySelectorAll('.delete-btn');
  deletBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const { remote } = e.target.dataset;
      todoListArray.deleteTodo(remote);
      loadTodos();
    });
  });

  const editTodo = document.querySelectorAll('.todo-item');
  const checkedBox = document.querySelectorAll('.box');
  editTodo.forEach((todo) => {
    todo.addEventListener('keyup', (e) => {
      const { dataset, value } = e.target;
      const id = dataset.item;
      const description = value.trim();
      const completed = false;
      const newTodo = new TodoListItem(description, completed, id);
      todoListArray.updateTodo(id, newTodo);
      checkedBox[id - 1].checked = false;
      todo.classList.remove('checked');
    });
  });

  const todoItems = document.querySelectorAll('.item');
  const chexkbox = document.querySelectorAll('.box');
  chexkbox.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
      const { complete } = e.target.dataset;
      if (checkbox.checked) {
        todoListArray.toggleCompleted(complete);
        todoItems[complete - 1].classList.add('checked');
      } else {
        todoListArray.toggleCompleted(complete);
        todoItems[complete - 1].classList.remove('checked');
      }
    });
  });

  const removeCompleted = document.querySelector('.clear-all');
  removeCompleted.addEventListener('click', () => {
    todoListArray.clearCompleted();
    loadTodos();
  });
};

const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoInput = document.querySelector('.input').value;
  if (!todoInput) {
    return;
  }

  const todo = new TodoListItem(
    todoInput,
    false,
    todoListArray.getAllTodos().length + 1,
  );
  todoListArray.addTodo(todo);
  form.reset();
  document.querySelector('.input').focus();
  loadTodos();
});

window.onload = loadTodos();