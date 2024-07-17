// Root.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import HomeSlider from './homeSlider';
import FeaturedProduct from './featuredProduct';
import TrandingProduct from './TrandingProduct';

const Root = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <HomeSlider />

      {/* Service Section */}
      <section className="service">
        <div className="box-container">
          <div className="box card box-card">
            <i className="fas fa-shipping-fast mt-2"></i>
            <h3>fast delivery</h3>
            <p className="mb-0">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum,
              fugit.
            </p>
          </div>
          <div className="box card box-card">
            <i className="fas fa-undo mt-2"></i>
            <h3>10 days replacements</h3>
            <p className="mb-0">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum,
              fugit.
            </p>
          </div>
          <div className="box card box-card">
            <i className="fas fa-headset mt-2"></i>
            <h3>24 x 7 support</h3>
            <p className="mb-0">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum,
              fugit.
            </p>
          </div>
        </div>
      </section>

      <FeaturedProduct />
      <TrandingProduct />

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="content">
          <h3>monthly newsletter</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
            ullam veniam at itaque culpa hic corporis saepe dicta doloremque
            nihil.
          </p>
          <form action="">
            <input type="email" placeholder="enter your email" className="box" />
            <input type="submit" value="send" className="btn mb-0" />
          </form>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <div className="colorlib-partner">
        <div className="container">
          {/* <div className="row">
            <div className="col-sm-8 offset-sm-2 text-center colorlib-heading colorlib-heading-sm">
              <h2>Trusted Partners</h2>
            </div>
          </div> */}
          {/* <div className="row">
            <div className="col partner-col text-center">
              <img src="images/brand-1.jpg" className="img-fluid" alt="Brand 1" />
            </div>
            <div className="col partner-col text-center">
              <img src="images/brand-2.jpg" className="img-fluid" alt="Brand 2" />
            </div>
            <div className="col partner-col text-center">
              <img src="images/brand-3.jpg" className="img-fluid" alt="Brand 3" />
            </div>
            <div className="col partner-col text-center">
              <img src="images/brand-4.jpg" className="img-fluid" alt="Brand 4" />
            </div>
            <div className="col partner-col text-center">
              <img src="images/brand-5.jpg" className="img-fluid" alt="Brand 5" />
            </div>
          </div> */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Root;
