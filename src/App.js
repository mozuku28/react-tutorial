import './App.css'; // アプリケーションのスタイルをインポート
import TodoList from "./TodoList"; // Todoリストコンポーネントをインポート
import { useState, useRef, useEffect } from 'react'; // Reactフックをインポート
import { v4 as uuidv4 } from "uuid"; // ユニークなIDを生成するためのUUIDライブラリをインポート
import db from "./firebase"; // Firebaseのデータベースをインポート
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore"; // Firebase Firestoreからコレクション操作関数をインポート

function App() {

  // todos: タスクのリストを保持する状態
  // setTodos: タスクのリストを更新する関数
  const [todos, setTodos] = useState([]);

  // todoNameRef: タスク名の入力フィールドを参照するためのref
  const todoNameRef = useRef();
 
  // タスクを追加する関数
  const handleAddTodo = () => {
    // 入力フィールドからタスク名を取得する。
    const name = todoNameRef.current.value;

    // タスク名が空の場合は何もしない。
    if (name === "") return;

    // 現在のタスクリストに新しいタスクを追加する。
    setTodos((prevTodos) => {

    // 新しいタスクオブジェクトを作成し、以前のタスクリストに追加
    return [...prevTodos, {id: uuidv4(), name: name, completed: false}];

    // 入力フィールドをクリアする。
    todoNameRef.current.value = null;
    });
  };

  // タスクの完了状態を切り替える関数
  const toggleTodo = (id) => {
    // タスクのリストをコピーして、新しいリストを作成
    const newTodos = [...todos];
    // 指定されたIDのタスクを検索
    const todo = newTodos.find((todo) => todo.id === id);
    // タスクの完了状態を反転
    todo.completed = !todo.completed;
    // 更新されたタスクリストをセット
    setTodos(newTodos);
  };

  // 完了したタスクを削除する関数
  const handleClear = () => {
    // 未完了のタスクのみをフィルターして、新しいリストを作成
    const newTodos = todos.filter((todo) => !todo.completed);
    // 更新されたタスクリストをセット
    setTodos(newTodos);
  };

  // posts: Firebaseから取得したデータを保持する状態
  // setPosts: Firebaseから取得したデータを更新する関数
  const [posts, setPosts] = useState([]);


  // コンポーネントがマウントされた時にFirebaseからデータを取得する
  useEffect(() => {
    // Firebaseから"posts"コレクションのデータを取得
    const postData = collection(db, "posts");
    getDocs(postData).then((snapShot) => {
      // 取得したデータをposts状態にセット
      setPosts(snapShot.docs.map(doc => ({...doc.data()})));
    });
  }, []); // 空の依存配列により、このエフェクトはコンポーネントの初回マウント時にのみ実行される



return (
    <>
      <div>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input type="text" ref={todoNameRef} />
        <button onClick={handleAddTodo}>タスクを追加</button>
        <button onClick={handleClear}>完了したタスクの削除</button>
        <div>残りのタスク：{todos.filter((todo) => !todo.completed).length}</div>
      </div>
      <div>
        {posts.map((post) => (
          <div>
            <h1>{post.title}</h1>
            <h1>{post.text}</h1>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
