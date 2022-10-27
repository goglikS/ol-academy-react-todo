import React, { useState } from "react";
import Header from "./Header";
import TodoList from "./TodoList";

function TodoHooks() {
  const [todoList, settodoList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showEdit, setshowEdit] = useState(false);
  const [currentId, setcurrentId] = useState();

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput.trim());
    setUserInput("");
  };

  const handleEdit = (todo) => {
    setshowEdit(true);
    setUserInput(todo.task);
    setcurrentId(todo.id);
  };

  const updateTodo = (e) => {
    e.preventDefault();
    onEditTodo(currentId, userInput);
    handleToggle();
    setUserInput("");
    setshowEdit(false);
  };

  const onEditTodo = (currentId, userInput) => {
    const isFound = todoList.some((todo) => {
      if (todo.task === userInput) {
        return true;
      }
      return false;
    });
    if (!isFound && userInput !== "") {
      todoList.map((todo) => {
        if (todo.id === currentId) {
          todo.task = userInput;
        }
      });
    } else alert("Wrong Value");
  };

  const addTask = (userInput) => {
    const isFound = todoList.some((todo) => {
      if (todo.task === userInput) {
        return true;
      }
      return false;
    });

    if (!isFound && userInput !== "") {
      let todos = [...todoList];
      todos = [...todos, { id: Date.now(), task: userInput, isDone: false }];
      settodoList(todos);
    } else alert("Wrong Value");
  };

  const handleToggle = (id) => {
    let mapped = todoList.map((task) => {
      return task.id === Number(id)
        ? { ...task, isDone: !task.isDone }
        : { ...task };
    });
    settodoList(mapped);
  };

  const handleUpdate = () => {
    let mapped = todoList.map((task) => {
      return { ...task };
    });
    settodoList(mapped);
  };

  const onDeleteAll = () => {
    settodoList([]);
  };

  const onDeleteDone = () => {
    settodoList([...todoList].filter((task) => task.isDone !== true));
    setshowEdit(false);
    setUserInput("");
  };

  const onDeleteTodo = (delId) => {
    settodoList(todoList.filter(({ id }) => id !== delId));
    setshowEdit(false);
    setUserInput("");
  };

  const move = (todo, moveValue, index) => {
    let todos = todoList;
    const fromIndex = todos.indexOf(todo);
    if (fromIndex !== index) {
      const toIndex = fromIndex + moveValue;
      const temp = todos.splice(fromIndex, 1)[0];
      todos.splice(toIndex, 0, temp);
      settodoList(todos);
      handleToggle();
    }
  };

  const moveUp = (todo) => {
    let moveValue = -1;
    let index = 0;
    move(todo, moveValue, index);
  };

  const moveDown = (todo) => {
    let moveValue = 1;
    let index = todoList.length - 1;
    move(todo, moveValue, index);
  };

  return (
    <div>
      <Header />
      <button onClick={onDeleteAll} className="btn btnRemove">
        Delete All
      </button>
      <button onClick={onDeleteDone} className="btn btnRemove">
        Delete Done
      </button>

      {showEdit ? (
        <form onSubmit={updateTodo}>
          <input
            value={userInput}
            type="text"
            onChange={handleChange}
            placeholder="Edit task..."
          />
          <button>Edit</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            value={userInput}
            type="text"
            onChange={handleChange}
            placeholder="Enter task..."
          />
          <button>Add Task</button>
        </form>
      )}

      <TodoList
        todoList={todoList}
        handleToggle={handleToggle}
        handleUpdate={handleUpdate}
        onDeleteTodo={onDeleteTodo}
        moveUp={moveUp}
        moveDown={moveDown}
        handleEdit={handleEdit}
      />
    </div>
  );
}
export default TodoHooks;
