class TodoListArray {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  }

  addTodo(todo) {
    this.todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  updateTodo(idx, newTodo) {
    this.todos[idx - 1] = newTodo;
    for (let i = 0; i < this.todos.length; i += 1) {
      this.todos[i].idx = i + 1;
    }
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  deleteTodo(index) {
    if (this.todos.length === 1) {
      this.todos = [];
    } else {
      this.todos.splice(index, 1);
    }
    for (let i = 0; i < this.todos.length; i += 1) {
      this.todos[i].idx = i + 1;
    }
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  clickCompleted(index) {
    this.todos[index - 1].completed = !this.todos[index - 1].completed;
    for (let i = 0; i < this.todos.length; i += 1) {
      this.todos[i].idx = i + 1;
    }
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  clearCompleted() {
    const newArr = this.todos.filter((todo) => !todo.completed);
    this.todos = newArr;
    for (let i = 0; i < this.todos.length; i += 1) {
      this.todos[i].idx = i + 1;
    }
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getAllTodos() {
    return this.todos;
  }
}

export default TodoListArray;
