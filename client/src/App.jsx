import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import './styles/auth.css';
import './styles/admin.css';
import './styles/user.css';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Admin } from './pages/admin/Admin';
import { AddItem } from './pages/admin/AddItem';
import { User } from './pages/user/User';
import { Bid } from './pages/user/Bid';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/adminadd" element={<AddItem />} />

        <Route path="/user" element={<User />} />
        <Route app path="/user/product" element={<Bid />} />
      </Routes>
    </div>
  );
}

export default App;
