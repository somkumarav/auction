import { useEffect, useState } from 'react';
import { AdminNav } from './AdminNav';
import axios from 'axios';
import io from 'socket.io-client';

export const Admin = () => {
  const [products, setProducts] = useState([]);
  const [showWinner, setShowWinner] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://localhost:4000/allproducts');
      setProducts(res.data.data);
      console.log(res.data.data);
    };
    fetch();
  }, [setProducts]);

  const socket = io.connect('http://localhost:4000');

  useEffect(() => {
    socket.on('rec_bid', (data) => {
      console.log(data.bidder);
      const newProducts = products.map((pro) => {
        if (pro.id === data.product) {
          pro.currentbidder = data.bidder;
        }
        return pro;
      });
      setProducts(newProducts);
      console.log(products);
    });
  }, [socket]);

  const startAuction = (product) => {
    socket.emit('start_auction', product);
  };

  const endAuction = (product) => {
    setShowWinner(true);
    socket.emit('end_auction', product);
  };

  const deleteAuction = (product) => {
    socket.emit('delete_auction', product);
    setProducts(products.filter((pro) => pro.id !== product.id));
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
              {showWinner ? <p>Winner: {product.currentbidder}</p> : <p></p>}
              <button
                onClick={() => {
                  startAuction(product);
                }}
              >
                start auction
              </button>
              <button
                onClick={() => {
                  endAuction(product);
                }}
              >
                end auction
              </button>
              <button
                onClick={() => {
                  deleteAuction(product);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
