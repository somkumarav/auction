import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';

export const UserNav = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  return (
    <div className="admin-nav">
      <div className="admin-nav-left">
        <h1>Welcome, {user.username}</h1>
      </div>
      <div className="admin-nav-right">
        <li>
          <Link to="/user">Home</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </div>
    </div>
  );
};
