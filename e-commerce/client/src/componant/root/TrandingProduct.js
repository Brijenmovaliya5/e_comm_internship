// TrandingProduct.jsx
import React, { useEffect, useState } from 'react';
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const TrandingProduct = () => {
  const [swiper, setSwiper] = useState(null);
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/home/products');
      setItems(response.data);
    } catch (error) {
      toast.error(`Error fetching items: ${error}`);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const nextSlide = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  return (
    <section className="products" id="products">
      <h1 className="heading"> <span> trending </span> products </h1>
      <Swiper
        onSwiper={setSwiper}
        spaceBetween={20}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-slide slide card p-2">
              <div className="image">
                {/* <img src={`http://localhost:8000/public/images/${item.image}`} alt="" /> */}
                <div className="icons">
                  <Link to="/" className="fas fa-heart"></Link>
                  <Link to="/" className="cart-btn">add to cart</Link>
                  <Link to="/" className="fas fa-share"></Link>
                </div>
              </div>
              <div className="content">
                <h3>{item.name}</h3>
                <div className="price">${item.price} </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div id="prev" className="fas fa-chevron-left" onClick={prevSlide}></div>
      <div id="next" className="fas fa-chevron-right" onClick={nextSlide}></div>
    </section>
  );
};

export default TrandingProduct;
