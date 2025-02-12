import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from '../../axios.js';
import { toast } from 'react-toastify';

const Verify = () =>{

    const { navigate, token, setCartItems } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const order_id = searchParams.get('order_id');

    const verifyPayment = async () => {
        try{
            if(!token){
                return null;
            }

            const response = await axios.post('/api/order/verifyStripe', {success, order_id}, {headers:{token}});
            const flag = response.data.success;
            //console.log(flag);
            if(flag){
                setCartItems({});
                navigate('/orders');
            }
            else{
                navigate('/cart');
            }

        }   
        catch(err){
            console.log(err);
            toast.error(err.message);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token]); 

    return (
        <div>

        </div>
    )
};

export default Verify;