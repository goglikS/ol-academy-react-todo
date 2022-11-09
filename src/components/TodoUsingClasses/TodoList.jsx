import React, { Component } from "react";
import Todo from "./Todo";
import Editing from "./Editing";

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      value: "",
      editing: false,
      currentid: "",
      currentValue: "",
      submitTask: false,
    };
  }

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  onAddTask = (e) => {
    e.preventDefault();
    const isFound = this.state.todos.some((todo) => {
      if (todo.name === this.state.value.trim()) {
        return true;
      }
      return false;
    });

    if (!isFound) {
      const obj = {
        id: Date.now(),
        name: this.state.value,
        isDone: false,
        isComplete: false,
      };

      if (this.state.value !== "") {
        this.setState({ todos: this.state.todos.concat(obj), value: "" });
      }
    } else alert("A task with that name already exists");
  };

  onDeleteTask = (itemId) => {
    this.setState({
      todos: [...this.state.todos].filter((id) => id.id !== itemId),
    });
  };

  onEditTodo = (id, newValue) => {
    this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.name = newValue;
      }
      return todo;
    });
  };

  onSubmitEditTodo = (e) => {
    e.preventDefault();
    this.onEditTodo(this.state.currentid, this.state.currentValue);
    this.setState({ editing: false });
  };

  todoEdit = ({ id, name }) => {
    this.setState({
      editing: true,
      currentid: id,
      currentValue: name,
    });
  };

  onEditInputChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleCheckbox = (editedTodo) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === editedTodo.id) {
          todo.isComplete = !todo.isComplete;
        }
        return todo;
      }),
    });
  };

  handleTaskDone = (editedTodo) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === editedTodo.id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      }),
    });
  };
  onDeleteDone = () => {
    this.setState({
      todos: [...this.state.todos].filter(({ isDone }) => !isDone),
    });
  };

  onDeleteComplete = () => {
    this.setState({
      todos: [...this.state.todos].filter(({ isComplete }) => !isComplete),
    });
  };

  onDeleteAll = () => {
    this.setState({
      todos: [...this.state.todos].filter((id) => id.id === id),
    });
  };

  move = (todo, moveValue, index) => {
    let todoList = [...this.state.todos];
    const fromIndex = todoList.indexOf(todo);
    if (fromIndex !== index) {
      const toIndex = fromIndex + moveValue;
      const temp = todoList.splice(fromIndex, 1)[0];
      todoList.splice(toIndex, 0, temp);
      this.setState({ todos: todoList });
    }
  };

  moveUp = (todo) => {
    let moveValue = -1;
    let index = 0;
    this.move(todo, moveValue, index);
  };

  moveDown = (todo) => {
    let moveValue = 1;
    let index = this.state.todos.length - 1;
    this.move(todo, moveValue, index);
  };

  render() {
    return (
      <div className="todoList">
        <h1>To Do List</h1>
        <Editing
          value={this.state.value}
          currentValue={this.state.currentValue}
          editing={this.state.editing}
          onAddTask={(e) => this.onAddTask(e)}
          onChange={(e) => this.onChange(e)}
          onSubmitEditTodo={(e) => this.onSubmitEditTodo(e)}
          onEditInputChange={(e) => this.onEditInputChange(e)}
        />
        <div>
          <div className="taskDelete">
            <button
              className="btn btnRemove"
              onClick={() => this.onDeleteAll()}
            >
              Delete All
            </button>
            <button
              className="btn btnRemove"
              onClick={() => this.onDeleteDone()}
            >
              Delete Done
            </button>
            <button
              className="btn btnRemove"
              onClick={() => this.onDeleteComplete()}
            >
              Delete Complete
            </button>
          </div>
          <ul>
            {this.state.todos.map((todo) => (
              <Todo
                key={todo.id}
                name={todo.name}
                isDone={todo.isDone}
                isComplete={todo.isComplete}
                onDeleteTask={() => this.onDeleteTask(todo.id)}
                handleCheckbox={() => this.handleCheckbox(todo)}
                handleTaskDone={() => this.handleTaskDone(todo)}
                moveUp={() => this.moveUp(todo)}
                moveDown={() => this.moveDown(todo)}
                todoEdit={() => this.todoEdit(todo)}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
