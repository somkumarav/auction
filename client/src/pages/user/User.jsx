import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserNav } from './UserNav';

export const User = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://localhost:4000/allproducts');
      setProducts(res.data.data);
      console.log(res.data.data);
    };
    fetch();
  }, [setProducts]);

  return (
    <div className="admin">
      <UserNav />
      <div className="admin-body">
        <div className="admin-body-container">
          {products.map((product) => (
            <Link
              key={product.id}
              className="admin-body-container-element"
              to="/user/product"
              state={{ product }}
            >
              <img src={product.image} />
              <h2>{product.name}</h2>
              <p>base price: ₹{product.currentprice}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
