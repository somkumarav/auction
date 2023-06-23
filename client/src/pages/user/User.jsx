import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserNav } from './UserNav';
import { io } from 'socket.io-client';

export const User = () => {
  const [products, setProducts] = useState([]);
  const socket = io.connect('http://localhost:4000');

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://localhost:4000/allproducts');
      const pro = res.data.data;
      pro.forEach((product) => {
        product.auctionStarted = false;
      });
      setProducts(res.data.data);
    };
    fetch();
  }, [setProducts]);

  useEffect(() => {
    socket.on('rec_start', (product) => {
      const newProducts = products.map((pro) => {
        if (pro.id === product.id) {
          pro.auctionStarted = true;
        }
        return pro;
      });
      setProducts(newProducts);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('rec_end', (product) => {
      const newProducts = products.map((pro) => {
        if (pro.id === product.id) {
          pro.auctionStarted = false;
        }
        return pro;
      });
      setProducts(newProducts);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('rec_delete', (product) => {
      const newProducts = products.filter((pro) => pro.id !== product.id);
      setProducts(newProducts);
    });
  }, [socket]);

  return (
    <div className="admin">
      <UserNav />
      <div className="admin-body">
        <div className="admin-body-container">
          {products.map((product) => (
            <Link
              key={product.id}
              className="admin-body-container-element"
              to={product.auctionStarted ? '/user/product' : '#'}
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
