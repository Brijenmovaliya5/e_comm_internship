import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import { ToastContainer ,toast} from 'react-toastify';
// import './register.css'
const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        bpassword: "",
        password: "",
        mobile: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const navigate = useNavigate();
    const register = (event) => {
        // event.preventdefault();
        const { name, email, bpassword, password, mobile } = user;

        if (name && email && bpassword && password && mobile) { 
            
            axios.post("http://localhost:5000/Register", user)
                .then(res =>{
                    console.log(res);
                    toast.success("register successfully");
                    navigate("/login")

                } );
        } else {
            toast.error("Invalid input");
        }
    };

    return (
        <div>
      <section class="vh-100" style={{ backgroundColor: "#eee" }}>
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-6">
              <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-5">
                  <div class="row justify-content-center">
                    <div class="col-md-12 col-lg-12 col-xl-12 order-2 order-lg-1">
                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form
                        class="mx-1 mx-md-4"
                      >
                        <div class="d-flex flex-row align-items-center mb-4">
                          {/* <i class="fas fa-user fa-lg me-3 fa-fw icone_size"></i> */}
                          <div class="form-outline flex-fill mb-0">
                            <label
                              class="form-label"
                              for="form3Example1c"
                              style={{ fontSize: "15px" }}
                            >
                              Your username
                            </label>
                            <input
                              type="text"
                              id="form3Example1c"
                              class="form-control"
                              required
                              style={{
                                height: "35px",
                                width: "100%",
                                fontSize: "14px",
                              }}
                              name="name"
                              value={user.name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          {/* <i class="fas fa-envelope fa-lg me-3 fa-fw icone_size"></i> */}
                          <div class="form-outline flex-fill mb-0">
                            <label
                              class="form-label"
                              for="form3Example3c"
                              style={{ fontSize: "15px" }}
                            >
                              Your Email
                            </label>
                            <input
                              type="email"
                              id="form3Example3c"
                              class="form-control"
                              required
                              style={{
                                height: "35px",
                                width: "100%",
                                fontSize: "14px",
                              }}
                              name="email"
                              value={user.email}
                              onChange={handleChange}
 
                            />
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          {/* <i class="fas fa-lock fa-lg me-3 fa-fw icone_size"></i> */}
                          <div class="form-outline flex-fill mb-0">
                            <label
                              class="form-label"
                              for="form3Example4c"
                              style={{ fontSize: "15px" }}
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="form3Example4c"
                              class="form-control"
                              required
                              style={{
                                height: "35px",
                                width: "100%",
                                fontSize: "14px",
                              }}
                              name="bpassword"
                              value={user.bpassword}
                              onChange={handleChange}
                   
                            />
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          {/* <i class="fas fa-key fa-lg me-3 fa-fw icone_size"></i> */}
                          <div class="form-outline flex-fill mb-0">
                            <label
                              class="form-label"
                              for="form3Example4cd"
                              style={{ fontSize: "15px" }}
                            >
                              Repeat your password
                            </label>
                            <input
                              type="password"
                              id="form3Example4cd"
                              class="form-control"
                              required
                              style={{
                                height: "35px",
                                width: "100%",
                                fontSize: "14px",
                              }}
                              name="password"
                              value={user.password}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div class="d-flex flex-row align-items-center mb-4">
                          {/* <i class="fas fa-key fa-lg me-3 fa-fw icone_size"></i> */}
                          <div class="form-outline flex-fill mb-0">
                            <label
                              class="form-label"
                              for="form3Example4cd"
                              style={{ fontSize: "15px" }}
                            >
                              Mobile no.
                            </label>
                            <input
                              type="text"
                              id="form3Example5cd"
                              class="form-control"
                              required
                              style={{
                                height: "35px",
                                width: "100%",
                                fontSize: "14px",
                              }}
                              name="mobile"
                              value={user.mobile}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div class="form-check d-flex justify-content-center mb-4 mt-5">
                          <input
                            class="form-check-input me-2"
                            type="checkbox"
                            value=""
                            required
                            id="form2Example3c"
                          />
                          <label
                            class="form-check-label"
                            for="form2Example3"
                            style={{ fontSize: "16px" }}
                          >
                            I agree all statements in{" "}
                            <Link to="/">Terms of service</Link>
                          </label>
                        </div>

                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                         
                          <input
                                                        type="button" // Change type to button
                                                        value="Register"
                                                        class="btn btn-primary btn-lg"
                                                        onClick={register} // Pass the function reference
                                                    />
                        </div>
                      </form>
                    </div>
                    {/* <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image" />

              </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </div>
    //     <div className="register">
    //         <h2>Sign-up</h2>
    //         <form>
    //             <div className="text_area">
    //                 <input
    //                     type="text"
    //                     id="name"
    //                     name="name"
    //                     value={user.name}
    //                     onChange={handleChange}
    //                     className="text_input"
    //                     placeholder="Name"
    //                 />
    //             </div>
    //             <div className="text_area">
    //                 <input
    //                     type="text"
    //                     id="email"
    //                     name="email"
    //                     value={user.email}
    //                     onChange={handleChange}
    //                     className="text_input"
    //                     placeholder="Email"
    //                 />
    //             </div>
    //             <div className="text_area">
    //                 <input
    //                     type="password"
    //                     id="bpassword"
    //                     name="bpassword"
    //                     value={user.bpassword}
    //                     onChange={handleChange}
    //                     className="text_input"
    //                     placeholder="Password"
    //                 />
    //             </div>
    //             <div className="text_area">
    //                 <input
    //                     type="password"
    //                     id="password"
    //                     name="password"
    //                     value={user.password}
    //                     onChange={handleChange}
    //                     className="text_input"
    //                     placeholder="confirm Password"
    //                 />
    //             </div>
    //             <div className="text_area">
    //                 <input
    //                     type="text"
    //                     id="mobile"
    //                     name="mobile"
    //                     value={user.mobile}
    //                     onChange={handleChange}
    //                     className="text_input"
    //                     placeholder="Mobile"
    //                 />
    //             </div>
    //             <input
    //                 type="button" // Change type to button
    //                 value="Register"
    //                 className="btn"
    //                 onClick={register} // Pass the function reference
    //             />
    //         </form>
    //         <a href="/login" className="link">Login</a>
    //     </div>
    );
};

export default Register;
