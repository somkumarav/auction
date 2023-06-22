import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [input, setInput] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.username || !input.email || !input.password) return;
    await axios
      .post('http://localhost:4000/register', input)
      .then(() => {
        setInput({ username: '', email: '', password: '' });
      })
      .catch((err) => {
        setInput({ username: '', email: '', password: '' });
      });
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={input.username}
          onChange={(e) => setInput({ ...input, username: e.target.value })}
        />
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
        <button type="submit">Register</button>

        <p>
          already have a account <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};
