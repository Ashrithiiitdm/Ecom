import React, { useState, useEffect } from 'react';
import {toast} from 'react-toastify';
import axios from '../../axios.js';

const List = ({token}) => {

    const [products, setProducts] = useState([]);
    const currency = '$';
    const fetchProducts = async ()=>{
        try{
            const response = await axios.get('/api/products/products');
            const flag = response.data.success;
            if(flag){
                setProducts(response.data.products);
            }

            else{
                toast.error(response.data.message);
            }

        }
        catch(err){
            console.log(err);
            toast.error(err.message || 'Something went wrong.');
        }
    };

    const removeProduct = async (id) => {
        try{
            const response = await axios.post('/api/products/remove', {id}, {headers: {token:token}});
            const flag = response.data.success;
            if(flag){
                toast.success(response.data.message);
                await fetchProducts();
            }

            else{
                toast.error(response.data.message);
            }

        }   
        catch(err){
            console.log(err);
            toast.error(err.message || 'Something went wrong.');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <p className='mb-2'>All Products</p>
            <div>


                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className='text-center'>Action</b>
                </div>

                {
                    products.map((product, index) => (
                        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm ' key={index} >
                            <img className='w-12' src={product.image[0]} alt='' />
                            <p>{product.name}</p>
                            <p>{product.category}</p>
                            <p>{currency}{product.price}</p>
                            <p onClick={()=>removeProduct(product._id)}className='text-right md:text-center cursor-pointer text-lg'>X</p>
                        </div>
                    ))
                }

            </div>
        </>
    );
};

export default List;