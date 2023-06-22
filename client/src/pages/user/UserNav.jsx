export const AdminNav = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="admin-nav">
      <div className="admin-nav-left">
        <h1>User</h1>
      </div>
      <div className="admin-nav-right">
        <li>
          <Link to="/user">Home</Link>
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
