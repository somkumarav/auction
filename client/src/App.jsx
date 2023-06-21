import { Route, Routes } from 'react-router-dom';
import './styles/App.css';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Admin } from './pages/admin/Admin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
