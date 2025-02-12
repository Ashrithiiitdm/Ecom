import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {

    const {token} = req.headers;

    if(!token){
        return res.json({
            success: false,
            message: 'Not authorized, login again',
        })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log(decoded);
        req.body.user_id = decoded.user_id;
        next();

    }
    catch(err){
        console.log(err);
        return res.json({
            success: false,
            message: err.message,
        })
    }
    
};