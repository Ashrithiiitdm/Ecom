import jwt from 'jsonwebtoken';

export const adminAuth = (req, res, next) => {

    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({
                success: false,
                message: 'Unauthorized access'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded !== process.env.ADMIN_MAIL + process.env.ADMIN_PASS) {
        
            return res.json({
                success: false,
                message: 'Unauthorized access'
            });
        }

        next();

    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: err.message
        });
    }

};