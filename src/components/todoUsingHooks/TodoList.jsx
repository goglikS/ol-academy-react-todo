import React from "react";
import Todo from "./Todo";

const TodoList = ({
  todoList,
  handleUpdate,
  onDeleteTodo,
  handleEdit,
  moveUp,
  moveDown,
}) => {
  return (
    <ul>
      {todoList.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            handleUpdate={handleUpdate}
            onDeleteTodo={onDeleteTodo}
            moveUp={moveUp}
            moveDown={moveDown}
            handleEdit={handleEdit}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
