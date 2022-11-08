import React from "react";
import Todo from "./Todo";

const TodoList = ({
  todoList,
  onDeleteTodo,
  handleEdit,
  handleTaskStatus,
  handleSelectedTask,
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
            handleTaskStatus={handleTaskStatus}
            handleSelectedTask={handleSelectedTask}
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
