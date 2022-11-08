import "./App.css";
import TodoList from "./components/TodoUsingClasses/TodoList";
import TodoHooks from "./components/TodoUsingHooks/TodoHooks";
import "./components/TodoUsingHooks/Todo.scss";

function App() {
  return (
    <div className="App">
      {/* <TodoList /> */}
      <TodoHooks />
    </div>
  );
}

export default App;
