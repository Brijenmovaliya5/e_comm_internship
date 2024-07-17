import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import 'react-toastify/dist/ReactToastify.css';
const Cart = () => {
    const [name, setName] = useState('');
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 6;
    const navigate = useNavigate();
    useEffect(() => {
        const loginuser = localStorage.getItem("loginuser");
        if (!loginuser) {
            navigate('/login');
        } else {
            setName(loginuser);
            const fetchItems = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/home/cart?name=${loginuser}`);
                    setItems(response.data);
                } catch (error) {
                    toast.error(`Error fetching items: ${error}`);
                }
            };
            fetchItems();
        }
    }, []);

    const removeitem = async (item) => {
        try {
            const tmp = await axios.post('http://localhost:5000/home/removeitem', { item, name });
            toast.success('Item removed from cart');
            console.log(tmp)

            const loginuser = localStorage.getItem("loginuser");
            if (!loginuser) {
                navigate('/login');
            } else {
                setName(loginuser);
                const fetchItems = async () => {
                    try {
                        const response = await axios.get(`http://localhost:5000/home/cart?name=${loginuser}`);
                        setItems(response.data);
                    } catch (error) {
                        toast.error(`Error fetching items: ${error}`);
                    }
                };
                fetchItems();
            }

        } catch (error) {
            console.error("Error removing item: ", error);
        }
    };

    const updateitem = async (item, newQuantity, newPrice) => {
        try {
            const tmp = await axios.post('http://localhost:5000/home/updateitem', { item, newQuantity, newPrice });
            console.log(tmp)
            toast.success(`item update successfully`);
            const loginuser = localStorage.getItem("loginuser");
            if (!loginuser) {
                navigate('/login');
            } else {
                setName(loginuser);
                const fetchItems = async () => {
                    try {
                        const response = await axios.get(`http://localhost:5000/home/cart?name=${loginuser}`);
                        setItems(response.data);

                    } catch (error) {
                        toast.error(`Error fetching items: ${error}`);
                    }
                };
                fetchItems();
            }

        } catch (error) {
            console.error("Error removing item: ", error);
        }
    };

    
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    // Calculate the total number of pages
    const pageCount = Math.ceil(items.length / perPage);

    // Calculate the range of products to display based on currentPage and perPage
    const offset = currentPage * perPage;
    const paginatedProducts = items.slice(offset, offset + perPage);


    return (

        <div>
            <Navbar />
           
            <section className="products" id="products">
            <h2 >your cart</h2>
                <div className="box-container">
                    {paginatedProducts.map((item, index) => {

                        let p = parseFloat(item.price);

                        if (isNaN(p)) {
                            console.error(`Invalid price for item ${item.id}: ${item.price}`);
                            p = 0; // Or handle it appropriately
                        }
                        return (
                            <div className="box" key={"d" + index}>
                                {/* <div className="icons">
                    <Link to="/" className="fas fa-heart"></Link>
                    <Link to="/" className="fas fa-share"></Link>
                    <Link to="/" className="fas fa-eye"></Link>
                  </div> */}
                                {/* <img
                    src={`http://localhost:8000/public/images/${item?.photos?.[0]}`}
                    alt=""
                  /> */}
                                <div className="content">
                                    <li key={item.id} className="product-item">
                                        <h2>{item.name}</h2>
                                        <h6>{item.description}</h6>
                                        <h6>{item.no_of_item}</h6>
                                        <div className='="price'>Total Price : ${p.toFixed(2)}</div>
                                        <div className="stars">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="far fa-star"></i>
                                        </div>
                                        <button onClick={() => removeitem(item)}>Remove from Cart</button><br/>
                                        <button onClick={() => updateitem(item, item.no_of_item + 1, parseInt(item.price) + parseInt(item.price) / item.no_of_item)}>+</button>
                                        <button onClick={() => updateitem(item, item.no_of_item - 1, parseInt(item.price) - parseInt(item.price) / item.no_of_item)}>-</button>
                                    </li>



                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <div className='pagination mt-4'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </div>

            <Footer />
        </div>


        //  <div>


        //     <ul>
        //         {items.map(item => (
        //             <li key={item.id} className="product-item">
        //                 <h2>{item.itemname}</h2>
        //                 <p>{item.description}</p>
        //                 <p>{item.no_of_item}</p>
        //                 <p>${item.price}</p>
        //                 <button onClick={() => removeitem(item)}>remove to Cart</button>
        //                 <button  onClick={() => updateitem(item,item.no_of_item+1,parseInt(item.price)+parseInt(item.price)/item.no_of_item)}>+</button>
        //                 <button  onClick={() => updateitem(item,item.no_of_item-1,parseInt(item.price)-parseInt(item.price)/item.no_of_item)}>-</button>

        //             </li>
        //         ))}
        //     </ul>
        //     <div>
        //     <ToastContainer/>
        //     </div>
        //   </div>



    )
}
export default Cart