import "./App.css";
import TodoList from "./components/todoUsingClasses/TodoList";
import TodoHooks from "./components/todoUsingHooks/TodoHooks";
import "./components/todoUsingHooks/Todo.scss";

function App() {
  return (
    <div className="App">
      {/* <TodoList /> */}
      <TodoHooks />
    </div>
  );
}

export default App;
