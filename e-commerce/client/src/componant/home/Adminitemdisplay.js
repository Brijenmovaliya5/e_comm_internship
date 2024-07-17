import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './home.css';
import Button from '@mui/material/Button';
import Updateitemdialog from './Updateitemdialog';

import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

import 'react-toastify/dist/ReactToastify.css';

const Adminitemdisplay = () => {
    const [name, setName] = useState('');
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 6;

    useEffect(() => {
        const loginadmin = localStorage.getItem("loginadmin");
        if (!loginadmin) {
            navigate('/adminlogin');
        } else {
            setName(loginadmin);
            const fetchItems = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/adminhome/items?name=${loginadmin}`);
                    setItems(response.data);
                } catch (error) {
                    toast.error(`Error fetching items: ${error}`);
                }
            };

            fetchItems();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem({
            ...selectedItem,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:5000/adminhome/updateitem', { item: selectedItem, name });
            setDialogOpen(false);
            toast.success('Item updated successfully');
            const fetchItems = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/adminhome/items?name=${name}`);
                    setItems(response.data);
                } catch (error) {
                    toast.error(`Error fetching items: ${error}`);
                }
            };
            fetchItems();
        } catch (error) {
            toast.error(`Error updating items: ${error}`);
        }
    };

    const updateItem = (item) => {
        setSelectedItem(item);
        setDialogOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("loginadmin");
        navigate('/adminlogin');
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
                                        <h6>{item.stocks}</h6>
                                        <div className='="price'>Total Price : ${p.toFixed(2)}</div>
                                        <div className="stars">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="far fa-star"></i>
                                        </div>
                                        <Button variant="contained" color="primary" onClick={() => updateItem(item)}>
                                            Update Item
                                        </Button>
                                    </li>

                                    {selectedItem && (
                                    <Updateitemdialog
                                        open={dialogOpen}
                                        handleClose={() => setDialogOpen(false)}
                                        handleSubmit={handleSubmit}
                                        item={selectedItem}
                                        handleChange={handleChange}
                                    />
                                )}

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
            <ToastContainer/>

            <Footer />
        </div>

        
    );
};

export default Adminitemdisplay;
