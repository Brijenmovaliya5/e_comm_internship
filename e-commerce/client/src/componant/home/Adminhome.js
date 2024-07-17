import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
// import './home.css';
// import './additem.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Adminhome = () => {
    const [name, setName] = useState('');
    const [item, setItem] = useState({
        name: '',
        description: '',
        price: '',
        stocks: ''
    });

    const navigate = useNavigate();
    useEffect(() => {
        const loginadmin = localStorage.getItem("loginadmin");
        if (!loginadmin) {
            navigate('/adminlogin');
        } else {
            setName(loginadmin);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({
            ...item,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/adminhome/addnewitem', { name, item });
            navigate('/adminitemdisplay');
            toast.success('Item Added Successfully');
        } catch (error) {
            toast.error(`Error adding item: ${ error}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("loginadmin");
        navigate('/adminlogin');
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
                        you can add youe own item
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
                                Item Name
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
                                value={item.name}
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
                                Description of item
                              </label>
                              <input
                                type="text"
                                id="form3Example3c"
                                class="form-control"
                                required
                                style={{
                                  height: "35px",
                                  width: "100%",
                                  fontSize: "14px",
                                }}
                                name="description"
                                value={item.description}
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
                                Price of item
                              </label>
                              <input
                                type="number"
                                id="form3Example4c"
                                class="form-control"
                                required
                                style={{
                                  height: "35px",
                                  width: "100%",
                                  fontSize: "14px",
                                }}
                                name="price"
                                value={item.price}
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
                                
                                Number of stocks
                              </label>
                              <input
                                type="number"
                                id="form3Example4cd"
                                class="form-control"
                                required
                                style={{
                                  height: "35px",
                                  width: "100%",
                                  fontSize: "14px",
                                }}
                                name="stocks"
                                value={item.stocks}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          
  
                          
                          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                           
                            <input
                                                          type="button" // Change type to button
                                                          value="add new item"
                                                          class="btn btn-primary btn-lg"
                                                          onClick={handleSubmit} // Pass the function reference
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
        <ToastContainer />
      </div>
        // <>
        //     <h1>Welcome to adminHomepage {name}</h1>
        //     <h1>Add New Item</h1>
        //     <form onSubmit={handleSubmit} className="add-item-form">
        //         <div className="form-group">
        //             <label htmlFor="itemname">Item Name</label>
        //             <input
        //                 type="text"
        //                 id="itemname"
        //                 name="name" // This should match the key in the item state object
        //                 value={item.name}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="description">Description</label>
        //             <textarea
        //                 id="description"
        //                 name="description"
        //                 value={item.description}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="price">Price</label>
        //             <input
        //                 type="number"
        //                 id="price"
        //                 name="price"
        //                 value={item.price}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="stocks">Stocks</label>
        //             <input
        //                 type="number"
        //                 id="stocks"
        //                 name="stocks"
        //                 value={item.stocks}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <button type="submit" className="submit-btn">Add Item</button>
        //     </form>
        //     <button onClick={handleLogout}>Logout</button>
        //     <Link to="/adminitemdisplay" className="link">adminitemdisplay</Link>
        //     <ToastContainer />
        // </>
    );
};

export default Adminhome;
