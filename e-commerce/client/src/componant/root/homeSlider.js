// HomeSlider.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { toast } from "react-toastify";

const HomeSlider = () => {
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
    <div>
      <section className="home" id="home">
        <Swiper
          onSwiper={setSwiper}
          slidesPerView={1}
          loop={true}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="slide-container active">
                <div className="slide">
                  <div className="content">
                    <span>{item.name}</span>
                    <p>{item.description}</p>
                    <Link to="/" className="btn">add to cart</Link>
                  </div>
                  {/* <div className="image">
                    <img src={`http://localhost:8000/public/images/${item?.image}`} className="shoe" alt="" />
                    <img src={`http://localhost:8000/public/images/${item?.bg_image}`} className="text" alt="" />
                  </div> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div id="prev" className="fas fa-chevron-left" onClick={prevSlide}></div>
        <div id="next" className="fas fa-chevron-right" onClick={nextSlide}></div>
      </section>
    </div>
  );
};

export default HomeSlider;
