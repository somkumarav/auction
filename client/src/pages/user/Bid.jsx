import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { useAuth } from '../../auth';

const socket = io.connect('http://localhost:4000');

export const Bid = () => {
  const { user } = useAuth();
  const [bid, setBid] = useState(0);
  const location = useLocation();
  const { product } = location.state;
  const [auction, setAuction] = useState({
    bids: 0,
    currentprice: product.currentprice,
    currentbidder: '',
  }); //[bids,currentprice,currentbidder

  useEffect(() => {
    socket.on('rec_bid', (data) => {
      console.log(data.bidder);
      setAuction({
        ...auction,
        currentprice: data.bid,
        bids: data.bids,
        currentbidder: data.bidder,
      });
    });
  }, [socket]);

  const sendBid = () => {
    if (bid >= auction.currentprice) {
      setAuction({
        ...auction,
        currentprice: bid,
        bids: auction.bids + 1,
        currentbidder: user.username,
      });
      socket.emit('place_bid', {
        bid: bid,
        product: product.id,
        bids: auction.bids + 1,
        bidder: user.username,
      });
    } else {
      alert('bid lower than current price');
    }
  };

  return (
    <div className="bid">
      <div className="bid-container">
        <div className="bid-container-left">
          <img src={product.image} />
        </div>
        <div className="bid-container-right">
          <h1>{product.name}</h1>
          <p>Description: {product.description}</p>
          <p>base price: ₹{product.currentprice}</p>

          <br />
          <h4>auction</h4>
          <p>bids: {auction.bids}</p>
          <p>current price: {auction.currentprice}</p>
          <p>current bidder: {auction.currentbidder}</p>

          <br />
          <div>
            <input
              type="number"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
            />
            <button onClick={sendBid}>place bid</button>
          </div>
        </div>
      </div>
    </div>
  );
};
