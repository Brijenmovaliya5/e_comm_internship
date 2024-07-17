import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const cart = () => {
    navigate('/home/carts');
};

const profile=()=>{

}

  const toggleActive = () => {
    setActive(!active);
  };
const home=()=>{
  navigate('/home');
}
  return (
    <div className="navbar-top">
      
      <header className="pt-0 pb-0">
        <div
          id="menu-bar"
          className={`fas fa-bars ${active ? "fa-times" : ""}`}
          onClick={toggleActive}
        ></div>

        <Link to="/" className="logo text-d">
          {/* nike */}
          <img src="images/c8da0175e9dba0109e4baaca8753b277.png" width="120px" alt="ecomm" />
        </Link>

        <nav className={`navbar ${active ? "active" : ""}`}>
          <Link to="/home" className="text-d">
            home
          </Link>
          <Link to="/product" className="text-d">
            products
          </Link>
          <Link to="/about" className="text-d">
            about
          </Link>
          {/* <Link to="#review" className="text-d">
            review
          </Link> */}
          <Link to="/contactus" className="text-d">
            contactus
          </Link>
        </nav>

        <div className="icons">
          <Link to="/" className="fas fa-heart text-d"></Link>
          <Link to="/home/carts" className="fas fa-shopping-cart text-d"></Link>
          {/* <Link to="/" className="fas fa-user text-d"></Link> */}
          {/* fas fa-sign-out-alt */}

          {localStorage.getItem("authToken") ? (
            <Link
            className="fas fa-sign-out-alt text-d"
            to="#"
            onClick={() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("authId");
                toast.success("Logout successfully...!!!");
              }}
            >
            </Link>
          ) : (
            <Link
            className="fas fa-user text-d"
              
              onClick={() => {
                localStorage.getItem("authToken");
                navigate("/login");
              }}
            >
            </Link>
          )}
        </div>
      </header>

      <div className="LineBGColor">
        <div className="container">
          <div className="row">
            <h4 className="m-auto col-4 d-flex justify-content-center align-items-center hedLineTxt">
              1500+ New Products Added Weekly
            </h4>
            <h4 className="m-auto col-4 d-flex justify-content-center align-items-center hedLineTxt">
              Top Trending Styles
            </h4>
            <h4 className="m-auto col-4 d-flex justify-content-center align-items-center hedLineTxt">
              View Your<strong className="ps-1"> Personalized Favorites</strong>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
