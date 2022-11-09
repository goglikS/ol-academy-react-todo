import React, { Component } from "react";
import "./TodoList.scss";

export default class Editing extends Component {
  render() {
    return (
      <div className="editInput">
        {this.props.editing === false ? (
          <form onSubmit={this.props.onAddTask}>
            <input
              placeholder="add your task"
              value={this.props.value}
              onChange={this.props.onChange}
            />
            <button
              className="btn btnAdd"
              onClick={this.props.onAddTask}
              disabled={!this.props.value}
            >
              Add Task
            </button>
          </form>
        ) : (
          <form onSubmit={this.props.onSubmitEditTodo}>
            <input
              placeholder="edit your task"
              value={this.props.currentValue}
              name={this.props.currentValue}
              onChange={this.props.onEditInputChange}
            />
            <button
              className="btn btnAdd"
              onClick={this.props.onSubmitEditTodo}
            >
              Update Task
            </button>
          </form>
        )}
      </div>
    );
  }
}
