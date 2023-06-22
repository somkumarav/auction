import { useEffect, useState } from 'react';
import { AdminNav } from './AdminNav';
import axios from 'axios';
import io from 'socket.io-client';

export const Admin = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://localhost:4000/allproducts');
      setProducts(res.data.data);
      console.log(res.data.data);
    };
    fetch();
  }, [setProducts]);

  const socket = io.connect('http://localhost:4000');

  const startAuction = (product) => {
    socket.emit('start_auction', { product: product.id });
  };

  return (
    <div className="admin">
      <AdminNav />
      <div className="admin-body">
        <div className="admin-body-container">
          {products.map((product) => (
            <div key={product.id} className="admin-body-container-element">
              <img src={product.image} />
              <h2>{product.name}</h2>
              <p>base price: ₹{product.currentprice}</p>
              <button
                onClick={() => {
                  startAuction(product);
                }}
              >
                start auction
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
