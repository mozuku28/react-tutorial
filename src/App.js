import './App.css';
import TodoList from "./TodoList";
import { useState } from 'react';

function App() {
const [todos, setTodos] = useState(["Todo1", "Todo2"]);

return (
    <div>
      <TodoList todos={todos} />
      <input type="text"/>
      <button>タスクを追加</button>
      <button>完了したタスクの削除</button>
      <div>残りのタスク；０</div>
    </div>
  );
}

export default App;
