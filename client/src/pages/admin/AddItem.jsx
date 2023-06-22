import { useState } from 'react';
import { AdminNav } from './AdminNav';
import axios from 'axios';

export const AddItem = () => {
  const [product, setProduct] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);
    await axios
      .post('http://localhost:4000/addproduct', product)
      .then((res) => {
        setProduct({});
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <AdminNav />
      <div className="admin-add-body">
        <h1>Post Ad</h1>
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <textarea
            placeholder="Product Description"
            rows="5"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          ></textarea>
          <input
            type="number"
            placeholder="base price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="category"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="image"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};
