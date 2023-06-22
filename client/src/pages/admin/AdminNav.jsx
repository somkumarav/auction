import { Link } from 'react-router-dom';

export const AdminNav = () => {
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
          <button>Logout</button>
        </li>
      </div>
    </div>
  );
};
