import Header from './component/Header';
import Signin from './component/Signin';
import Signup from './component/Signup';
import Main from './component/Main';
import TodoList from './component/TodoList';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './context/authProvider';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/todo" element={<TodoList />}></Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
