import Header from './component/Header';
import Signin from './component/Signin';
import Signup from './component/Signup';
import Main from './component/Main';
import TodoList from './component/TodoList';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/todo-list" element={<TodoList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
