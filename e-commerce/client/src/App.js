import './App.css';
import Homepage from './componant/home/Homepage';
import Login from './componant/login/Login';
import Adminregister from './componant/register/Adminregister';
import Adminlogin from'./componant/login/Adminlogin'
import Register from './componant/register/Register';
import { ToastContainer } from "react-toastify";
import Root from './componant/root/Root';
import Adminhome from './componant/home/Adminhome';
import Cart from'./componant/cart/Cart';
import Adminitemdisplay from './componant/home/Adminitemdisplay';
import ContactUs from "./componant/contactUs/contactUs";
import About from "./componant/about/about";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import Otpverification from './componant/register/otpverification';


//import { useState } from 'react';

function App() {
  //const [user, setLoginUser] = useState(null); // Initialize user state with null

  return (
    <>
      {/* <Header /> */}
      <Router>
      <div>
        <Routes>
          {/* Render Homepage if user is logged in, otherwise render Login */}
          <Route path="/" element={ <Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminregister" element={<Adminregister />} />
          <Route path="/adminhome" element={<Adminhome />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/home/carts" element={<Cart />} />
          {/* <Route path="/otp" element={<Otpverification/>}/> */}
          <Route path="/adminitemdisplay" element={<Adminitemdisplay />} />
          <Route exact path="/contactus" element={<ContactUs />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
        </div>
      </Router>
      {/* <Footer /> */}
      <ToastContainer
        style={{
          fontSize: "20px",
        }}
      />
    </>
  );
}

export default App;
