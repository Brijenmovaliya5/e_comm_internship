import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Homepage = () => {
    const [name, setName] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
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
                    const response = await axios.get('http://localhost:5000/home/products');
                    setItems(response.data);
                    setFilteredItems(response.data); // Initialize filteredItems
                } catch (error) {
                    toast.error(`Error fetching items: ${ error}`);
                }
            };
            fetchItems();
        }
    }, [navigate]);

    const additem = async (item) => {
        try {
            await axios.post('http://localhost:5000/home/cart', { item, name });
            const loginuser = localStorage.getItem("loginuser");
            if (!loginuser) {
                navigate('/login');
            }
            else {
                setName(loginuser);
                const response = await axios.get(`http://localhost:5000/home/products?name=${loginuser}`);
                setItems(response.data);
                setFilteredItems(response.data); // Update filteredItems as well
               
                toast.success(`${item.name} has been added to your cart!`);
            }
            navigate('/home');
        } catch (error) {
            toast.error(`Error adding item to cart:${error}`);
        }
    };

    const handlelogout = () => {
        localStorage.removeItem("loginuser");
        navigate('/login');
    };

    const cart = () => {
        navigate('/home/carts');
    };

    const handleFilterOpen = () => {
        setFilterDialogOpen(true);
    };

    const handleFilterClose = () => {
        setFilterDialogOpen(false);
    };


    const fetchItems = async () => {
        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || Infinity;
        try {
            const response = await axios.get('http://localhost:5000/home/fproducts', {
                params: {
                    min: min,
                    max: max,
                  
                }
            });
            setItems(response.data);
            setFilteredItems(response.data); // Initialize filteredItems
            
        } catch (error) {
            toast.error(`Error fetching items: ${ error}`);
        }
    };
   
    const applyFilter = () => {

        
        toast.success(`this is your selected item`);
        fetchItems();
        handleFilterClose();
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
      <Button variant="outlined" onClick={handleFilterOpen}>Filter</Button>
           <Dialog open={filterDialogOpen} onClose={handleFilterClose}>
              <DialogTitle>Filter by Price</DialogTitle>
               <DialogContent>
                   <DialogContentText>
                       Enter the min and max price range to filter the item.
                     </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Min Price"
                        type="number"
                        fullWidth
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Max Price"
                        type="number"
                        fullWidth
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFilterClose}>Cancel</Button>
                    <Button onClick={()=>applyFilter()}>Apply</Button>
                </DialogActions>
            </Dialog>
        <div className="box-container">
          {paginatedProducts.map((item, index) => {
            
                            let p = parseFloat(item.price);
        
                            if (isNaN(p)) {
                                console.error(`Invalid price for item ${item.id}: ${item.price}`);
                                p = 0; // Or handle it appropriately
                }
            return (
              <div className="box" key={"d" + index}>
                <div className="icons">
                  <Link to="/" className="fas fa-heart"></Link>
                  <Link to="/" className="fas fa-share"></Link>
                  <Link to="/" className="fas fa-eye"></Link>
                </div>
                {/* <img
                  src={`http://localhost:8000/public/images/${item?.photos?.[0]}`}
                  alt=""
                /> */}
                <div className="content">
                <li key={item.id} className="product-item">
                           <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p>No of stocks : {item.stocks}</p>
                           <div className='="price'>Price : ${p.toFixed(2)}</div>
                           <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                          <button onClick={() => additem(item)}>Add to Cart</button>
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
          <ToastContainer/>
      <Footer />
    </div>
        // <div>
        //     <Navbar/>
      
        //     <Button variant="outlined" onClick={handleFilterOpen}>Filter</Button>
        //     <Dialog open={filterDialogOpen} onClose={handleFilterClose}>
        //         <DialogTitle>Filter by Price</DialogTitle>
        //         <DialogContent>
        //             <DialogContentText>
        //                 Enter the min and max price range to filter the item.
        //             </DialogContentText>
        //             <TextField
        //                 autoFocus
        //                 margin="dense"
        //                 label="Min Price"
        //                 type="number"
        //                 fullWidth
        //                 value={minPrice}
        //                 onChange={(e) => setMinPrice(e.target.value)}
        //             />
        //             <TextField
        //                 margin="dense"
        //                 label="Max Price"
        //                 type="number"
        //                 fullWidth
        //                 value={maxPrice}
        //                 onChange={(e) => setMaxPrice(e.target.value)}
        //             />
        //         </DialogContent>
        //         <DialogActions>
        //             <Button onClick={handleFilterClose}>Cancel</Button>
        //             <Button onClick={()=>applyFilter()}>Apply</Button>
        //         </DialogActions>
        //     </Dialog>
        //     <ul>
        //         {filteredItems.map(item => {
        //             let p = parseFloat(item.price);

        //             if (isNaN(p)) {
        //                 console.error(`Invalid price for item ${item.id}: ${item.price}`);
        //                 p = 0; // Or handle it appropriately
        //             }

        //             return (
        //                 <li key={item.id} className="product-item">
        //                     <h2>{item.name}</h2>
        //                     <p>{item.description}</p>
        //                     <p>No of stocks : {item.stocks}</p>
        //                     <p>Price : ${p.toFixed(2)}</p>
        //                     <button onClick={() => additem(item)}>Add to Cart</button>
        //                 </li>
        //             );
        //         })}
        //     </ul>
        //     <button onClick={cart}>Cart</button>
        //     <button onClick={handlelogout}>Logout</button>
        //     <ToastContainer />
        //     <Footer/>
        // </div>
    );
};

export default Homepage;
