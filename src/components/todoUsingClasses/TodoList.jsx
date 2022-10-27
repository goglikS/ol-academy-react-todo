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

  onChange = (e) => {
    this.setState({ value: e.target.value });
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
        isDone: "False",
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
    });
  };

  onSubmitEditTodo = (e) => {
    e.preventDefault();
    this.onEditTodo(this.state.currentid, this.state.currentValue);
    this.setState({ editing: false });
  };

  todoEdit = (todo) => {
    this.setState({
      editing: true,
      currentid: todo.id,
      currentValue: todo.name,
    });
  };

  onEditInputChange = (e) => {
    this.setState({ currentValue: e.target.value });
  };

  handleCheckbox = (todo) => {
    if (todo.isDone === "False") {
      todo.isDone = "Done";
    } else todo.isDone = "False";

    this.setState(({ todos }) => ({
      todos: todos.filter((todo) => !todo.selected),
    }));
  };

  onDeleteDone = () => {
    this.setState({
      todos: [...this.state.todos].filter((isDone) => isDone.isDone !== "Done"),
    });
  };

  onDeleteAll = () => {
    this.setState({
      todos: [...this.state.todos].filter((id) => id.id === id),
    });
  };

  move = (todo, moveValue, index) => {
    let todoList = this.state.todos;
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
          </div>
          <ul>
            {this.state.todos.map((todo) => (
              <Todo
                key={todo.id}
                name={todo.name}
                isDone={todo.isDone}
                onDeleteTask={() => this.onDeleteTask(todo.id)}
                handleCheckbox={() => this.handleCheckbox(todo)}
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
