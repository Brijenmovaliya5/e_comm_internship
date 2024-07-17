// FeaturedProduct.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const FeaturedProduct = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/home/products');
        setProductData(response.data);
      } catch (error) {
        toast.error(`Error fetching products: ${error}`);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="featured" id="featured">
      <h1 className="heading"><span>featured</span> products</h1>
      {productData.slice(0, 3).map((item, index) => (
        <div className="row" key={index}>
          {/* <div className="image-container">
            <div className="small-image">
              {item.photos.map((photo, idx) => (
                <img key={idx} src={`http://localhost:8000/public/images/${photo}`} className="featured-image-1" alt="" />
              ))}
            </div>
            <div className="big-image">
              <img src={`http://localhost:8000/public/images/${item.photos[0]}`} className="big-image-1" alt="" />
            </div>
          </div> */}
          <div className="content">
            <h3>{item.title}</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
            </div>
            <p>{item.description}</p>
            <div className="price">${item.price} <span>${item.price1}</span></div>
            <Link to="/" className="btn">add to cart</Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeaturedProduct;
