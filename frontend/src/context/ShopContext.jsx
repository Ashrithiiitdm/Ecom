import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios.js';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;

    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId,size) => {
        if(!size){
            toast.error('Please select a size');
            return;
        }

        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if(token){
            try{
                await axios.post('/api/cart/add', {
                    item_id: itemId,
                    size,

                }, {headers: {token}});
            }
            catch(err){
                console.log(err);
                toast.error(err.message);
            }
        }

    }
    
    const getCartCount = ()=>{
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalCount += cartItems[items][item];
                    }
                }
                catch(err){
                    console.log(err);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) =>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if(token){
            try{
                await axios.post('/api/cart/update', {
                    item_id: itemId,
                    size,
                    quantity,

                }, {headers: {token}});
            }
            catch(err){
                console.log(err);
                toast.error(err.message);
            }
        }

    }

    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                }
                catch(error){

                }
            }
        }
        return totalAmount;
    }

    const getProducts = async () => {

        try{
            const response = await axios.get('/api/products/products');
            //console.log(response.data.success);
            const flag = response.data.success;
            if(flag){
                setProducts(response.data.products);
                //console.log(products);
            }
            else{
                toast.error(response.data.message);
            }

        }
        catch(err){
            console.log(err);
            toast.error(err.message);
        }
    };

    const getUserCart = async (token) => {
        try{
            const response = await axios.post('/api/cart/get', {}, {headers: {token}});
            const flag = response.data.success;
            //console.log(response.data);
            if(flag){
                setCartItems(response.data.cartData);
            }

        }
        catch(err){
            console.log(err);
            toast.error(err.message);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    });

    const value ={
        products , currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount,navigate, token, setToken, setCartItems
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;