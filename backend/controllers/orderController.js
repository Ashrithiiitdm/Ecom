import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";
import Stripe from "stripe";

export const currency = 'usd';
const delievryCharge = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
    try{
        //console.log("Req body", req.body);
        const {user_id, items, amount, address} = req.body;
        
        const orderData = {
            user_id, 
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment : false,
            date: Date.now(),

        };

        const newOrder = new Order(orderData);

        await newOrder.save();

        await User.findByIdAndUpdate(user_id, {cartData: {}});

        return res.json({
            success:true,
            message: 'Order placed successfully',
        });

    }
    catch(err){
        console.log(err);
        return res.json({
            success: false,
            message: err.message,
        });
    }
};

export const placeOrderStripe = async (req, res) => {
    try {
        const { user_id, items, amount, address } = req.body;

        const {origin} = req.headers;

        const orderData = {
            user_id,
            items,
            address,
            amount,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now(),

        };

        const newOrder = new Order(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data:{
                currency: currency,
                product_data:{
                    name:item.name,
                },

                unit_amount: item.price * 100,
            },

            quantity:item.quantity

        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delievery Charges',
                },

                unit_amount: delievryCharge * 100,
            },

            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?sucesss=true&order_id=${newOrder._id}`,
            cancel_url: `${origin}/verify?sucesss=false&order_id=${newOrder._id}`,
            line_items,
            mode:'payment',
        });

        return res.json({
            success:true,
            session_url:session.url
        })

    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: err.message,
        });
    }
};


export const verifyStripe = async (req, res) => {
    const {user_id, success, order_id} = req.body;

    try{
        if(success === "true"){
            await Order.findByIdAndUpdate(order_id, {payment:true});
            await User.findByIdAndUpdate(user_id, {cartData:{}});

            return res.json({
                success:true
            });
        }
        else{
            await Order.findByIdAndDelete(order_id);
            return res.json({
                success:false
            });
        }
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:err.message,
        });
    }

};

export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({});

        return res.json({
            success: true,
            orders,
        });

    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: err.message,
        });
    }
};

export const userOrders = async (req, res) => {
    try {
        const { user_id } = req.body;

        const orders = await Order.find({ user_id });

        return res.json({
            success: true,
            orders,
        });

    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: err.message,
        });
    }
};


export const updateStatus = async (req, res) => {
    try {
        const {order_id, status} = req.body;

        await Order.findByIdAndUpdate(order_id, {status});
        return res.json({
            success:true,
            message:'Status updated'
        })
    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: err.message,
        });
    }
};