import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';

export const AdminNav = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  return (
    <div className="admin-nav">
      <div className="admin-nav-left">
        <h1>Admin</h1>
      </div>
      <div className="admin-nav-right">
        <li>
          <Link to="/admin">Home</Link>
        </li>
        <li>
          <Link to="/adminadd">add product</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </div>
    </div>
  );
};
