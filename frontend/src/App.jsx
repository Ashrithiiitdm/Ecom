import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Collection from './pages/Collection.jsx';
import About from './pages/About.jsx';
import Navbar from './components/Navbar.jsx';
import Contact from './pages/Contact.jsx';
import Product from './pages/Product.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Orders from './pages/Orders.jsx';
import Login from './pages/Login.jsx';
import Cart from './pages/Cart.jsx';
import Footer from './components/Footer.jsx';
import SearchBar from './components/SearchBar.jsx';
import { ToastContainer } from 'react-toastify';
import Verify from './pages/Verify.jsx';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />}/>
            <Route path='/collection' element={<Collection />} />
            <Route path='/about' element={<About />}/>
            <Route path='/products/:productId' element={<Product />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/place-order' element={<PlaceOrder />}/>
            <Route path='/orders' element={<Orders />}/>
            <Route path= '/verify' element={<Verify />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App
