import React, { Component } from "react";
import "./Todo.scss";

export default class Todo extends Component {
  render() {
    return (
      <li className="todoItem">
        <div className={this.props.isDone === "Done" ? "todo strike" : "task"}>
          <span className="todoItemName">Task : {this.props.name} </span>
          <span className="todoItemStatus">isDone : {this.props.isDone} </span>
          <span className="todoItemCheck">
            <input
              type="checkbox"
              className="checkBox"
              onChange={() => this.props.handleCheckbox(this.props)}
            />
          </span>
        </div>
        <br />

        <button
          className="btnMove btnUp"
          onClick={() => this.props.moveUp(this.props)}
        >
          Move Up
        </button>

        <button
          className="btnMove btnDown"
          onClick={() => this.props.moveDown(this.props)}
        >
          Move Down
        </button>

        <button
          className="btn btnEdit"
          onClick={() => this.props.todoEdit(this.props)}
        >
          Edit
        </button>

        <button
          className="btn btnRemove"
          onClick={() => this.props.onDeleteTask(this.props.id)}
        >
          Remove
        </button>
      </li>
    );
  }
}
