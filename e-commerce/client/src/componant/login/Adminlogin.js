import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Adminlogin = () => {
    const [adminname, setAdminname] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
       
        const loginuser = localStorage.getItem("loginadmin");
        if(!loginuser){
         navigate('/adminlogin');
        }else{
         navigate('/adminhome');
        }
     },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "adminname") setAdminname(value);
        if (name === "password") setPassword(value);
    };
    const handleauth=()=>{
        axios.get('http://localhost:5000/checkauthadmin',{
            headers:
            {
                'access-token':localStorage.getItem("token")
            }
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    const login = () => {
        axios.post("http://localhost:5000/adminLogin", { adminname, password })
        .then(res => {
                console.log(res);

                if(res.data.adminLogin){
                    // setLoginUser(res.data.username);
                    alert("record");
                    localStorage.setItem("token",res.data.token);
                    localStorage.setItem("loginadmin",res.data.adminLogin);
                    handleauth();
                    navigate("/adminhome");
                }
                else{
                    alert("no record");
                }
            });
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
                                               Admin Login
                                            </p>

                                            <form
                                                class="mx-1 mx-md-4">
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    {/* <i class="fas fa-envelope fa-lg me-3 fa-fw icone_size"></i> */}
                                                    <div class="form-outline flex-fill mb-0">
                                                        <label
                                                            class="form-label"
                                                            for="form3Example3c"
                                                            style={{ fontSize: "15px" }}
                                                        >
                                                            Your Adminname
                                                        </label>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            required
                                                            style={{
                                                                height: "35px",
                                                                width: "100%",
                                                                fontSize: "14px",
                                                            }}
                                                            name="adminname"
                                                            value={adminname}
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
                                                            required
                                                            class="form-control"
                                                            style={{
                                                                height: "35px",
                                                                width: "100%",
                                                                fontSize: "14px",
                                                            }}
                                                            name="password"
                                                            value={password}
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
                                                        <Link to="/" className="text-decoration-none">Terms of service</Link>
                                                    </label>
                                                </div>

                                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">

                                                    <input
                                                        type="button" // Change type to button
                                                        value="LOGIN"
                                                        class="btn btn-primary btn-lg"
                                                        onClick={login} // Pass the function reference
                                                    />

                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                    <center><h4>Not registered? <Link to="/adminregister" className="text-decoration-none"> Create an account</Link></h4></center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer/>
        </div>
        // <div className="login">
        //     <h2>Login</h2>
        //     <form>
        //         <div className="text_area">
        //             <input
        //                 type="text"
        //                 id="adminname"
        //                 name="adminname"
        //                 value={adminname}
        //                 onChange={handleChange}
        //                 className="text_input"
        //                 placeholder="Adminname"
        //             />
        //         </div>
        //         <div className="text_area">
        //             <input
        //                 type="password"
        //                 id="password"
        //                 name="password"
        //                 value={password}
        //                 onChange={handleChange}
        //                 className="text_input"
        //                 placeholder="Password"
        //             />
        //         </div>
        //         <input
        //             type="button" // Change type to button
        //             value="LOGIN"
        //             className="btn"
        //             onClick={login} // Pass the function reference
        //         />
        //     </form>
        //     <Link to="/adminregister" className="link">Sign Up</Link>
        // </div>
    );
};

export default Adminlogin;
