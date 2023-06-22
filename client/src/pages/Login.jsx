import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [user, setUser] = useState({});
  const [input, setInput] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password) return;
    await axios.post('http://localhost:4000/login', input).then((res) => {
      if (res.data.status === 'error') {
        console.log(res.data.data);
        setUser(res.data.data);
      } else if (
        res.data.status === 'success' &&
        res.data.data.username === 'admin'
      ) {
        console.log(res.data);
        navigate('/admin');
      } else {
        console.log(res.data);
        navigate('/user', { state: { user } });
      }
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="password"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
        <button type="submit">Login</button>
        <p>
          don't have a account <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};
