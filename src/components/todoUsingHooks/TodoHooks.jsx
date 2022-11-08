import React, { useState } from "react";
import Header from "./Header";
import TodoList from "./TodoList";

function TodoHooks() {
  const [todoList, settodoList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showEdit, setshowEdit] = useState(false);
  const [currentId, setcurrentId] = useState();

  const handleChange = ({ target: { value } }) => {
    setUserInput(value);
  };

  const handleTaskStatus = (id) => {
    handleToggle(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput.trim());
    setUserInput("");
  };

  const handleEdit = ({ task, id }) => {
    setshowEdit(true);
    setUserInput(task);
    setcurrentId(id);
  };

  const updateTodo = (e) => {
    e.preventDefault();
    onEditTodo(currentId, userInput);
    setUserInput("");
    setshowEdit(false);
  };

  const onEditTodo = (currentId, userInput) => {
    const isFound = todoList.find((todo) => {
      if (todo.task === userInput) {
        return true;
      }
      return false;
    });

    if (!isFound && userInput !== "") {
      let todos = [...todoList];
      todos.map((todo) => {
        if (todo.id === currentId) {
          todo.task = userInput;
        }
        return todo;
      });
      settodoList(todos);
    } else alert("Wrong Value");
  };

  const addTask = (userInput) => {
    const isFound = todoList.find((todo) => {
      if (todo.task === userInput) {
        return true;
      }
      return false;
    });

    if (!isFound && userInput !== "") {
      let todos = [...todoList];
      todos = [
        ...todos,
        { id: Date.now(), task: userInput, isDone: false, isChecked: false },
      ];
      settodoList(todos);
    } else alert("Wrong Value");
  };

  const handleToggle = (id) =>
    settodoList(
      todoList.map((task) => ({
        ...task,
        isDone: task.id === Number(id) ? !task.isDone : task.isDone,
      }))
    );

  const onDeleteAll = () => {
    settodoList([]);
  };

  const onDeleteDone = () => {
    settodoList([...todoList].filter(({ isDone }) => !isDone));
    setshowEdit(false);
    setUserInput("");
  };

  const handleSelectedTask = (id) =>
    settodoList(
      todoList.map((task) => ({
        ...task,
        isChecked: task.id === Number(id) ? !task.isChecked : task.isChecked,
      }))
    );

  const onDeleteTodo = (delId) => {
    settodoList(todoList.filter(({ id }) => id !== delId));
    setshowEdit(false);
    setUserInput("");
  };

  const deleteSelected = () => {
    settodoList([...todoList].filter(({ isChecked }) => !isChecked));
    setshowEdit(false);
    setUserInput("");
  };

  const move = (todo, moveValue, index) => {
    let todos = [...todoList];
    const fromIndex = todos.indexOf(todo);
    if (fromIndex !== index) {
      const toIndex = fromIndex + moveValue;
      const temp = todos.splice(fromIndex, 1)[0];
      todos.splice(toIndex, 0, temp);
      settodoList(todos);
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
      <button onClick={deleteSelected} className="btn btnRemove">
        Delete Selected
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
        onDeleteTodo={onDeleteTodo}
        moveUp={moveUp}
        moveDown={moveDown}
        handleEdit={handleEdit}
        handleTaskStatus={handleTaskStatus}
        handleSelectedTask={handleSelectedTask}
      />
    </div>
  );
}
export default TodoHooks;
