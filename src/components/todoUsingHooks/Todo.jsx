import "./Todo.scss";

const Todo = ({
  todo,
  moveUp,
  moveDown,
  handleEdit,
  handleUpdate,
  onDeleteTodo,
}) => {
  const handleChange = () => {
    todo.isDone = !todo.isDone;
    handleUpdate();
  };

  return (
    <li>
      <div
        id={todo.id}
        value={todo.id}
        className={todo.isDone ? "todo strike" : "todo"}
      >
        <span className="todoItemName">Task : {todo.task} </span>
        <span>
          <input type="checkbox" className="checkBox" onClick={handleChange} />
        </span>
      </div>

      <br />

      <button className="btnMove btnUp" onClick={() => moveUp(todo)}>
        Move Up
      </button>

      <button className="btnMove btnDown" onClick={() => moveDown(todo)}>
        Move Down
      </button>

      <button className="btn btnEdit" onClick={() => handleEdit(todo)}>
        Edit
      </button>

      <button className="btn btnRemove" onClick={() => onDeleteTodo(todo.id)}>
        Remove
      </button>
    </li>
  );
};

export default Todo;
