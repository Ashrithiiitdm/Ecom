import { User } from "../models/userModel.js";

// Add products to cart
export const addToCart = async (req, res) => {
    try{

        const {user_id, item_id, size} = req.body;
        //console.log("Add to cart", user_id, item_id, size);
        const userData = await User.findById(user_id);
        let cartData = userData.cartData;

        if(cartData[item_id]){
            if(cartData[item_id][size]){
                cartData[item_id][size] += 1;
            }
            
            else{
                cartData[item_id][size] = 1;
            }

        }

        else{
            cartData[item_id] = {};
            cartData[item_id][size] = 1;

        }

        await User.findByIdAndUpdate(user_id, {cartData: cartData});

        return res.json({
            sucess:true,
            message: 'Item added to cart',
        })

    }
    catch(err){
        console.log(err);

        return res.json({
            success: false,
            message: err.message,
        });
    }
};


export const updateCart = async (req, res) => {
    try {
        const { user_id, item_id, size, quantity } = req.body;

        const userData = await User.findById(user_id);
        let cartData = await userData.cartData;

        cartData[item_id][size] = quantity;
        //console.log('cartOntrollerdata', cartData);
        await User.findByIdAndUpdate(user_id, { cartData: cartData });

        return res.json({
            sucess: true,
            message:'Cart updated',
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

export const getUserCart = async (req, res) => {
    try {
        const {user_id} = req.body;

        const userData = await User.findById(user_id);
        const cartData = await  userData.cartData;
        //console.log("GetUserCart", cartData);
        return res.json({
            success: true,
            cartData: cartData,
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
